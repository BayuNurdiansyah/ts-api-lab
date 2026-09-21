#!/bin/bash
PORT=${1:-3000}
URL=${2:-/users}
for payload in '{"name":"Budi"}' '{}' '{"name":12345}' '{"name":{"a":1}}' '{"name":null}' '{"name":true}' '{"name":["x"]}'; do
  printf '%-22s' "$payload"
  curl -s -w " [%{http_code}]" -X POST "localhost:$PORT$URL" \
    -H 'content-type: application/json' \
    -H 'accept: application/json' \
    -d "$payload" | head -c 150
  echo
done
