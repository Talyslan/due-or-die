import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('8080'),
    CLIENT_URL: z.string(),
    JWT_SECRET: z.string(),
    TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    ENVIRONMENT: z.enum(['local', 'production']),
    FIREBASE_SERVICE_ACCOUNT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
