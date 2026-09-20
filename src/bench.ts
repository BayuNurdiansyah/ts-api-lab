import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import * as schema from "./schema.js";

let queryCount = 0;
const logger = { logQuery() { queryCount++; } };

const sqlite = new Database("lab.sqlite");
const db = drizzle(sqlite, { schema, logger });

// NAIVE: loop, satu query per user
function naive() {
  queryCount = 0;
  const t = performance.now();
  const allUsers = db.select().from(schema.users).all();
  const result = allUsers.map((u) => ({
    ...u,
    orders: db.select().from(schema.orders)
      .where(eq(schema.orders.userId, u.id)).all(),
  }));
  const ms = performance.now() - t;
  return { queries: queryCount, ms, rows: result.length, orders: result[0]?.orders.length };
}

// EAGER: relational query
function eager() {
  queryCount = 0;
  const t = performance.now();
  const result = db.query.users.findMany({ with: { orders: true } }).sync();
  const ms = performance.now() - t;
  return { queries: queryCount, ms, rows: result.length, orders: result[0]?.orders.length };
}

console.log("NAIVE ->", JSON.stringify(naive()));
console.log("EAGER ->", JSON.stringify(eager()));
