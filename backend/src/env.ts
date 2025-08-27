import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    PORT: z.string(),
    CLIENT_URL: z.string(),
    JWT_SECRET: z.string(),
    TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    FIREBASE_API_KEY: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_AUTH_DOMAIN: z.string(),
    FIREBASE_APP_ID: z.string(),
    ENVIRONMENT: z.enum(['local', 'production']),
});

export const env = envSchema.parse(process.env);
