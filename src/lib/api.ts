import { env } from "@/config/env";
import { getBearerToken, triggerExternalLogout } from "@/providers/auth";

type ApiOptions = {
  requiresAuth?: boolean;
};

const FORBIDDEN_STATUS = 403;

let isRedirectingToLogin = false;

function redirectToLogin() {
  if (typeof window === "undefined") {
    return;
  }

  if (isRedirectingToLogin) {
    return;
  }

  isRedirectingToLogin = true;

  const loginUrl = new URL("/login", window.location.origin);
  const redirectTarget = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (redirectTarget && redirectTarget !== "/login") {
    loginUrl.searchParams.set("redirect", redirectTarget);
  }

  window.location.replace(loginUrl.toString());
}

export async function api<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: Record<string, unknown>,
  options?: ApiOptions
): Promise<T> {
  const token = getBearerToken() ?? undefined;
  const requiresAuth = options?.requiresAuth ?? true;

  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: token } : {}),
    },
  });

  if (response.status === FORBIDDEN_STATUS && requiresAuth) {
    await triggerExternalLogout();
    redirectToLogin();
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}
