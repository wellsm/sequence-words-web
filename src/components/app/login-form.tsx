import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth";

const formSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onLogin: () => void;
};

export function LoginForm({ onLogin }: Props) {
  const { login } = useAuth();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    try {
      await login(values);

      onLogin();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to sign in. Please try again.";
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(message);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  placeholder="Your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full text-foreground"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          size="lg"
          type="submit"
        >
          Sign in
          {form.formState.isSubmitting && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
}
