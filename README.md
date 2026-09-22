<div align="center">

# ts-api-lab

**Tempat gue coba-coba, benchmark, dan bandingin hal teknis, semuanya beneran dijalanin, bukan cuma teori.**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white)](https://fastify.dev/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## 🧪 Isinya apa

Repo ini API TypeScript yang tumbuh terus, nggak ada rencana akhirnya
di mana. Tiap kali ada hal teknis yang bikin penasaran, dicoba dan
diukur di sini, terus dibahas terpisah. Static analysis, CI, N+1
query, Docker, rate limiting, streaming LLM response, dan kemungkinan
nambah lagi ke depannya.

Tiap eksperimen dapat tag Git sendiri, jadi kode di tiap tahap bisa
dilihat persis kondisinya waktu itu ditulis, nggak ketimpa perubahan
sesudahnya.

👉 **Lihat semua eksperimen:** buka tab [**Tags**](../../tags) di
repo ini. Tiap tag namanya deskriptif, dan isi commit-nya biasanya
cukup jelas soal itu eksperimen apa.

## 🚀 Jalanin sendiri

```bash
npm install
npx tsx src/seed.ts
npm run dev
```

Server jalan di `localhost:3000`. Cek dulu:

```bash
curl localhost:3000/health
```

Buat lihat kondisi kode di eksperimen tertentu:

```bash
git checkout <nama-tag>
```

## 🛠️ Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Fastify
- **ORM:** Drizzle
- **Database:** SQLite (buat lab), diuji juga lawan Laravel/MySQL di beberapa eksperimen
- **Validasi:** Zod
- **Container:** Docker multi-stage build

## 📌 Catatan

Ini lab pribadi, bukan production-ready code. Prioritasnya belajar
dan ngukur sesuatu secara nyata, bukan bikin sistem yang siap dipakai
orang banyak.

---

<div align="center">

Kalau ada yang mau ngobrol soal salah satu eksperimen di sini, atau
lagi cari full-stack developer buat remote, silakan kontak lewat
[LinkedIn](#).

</div>
