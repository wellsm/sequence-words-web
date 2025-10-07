import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  type: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) =>
      await api<LoginResponse>("/auth/login", "POST", payload, {
        requiresAuth: false,
      }),
  });
}
