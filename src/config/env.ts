/** biome-ignore-all lint/style/useNamingConvention: env is a global variable */
import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
