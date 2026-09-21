#!/bin/bash
# Node:    npm run build && NODE_ENV=production node dist/server.js
# Laravel: docker compose -f docker-compose.bench.yml up -d  (di repo docker-lab)
for c in 1 10 50; do
  echo "=== NODE c=$c ==="
  npx -y autocannon -c $c -d 10 http://localhost:3000/users
  echo "=== LARAVEL c=$c ==="
  npx -y autocannon -c $c -d 10 http://localhost:8082/api/users
done
