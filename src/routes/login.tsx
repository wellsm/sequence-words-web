import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "@/components/app/login-form";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: (search?.redirect as string) || "/rooms",
  }),
  beforeLoad: ({ context: { auth }, search }) => {
    const { isAuthenticated } = auth;

    if (isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6 space-y-2 p-4">
      <LoginForm onLogin={() => navigate({ to: search.redirect })} />
    </div>
  );
}
