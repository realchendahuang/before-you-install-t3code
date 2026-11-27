#!/usr/bin/env python3
"""Scaffold a new exhibit (#20, #21, ...) across content/manifest.json, cases/en/, and cases/zh-CN/."""

from __future__ import annotations

import argparse
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "content" / "manifest.json"


def main() -> int:
    parser = argparse.ArgumentParser(description="Scaffold a new numbered exhibit.")
    parser.add_argument("--id", required=True, help="Two-digit exhibit ID, e.g. 20")
    parser.add_argument("--slug", required=True, help="Kebab-case slug, e.g. new-security-finding")
    parser.add_argument("--act", required=True, choices=["act1", "act2", "act3", "act4"])
    parser.add_argument("--status", default="open", choices=["open", "partial", "record"])
    parser.add_argument("--severity", default="high", choices=["critical", "high", "medium", "record"])
    parser.add_argument("--hero", default="evidence/00-cover-en.png", help="Primary receipt image path")
    parser.add_argument("--dossier", default="docs/dossiers/02-local-safety-and-security-audit.md")
    parser.add_argument("--x-post", required=True, help="Canonical X post URL")
    parser.add_argument("--date", default=date.today().isoformat())
    args = parser.parse_args()

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    if any(c["id"] == args.id for c in manifest["cases"]):
        raise SystemExit(f"Case #{args.id} already exists in content/manifest.json")

    manifest["cases"].append(
        {
            "id": args.id,
            "slug": args.slug,
            "act": args.act,
            "status": args.status,
            "severity": args.severity,
            "date": args.date,
            "evidencePart": f"Part {int(args.id)}",
            "heroImage": args.hero,
            "dossier": args.dossier,
            "xPost": args.x_post,
        }
    )
    for act in manifest["acts"]:
        if act["id"] == args.act and args.id not in act["cases"]:
            act["cases"].append(args.id)

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    en_path = ROOT / "cases" / "en" / f"{args.id}-{args.slug}.md"
    zh_path = ROOT / "cases" / "zh-CN" / f"{args.id}-{args.slug}.md"

    en_path.write_text(
        f"""# #{args.id} · [Exhibit Title]

> [One-sentence verifiable bottom line.]

<!-- section:claim -->
## What Was Claimed

- [Official statement or claim with primary link.]

<!-- section:evidence -->
## What the Evidence Shows

- **[Fact 1]:** [Verifiable details with commit/PR/source links.]

<!-- section:status -->
## Upstream Status

- **Status:** [Current upstream verification state.]

<!-- section:visuals -->
## Visual Evidence

![Primary receipt](../../{args.hero})

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part {int(args.id)})]({args.x_post})
- [Deep Technical Dossier](../../{args.dossier})
""",
        encoding="utf-8",
    )

    zh_path.write_text(
        f"""# #{args.id} · [罪证标题]

> [一句话可核验核心结论。]

<!-- section:claim -->
## 官方 / Theo 宣称

- [官方说法或宣称，附一手链接。]

<!-- section:evidence -->
## 源码与公开记录铁证

- **[核心铁证 1]：** [附源码行号、PR/Commit 链接的客观核查事实。]

<!-- section:status -->
## 上游最新状态

- **现状：** [最新主干分支核验结论。]

<!-- section:visuals -->
## 一手实证原图

![核心实证截图](../../{args.hero})

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 {int(args.id)} 弹）]({args.x_post})
- [深度技术卷宗](../../{args.dossier})
""",
        encoding="utf-8",
    )

    print(f"Created:\n  {en_path.relative_to(ROOT)}\n  {zh_path.relative_to(ROOT)}")
    print("Next steps:")
    print(f"  1. Edit both files, then run: python3 scripts/translate_i18n.py --only-case {args.id}")
    print("  2. Add the new thread to site/mail/threads.json and update READMEs if needed")
    print("  3. Verify repository integrity: python3 scripts/verify_repo.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
