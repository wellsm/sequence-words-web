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
import { useCreateRoom } from "@/hooks/use-create-room";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DEFAULT_WORDS_AMOUNT = 5;
const MAX_WORDS_AMOUNT = 8;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;

const MIN_DURATION = 30;
const MAX_DURATION = 300;
const DEFAULT_DURATION = 30;

const formSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
  howManyWords: z.coerce
    .number()
    .min(DEFAULT_WORDS_AMOUNT)
    .max(MAX_WORDS_AMOUNT),
  duration: z.coerce
    .number()
    .min(MIN_DURATION)
    .max(MAX_DURATION)
    .default(DEFAULT_DURATION),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (code: string) => void;
};

export function CreateRoom({ onSubmit }: Props) {
  const { mutateAsync: createRoom, isPending } = useCreateRoom();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "John Doe",
      howManyWords: DEFAULT_WORDS_AMOUNT,
      duration: DEFAULT_DURATION,
    },
  });

  async function handleSubmit({ name, howManyWords, duration }: FormValues) {
    const room = await createRoom({ name, howManyWords, duration });

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
            name="howManyWords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many words</FormLabel>
                <FormControl>
                  <Input
                    max={MAX_WORDS_AMOUNT}
                    min={DEFAULT_WORDS_AMOUNT}
                    placeholder="Ex: John Doe"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <SelectTrigger className="w-full" size="lg">
                      <SelectValue placeholder="Select a duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="90">1 minute 30 seconds</SelectItem>
                      <SelectItem value="120">2 minutes</SelectItem>
                      <SelectItem value="180">3 minutes</SelectItem>
                      <SelectItem value="240">4 minutes</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
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
            Create
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
