import 'dotenv/config';

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// DB
const POSTGRES_HOST = getEnv('POSTGRES_HOST');
const POSTGRES_PORT = getEnv('POSTGRES_PORT');
const POSTGRES_USER = getEnv('POSTGRES_USER');
const POSTGRES_PASSWORD = getEnv('POSTGRES_PASSWORD');
const POSTGRES_DB = getEnv('POSTGRES_DB');
const POSTGRES_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export const ENV = {
  //Local PSQL
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_URL,
  JWT_PUBLIC_KEY: getEnv('JWT_PUBLIC_KEY'),
  JWT_PRIVATE_KEY: getEnv('JWT_PRIVATE_KEY'),
} as const;
