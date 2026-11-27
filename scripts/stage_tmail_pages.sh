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
/data/i18n.js
  Cache-Control: public, max-age=31536000, immutable
/temu3.css
  Cache-Control: public, max-age=31536000, immutable
/temu3.js
  Cache-Control: public, max-age=31536000, immutable
/mail/app.js
  Cache-Control: public, max-age=31536000, immutable
/mail/styles.css
  Cache-Control: public, max-age=31536000, immutable
/mail/t/thread.css
  Cache-Control: public, max-age=31536000, immutable
/memes/memes.css
  Cache-Control: public, max-age=31536000, immutable
/memes/memes.js
  Cache-Control: public, max-age=31536000, immutable
/story/story.css
  Cache-Control: public, max-age=31536000, immutable
/story/story.js
  Cache-Control: public, max-age=31536000, immutable
/robots.txt
  Cache-Control: public, max-age=3600
/sitemap.xml
  Cache-Control: public, max-age=3600
/site.webmanifest
  Cache-Control: public, max-age=3600
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://cdn.temu3code.com data: blob:; media-src 'self' https://cdn.temu3code.com; connect-src 'self' https://cdn.temu3code.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
EOF

echo "Staged Cloudflare Pages bundle in $OUT_DIR ($(du -sh "$OUT_DIR" | awk '{print $1}'))"
