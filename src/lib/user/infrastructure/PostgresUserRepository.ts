import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { DrizzleProvider } from 'src/database/database.provider';
import { Pool } from 'pg';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserRole } from '../domain/UserRole';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  constructor(@Inject(DrizzleProvider) private readonly pool: Pool) {}

  async getAll(): Promise<User[]> {
    const { rows } = await this.pool.query('SELECT * FROM users');
    return rows.map((row) => new User(new UserName(row.name), new UserEmail(row.email), new UserPassword(row.password), new UserRole(row.role), new UserId(row.user_id)));
  }

  async getById(userId: UserId): Promise<User | null> {
    const { rows } = await this.pool.query('SELECT * FROM users WHERE user_id = $1', [userId.value]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new User(new UserName(row.name), new UserEmail(row.email), new UserPassword(row.password), new UserRole(row.role), new UserId(row.user_id));
  }

  async create(user: User): Promise<User> {
    const { name, email, password, role } = user.toJSON();
    const { rows } = await this.pool.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id', [name, email, password, role]);
    const newUserId = new UserId(rows[0].user_id);
    return new User(user.name, user.email, user.password, user.role, newUserId);
  }

  async update(user: User): Promise<void> {
    const { userId, name, email, password, role } = user.toJSON();
    await this.pool.query('UPDATE users SET name = $2, email = $3, password = $4, role = $5 WHERE user_id = $1', [name, email, password, role, userId]);
  }

  async delete(userId: UserId): Promise<void> {
    await this.pool.query('DELETE FROM users WHERE user_id = $1', [userId.value]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new User(new UserName(row.name), new UserEmail(row.email), new UserPassword(row.password), new UserRole(row.role), new UserId(row.user_id));
  }
}
