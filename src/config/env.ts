import 'dotenv/config';

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  JWT_PUBLIC_KEY: getEnv('JWT_PUBLIC_KEY'),
  JWT_PRIVATE_KEY: getEnv('JWT_PRIVATE_KEY'),
} as const;
