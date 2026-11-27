#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-/tmp/tmail-cf-dist}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR/evidence"

# Canonical static site: / (Temu3 Code), /mail/ (Tmail), /receipts/ (Original X PNGs), /data/evidence.json
cp -R "$ROOT_DIR/site/." "$OUT_DIR/"

# Shared primary evidence (109 archived receipts & charts)
cp -R "$ROOT_DIR/evidence/." "$OUT_DIR/evidence/"

cat > "$OUT_DIR/_redirects" <<'EOF'
/inbox /mail/ 301
/inbox/* /mail/:splat 301
/report /mail/ 301
/report/* /mail/ 301
/c/* /mail/ 301
EOF

cat > "$OUT_DIR/_headers" <<'EOF'
/evidence/*
  Cache-Control: public, max-age=86400, s-maxage=604800
/receipts/*
  Cache-Control: public, max-age=86400, s-maxage=604800
/data/*
  Cache-Control: public, max-age=300, s-maxage=3600
/robots.txt
  Cache-Control: public, max-age=3600
/sitemap.xml
  Cache-Control: public, max-age=3600
/site.webmanifest
  Cache-Control: public, max-age=3600
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
EOF

echo "Staged Cloudflare Pages bundle in $OUT_DIR ($(du -sh "$OUT_DIR" | awk '{print $1}'))"
