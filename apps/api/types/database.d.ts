import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Token {
  created_at: Generated<string>;
  expires_at: string;
  id: string | null;
  user_id: number;
}

export interface User {
  created_at: Generated<string>;
  email: string;
  id: Generated<number>;
  password: string;
  updated_at: Generated<string | null>;
}

export interface DB {
  token: Token;
  user: User;
}