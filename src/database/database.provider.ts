import { Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { ENV } from '../config/env';

export const DrizzleProvider = 'drizzleProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleProvider,
  useFactory: async () => {
    const pool = new Pool({
      connectionString: ENV.POSTGRES_URL,
    });
    return pool;
  },
};