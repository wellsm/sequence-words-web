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
import { useJoinRoom } from "@/hooks/use-join-room";
import { setToken } from "@/lib/storage";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const CODE_LENGTH = 6;

const formSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
  code: z.coerce.string().length(CODE_LENGTH),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (code: string) => void;
};

export function JoinRoom({ onSubmit }: Props) {
  const { mutateAsync: joinRoom, isPending } = useJoinRoom();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "Jane Doe",
      code: "",
    },
  });

  async function handleSubmit({ name, code }: FormValues) {
    const room = await joinRoom({ name, code });

    setToken(room.id, room.me?.hash || "");
    onSubmit(room.id);
  }

  return (
    <div className="flex flex-col gap-4 space-y-4">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Player Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Code</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123456" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full text-foreground sm:w-auto"
            disabled={isPending}
            size="lg"
            type="submit"
          >
            Join
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
