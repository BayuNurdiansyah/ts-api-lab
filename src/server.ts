import Fastify from "fastify";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import * as schema from "./schema.js";
import "dotenv/config";

const sqlite = new Database(process.env.DB_PATH ?? "lab.sqlite");
const db = drizzle(sqlite, { schema });

const app = Fastify({
  logger: {
    level: "info",
    formatters: { level: (label) => ({ level: label }) },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  genReqId: () => randomUUID(),
});

const CreateUser = z.object({
  name: z.string().min(1).max(100),
});

app.get("/health", async () => ({
  status: "ok",
  uptime: Math.round(process.uptime()),
}));

app.get("/users", async () => {
  return db.query.users.findMany({ with: { orders: true } }).sync();
});

app.get<{ Params: { id: string } }>("/users/:id", async (req, reply) => {
  const id = Number(req.params.id);
  req.log.info({ userId: id }, "looking up user");
  const user = db.query.users.findFirst({
    where: eq(schema.users.id, id),
    with: { orders: true },
  }).sync();
  if (!user) {
    req.log.warn({ userId: id }, "user not found");
    return reply.code(404).send({ error: "User not found" });
  }
  return user;
});

app.post("/users", async (req, reply) => {
  const parsed = CreateUser.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "validation failed");
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

app.get("/boom", async (req) => {
  req.log.info({ step: "fetching user" }, "starting work");
  throw new Error("database connection lost");
});

app.get("/stream-demo", async (req, reply) => {
  reply.raw.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const words = "This is a demo of streaming responses word by word instead of waiting for the full reply".split(" ");

  for (const word of words) {
    reply.raw.write(`data: ${JSON.stringify({ token: word + " " })}\n\n`);
    await new Promise((r) => setTimeout(r, 120));
  }

  reply.raw.write("data: [DONE]\n\n");
  reply.raw.end();
});

app.post("/chat", async (req, reply) => {
  const body = req.body as { message?: string };
  if (!body.message) {
    return reply.code(400).send({ error: "message is required" });
  }

  reply.raw.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:streamGenerateContent?key=${process.env.GEMINI_API_KEY}&alt=sse`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: body.message }] }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text();
    reply.raw.write(`data: ${JSON.stringify({ error: errText })}\n\n`);
    reply.raw.end();
    return;
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    reply.raw.write(decoder.decode(value));
  }

  reply.raw.end();
});

const port = Number(process.env.PORT ?? 3000);
app.listen({ port, host: "0.0.0.0" })
  .catch((e) => { console.error(e); process.exit(1); });
