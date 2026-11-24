import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  API_PREFIX: z.string().startsWith("/").default("/api/v1"),

  CLIENT_URL: z.string().url().default("http://localhost:5173"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log("Invalid environment variables, please check your .env file");
  console.log("--------------------------------");
  console.error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));

  process.exit(1);
}

export const env = parsedEnv.data;
