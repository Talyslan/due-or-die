import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    PORT: z.string(),
    CLIENT_URL: z.string(),
    JWT_SECRET: z.string(),
    TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    ENVIRONMENT: z.enum(['local', 'production']),
});

export const env = envSchema.parse(process.env);
