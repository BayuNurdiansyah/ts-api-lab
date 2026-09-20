import Database from "better-sqlite3";

const db = new Database("lab.sqlite");
db.exec(`
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
  CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, total INTEGER NOT NULL);
`);

const insU = db.prepare("INSERT INTO users (id, name) VALUES (?, ?)");
const insO = db.prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)");

const tx = db.transaction(() => {
  for (let i = 1; i <= 100; i++) {
    insU.run(i, `User ${i}`);
    for (let j = 0; j < 5; j++) insO.run(i, i * 1000 + j);
  }
});
tx();
console.log("seeded: 100 users, 500 orders");
