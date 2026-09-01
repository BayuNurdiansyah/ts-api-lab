# ts-api-lab

Membandingkan bug apa saja yang tertangkap sebelum kode dijalankan, di PHP dan TypeScript.

Lima bug yang sama ditulis di dua bahasa, lalu diuji di tiga kondisi.

## Hasil

| Bug | PHP polos | PHP + PHPStan | TypeScript |
|-----|-----------|---------------|------------|
| Salah nama property | tidak | ya | ya |
| Hasil lookup tanpa cek null | tidak | ya | ya |
| Optional field tanpa guard | tidak | ya | ya |
| Status value tidak valid | tidak | ya | ya |
| Argument ketuker | tidak | tidak | tidak |
| **Total** | **0/5** | **4/5** | **4/5** |

Sisi PHP memakai backed enum dan typed class supaya setara dengan union type dan nested object di TypeScript.

## Menjalankan

```bash
npm install
npx tsc --noEmit

composer install
vendor/bin/phpstan analyse
```

## Setup

TypeScript 5 dengan `strict` dan `noUncheckedIndexedAccess`, PHPStan level max, PHP 8.4.