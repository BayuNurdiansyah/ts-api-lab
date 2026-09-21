import Fastify from "fastify";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import * as schema from "./schema.js";

const sqlite = new Database(process.env.DB_PATH ?? "lab.sqlite");
const db = drizzle(sqlite, { schema });

const app = Fastify({ logger: false });

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

const port = Number(process.env.PORT ?? 3000);
app.listen({ port, host: "0.0.0.0" })
  .then(() => console.log(`listening on ${port}`))
  .catch((e) => { console.error(e); process.exit(1); });
