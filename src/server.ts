import Fastify from "fastify";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { z } from "zod";
import * as schema from "./schema.js";

const sqlite = new Database(process.env.DB_PATH ?? "lab.sqlite");
const db = drizzle(sqlite, { schema });

const app = Fastify({ logger: false });

const CreateUser = z.object({
  name: z.string().min(1).max(100),
});

app.get("/health", async () => ({ status: "ok" }));

app.get("/users", async () => {
  return db.query.users.findMany({ with: { orders: true } }).sync();
});

app.get<{ Params: { id: string } }>("/users/:id", async (req, reply) => {
  const id = Number(req.params.id);
  const user = db.query.users.findFirst({
    where: eq(schema.users.id, id),
    with: { orders: true },
  }).sync();
  if (!user) return reply.code(404).send({ error: "User not found" });
  return user;
});

app.post("/users", async (req, reply) => {
  const parsed = CreateUser.safeParse(req.body);
  if (!parsed.success) {
    return reply.code(400).send({
      error: "Validation failed",
      issues: parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
  }
  const inserted = db.insert(schema.users).values(parsed.data).returning().all();
  return reply.code(201).send(inserted[0]);
});

const port = Number(process.env.PORT ?? 3000);
app.listen({ port, host: "0.0.0.0" })
  .then(() => console.log(`listening on ${port}`))
  .catch((e) => { console.error(e); process.exit(1); });
