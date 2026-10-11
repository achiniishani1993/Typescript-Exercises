import "dotenv/config";
import pg from "pg";
import { env } from "./src/env.ts";

const { Pool } = pg;

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  port: Number(env.DB_PORT),
});

export default pool;