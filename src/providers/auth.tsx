import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { type LoginPayload, useLogin } from "@/hooks/use-login";
import { sleep } from "@/lib/utils";

export type AuthContext = {
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
};

const AuthContext = createContext<AuthContext | null>(null);

const key = "tanstack.auth.user";

export function getBearerToken() {
  return localStorage.getItem(key);
}

type ExternalLogoutHandler = () => Promise<void>;

let externalLogoutHandler: ExternalLogoutHandler | null = null;

export function registerExternalLogoutHandler(
  handler: ExternalLogoutHandler | null
) {
  externalLogoutHandler = handler;
}

export async function triggerExternalLogout() {
  if (externalLogoutHandler) {
    await externalLogoutHandler();
  } else {
    setBearerToken(null);
  }
}

function setBearerToken(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

const SLEEP_DURATION = 500;

export function AuthProvider({ children }: { children: ReactNode }) {
  const { mutateAsync: doLogin } = useLogin();
  const [user, setUser] = useState<string | null>(getBearerToken());
  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    await sleep(SLEEP_DURATION);

    setBearerToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (data: LoginPayload) => {
      const { token } = await doLogin(data);

      setBearerToken(token);
      setUser(token);
    },
    [doLogin]
  );

  useEffect(() => {
    registerExternalLogoutHandler(logout);

    return () => {
      registerExternalLogoutHandler(null);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
