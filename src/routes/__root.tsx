import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthContext } from "@/providers/auth";
import { ThemeProvider } from "@/providers/theme";

const RootLayout = () => (
  <>
    <div className="flex h-screen w-screen items-center justify-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
      </ThemeProvider>
    </div>
    <TanStackRouterDevtools />
  </>
);

type RouterContext = {
  auth: AuthContext;
  authenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
