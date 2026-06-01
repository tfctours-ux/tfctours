// src/lib/cms/client.ts
// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

type DrizzleNeon = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleNeon | null = null;
let _checkedEnv = false;

export function getCmsDb(): DrizzleNeon | null {
  if (_db) {
    return _db;
  }

  if (_checkedEnv && !_db) {
    return null;
  }

  _checkedEnv = true;
  const url = process.env.NEON_DATABASE_URL;

  if (!url) {
    console.warn({ action: "cms_db_missing_env" });
    return null;
  }

  const sql = neon(url);
  _db = drizzle(sql, { schema, casing: "snake_case" });
  return _db;
}
