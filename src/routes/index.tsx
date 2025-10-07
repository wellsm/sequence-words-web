import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: ({
    context: {
      auth: { isAuthenticated },
    },
  }) => {
    throw redirect({ to: isAuthenticated ? "/rooms" : "/login" });
  },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
