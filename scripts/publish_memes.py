#!/usr/bin/env python3
"""Compress memes into crisp WebP, upload to Cloudflare R2 (temu3-media -> cdn.temu3code.com),
and generate site/data/memes.json for Temu3 Code + /memes/ + Tmail.

Usage:
  python3 scripts/publish_memes.py              # convert + upload changed/new files + rebuild memes.json
  python3 scripts/publish_memes.py --force      # re-upload every WebP to R2
  python3 scripts/publish_memes.py --no-upload  # convert + rebuild memes.json only (offline check)
"""

from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MEMES_DIR = ROOT / "memes"
STAGE_DIR = Path("/tmp/temu3-r2-stage")
STATE_FILE = Path("/tmp/temu3-r2-uploaded.json")
OUT_JSON = ROOT / "site" / "data" / "memes.json"

BUCKET = "temu3-media"
CDN_BASE = "https://cdn.temu3code.com"
MAX_DIM = 1280
WEBP_QUALITY = 86

CASE_TO_THREAD = {
    "00": "2026-11-23-origin-temu3-threat",
    "01": "2026-03-06-pr174-default-telemetry",
    "02": "2026-10-28-fake-delete-process-spy",
    "03": "2026-10-03-issue15353-force-push",
    "04": "2026-11-22-antigravity-spoof-3min-ban",
    "05": "2026-11-24-managed-policy-plaintext-relay",
    "06": "2026-11-16-vibe-kanban-daytona",
    "07": "2026-11-24-managed-policy-plaintext-relay",
    "08": "2026-11-18-31t-token-radar",
    "09": "2026-11-09-issue33639-bermudi-insult",
    "10": "2026-11-08-stealing-miaai-fork",
    "11": "2026-11-25-gdpr-overnight-collapse",
    "12": "2026-11-25-gdpr-overnight-collapse",
    "13": "2026-11-25-ca81b7b9-active-vulns",
    "14": "2026-11-19-selective-politeness-vips",
    "15": "2026-11-24-retroactive-trademark-blocker",
    "16": "2025-10-ffmpeg-bounty",
    "17": "2023-05-sponsor-roster",
    "18": "2026-11-02-pr29922-77k-stars",
    "19": "2026-11-25-ca81b7b9-active-vulns",
}

SINS_META = {
    "sin-01-bigotry-qi": ("00", "SIN I · BIGOTRY「歧」", "一宗罪 · 歧：中文 Fork 威胁封号，11 小时后欢迎万亿美企"),
    "sin-02-deceit-qi": ("01", "SIN II · DECEIT「欺」", "二宗罪 · 欺：挂「绝无遥测」招牌却默认发 PostHog + 哈希 ~/.claude.json"),
    "sin-03-gluttony-tun": ("02", "SIN III · GLUTTONY「吞」", "三宗罪 · 吞：41.6 GB SQLite 假删除 + 每 5 秒扫全机进程"),
    "sin-04-sloth-dai": ("03", "SIN IV · SLOTH「怠」", "四宗罪 · 怠：静默 force-push 躺 52 天，删隐私白名单仅用 21 小时"),
    "sin-05-forgery-wei": ("04", "SIN V · FORGERY「伪」", "五宗罪 · 伪：伪造 Antigravity 请求头致用户 3 分钟封号"),
    "sin-06-exposure-luo": ("05", "SIN VI · EXPOSURE「裸」", "六宗罪 · 裸：T3 Connect 零端到端加密、明文中转终端流"),
    "sin-07-envy-du": ("06", "SIN VII · ENVY「妒」", "七宗罪 · 妒：天使投资人利益冲突与嘲讽竞品停服"),
    "sin-08-blindness-mang": ("07", "SIN VIII · BLINDNESS「盲」", "八宗罪 · 盲：自吹最强企业托管策略，实则 4 处遥测盲区"),
    "sin-09-greed-tan": ("08", "SIN IX · GREED「贪」", "九宗罪 · 贪：日均 31.7T Token 雷达换免费额度与投资人询盘"),
    "sin-10-arrogance-kuang": ("09", "SIN X · ARROGANCE「狂」", "十宗罪 · 狂：内部 yolo merges，外部骂提 Issue 用户「懒惰混蛋」"),
    "sin-11-plunder-qie": ("10", "SIN XI · PLUNDER「窃」", "十一宗罪 · 窃：刚说「我要偷这个了」，30 秒后 @bot 扒女开发者 Fork"),
    "sin-12-mendacity-huang": ("11", "SIN XII · MENDACITY「谎」", "十二宗罪 · 谎：刚发澄清 2 小时内被自家 7 个 GDPR 紧急 PR 证伪"),
    "sin-13-concealment-man": ("13", "SIN XIII · CONCEALMENT「瞒」", "十三宗罪 · 瞒：静默修高危漏洞，已发布 GitHub 安全公告仍为 0"),
    "sin-14-servility-chan": ("14", "SIN XIV · SERVILITY「谄」", "十四宗罪 · 谄：1,151 条推文实测：大厂 VIP 0.0% 脏话 vs 中文危机 14.4%"),
    "sin-15-fraud-zha": ("15", "SIN XV · FRAUD「诈」", "十五宗罪 · 诈：USPTO 注册商标 0 件，威胁封号 17 小时后连夜补写 TRADEMARK.md"),
    "sin-16-recidivism-guan": ("16", "SIN XVI · RECIDIVISM「惯」", "十六宗罪 · 惯：2024 印度开发者 → 2025 FFmpeg 悬赏 → 2026 中文粪坑惯犯闭环"),
    "sin-17-hypocrisy-jiao": ("17", "SIN XVII · HYPOCRISY「矫」", "十七宗罪 · 矫：嘴上讲合规，背地白嫖 Codex 0% Bug 与 10 账号代理池"),
    "sin-18-vanity-xu": ("18", "SIN XVIII · VANITY「虚」", "十八宗罪 · 虚：痛批假 Star 后自合 30 秒闲置偷点 Star 弹窗冲 7.7 万星"),
    "sin-19-breach-lou": ("19", "SIN XIX · BREACH「漏」", "十九宗罪 · 漏：ca81b7b9 仍存 30 天明文 LAN Cookie 与 SSH_AUTH_SOCK 暴露"),
}

BLENDED_META = {
    "00-drake": ("00", "Drake 11-Hour Double Standard", "Drake 11 小时双标：中国 Fork 封号 vs 万亿美企随便抄", True),
    "00b-woman-yelling-cat": ("00", "Screaming at MIT Fork Cat", "对着合法 MIT Fork 狂吼「Temu3 Code」", False),
    "01a-scooby-mask": ("01", "Unmasking \"No Telemetry. Full Stop.\"", "撕开「绝无遥测」面具：默认 PostHog + ~/.claude.json", True),
    "01b-expanding-brain": ("01", "Telemetry Opt-Out Expanding Brain", "遥测关闭宇宙脑：删承诺、拒 4 个 PR、0 设置开关", False),
    "02a-flex-tape": ("02", "Flex Tape on 41.6 GB Fake SQLite Delete", "强力胶修 41.6 GB SQLite 假删除", False),
    "02b-always-has-been": ("02", "5-Second OS Process Scanner: Always Has Been", "后台每 5 秒扫全机进程？一直以来都是", False),
    "03a-sleeping-shaq": ("03", "52-Day Force-Push vs. 21-Hour Filter Drop", "52 天静默 force-push 熟睡，21 小时删隐私过滤瞬间清醒", False),
    "03b-distracted-bf": ("03", "Distracted by Public Leaderboard", "抛弃用户隐私白名单，回头看 slopalytics 榜单", False),
    "04a-trade-offer": ("04", "Antigravity Header Spoof Trade Offer", "Antigravity 魔改头交易：你交 Google 账号，我送 3 分钟封号", False),
    "04b-surprised-pikachu": ("04", "Surprised Pikachu After 3-Minute Ban", "伪造内部头被 3 分钟封号后的震惊皮卡丘", False),
    "05-pawn-stars": ("05", "T3 Connect E2E Encryption: Best I Can Do Is Plaintext", "想要端到端加密？最多给你明文 TLS 终结中继", False),
    "06-laughing-leo": ("06", "Angel Investor Conflict Laughing Leo", "天使投资人举杯嘲讽竞品停服", False),
    "07-two-buttons": ("07", "Two Buttons: \"Best Managed Policy\" vs. Docs", "两个按钮：吹最强托管策略 vs 自家文档承认 4 个盲区", False),
    "08a-bernie-asking": ("08", "Once Again Asking for Your 31.7T Tokens", "再次向你索要日均 31.7 万亿 Token 免费数据雷达", False),
    "08b-change-my-mind": ("08", "Default Telemetry Is a Business Model — Change My Mind", "默认遥测不是失误，而是商业雷达", False),
    "09-boardroom-meeting": ("09", "Boardroom Meeting: \"Add an Opt-Out Toggle?\"", "会议室提案：加个遥测关闭开关？直接扔出窗外", False),
    "10a-yall-got-any-more": ("10", "\"Y'all Got Any More of Those Community Forks?\"", "还有没有女开发者 Fork？@bot 30 秒给你扒了", False),
    "10b-left-exit-12": ("10", "Left Exit 12: Scrape Her Fork in 30s", "高速急转弯：刚说「我要偷了」30 秒后 @bot 扒代码", False),
    "11-train-bus": ("11", "Overnight GDPR PRs vs. Morning Clarification", "上午刚发隐私澄清，2 小时后被自家紧急 PR 迎头撞飞", False),
    "12a-this-is-fine": ("12", "This Is Fine (2.2M/hr IP Spans in Axiom)", "一切安好（每小时 220 万条 IP 日志留存 30 天）", True),
    "12b-panik-kalm-panik": ("12", "Panik / Kalm / Panik: GDPR Overnight Blitz", "GDPR 举报后的 6 小时连夜惊慌补锅三连", False),
    "13-hide-the-pain": ("13", "Hide the Pain: 0 GitHub Security Advisories", "强颜欢笑：静默修了一堆高危洞，安全公告依然是 0", False),
    "14-gordon-ramsay": ("14", "Gordon Ramsay: 0.0% VIPs vs. 14.4% Chinese Devs", "戈登拉姆齐式双标：对硅谷 VIP 温柔体贴，对中文圈狂喷粪坑", True),
    "14b-two-guys-bus": ("14", "Two Guys on a Bus: Big-Tech VIP vs. Ordinary Dev", "公交车两侧：大厂高管 0.0% 脏话 vs 普通开发者活该失业", False),
    "15-clown-makeup": ("15", "0 USPTO Trademarks Clown Makeup", "0 件 USPTO 注册商标小丑四连：17 小时后连夜补写 TRADEMARK.md", True),
    "15b-trophy": ("15", "\"This Is Where I'd Put My USPTO Trademark — IF I HAD ONE\"", "「这就是我放美国注册商标的地方——如果我有的话」", False),
    "16-uno-draw25": ("16", "Apologize Sincerely or Draw 25", "诚恳道歉还是抽 25 张牌？「我什么都没做错！」", True),
    "16b-domino-effect": ("16", "Domino Effect: 1 MIT Fork Tweet → EU GDPR Blitz", "多米诺骨牌：一条骂中国 Fork 的推文引发全网源码审计与 GDPR 举报", False),
    "17-evil-kermit": ("17", "Evil Kermit: Preach Compliance / Share 10-Account Proxy", "黑化青蛙：嘴上喊合规，背地分享 10 账号代理池白嫖", False),
    "18a-doge-cheems": ("18", "Apr 2026 vs. Nov 2026 Fake GitHub Stars", "4 月痛批假星骗 VC vs 11 月自合 30 秒偷点星弹窗冲 7.7 万星", False),
    "18b-roll-safe": ("18", "Roll Safe: 77k Stars with 129 Watchers", "聪明绝顶：30 秒闲置弹窗拿宿主凭证刷出 7.7 万星（129 关注）", False),
    "19a-bike-fall": ("19", "Bike Fall: Blaming Chinese Twitter for ca81b7b9 Vulns", "自己插棍摔车：把 ca81b7b9 五大漏洞怪到中文推头上", False),
    "19b-undertaker": ("19", "Undertaker Looming: ca81b7b9 LAN Cookie & SSH_AUTH_SOCK", "送葬者贴脸：刚吹完安全，ca81b7b9 明文 Cookie 与 RCE 就被扒了", False),
}

CLASSIC_META = {
    "00a-family-guy-mit-check": ("00", "MIT License Origin Check (11 Hours Apart)", "MIT 开源「血统检测卡」（相隔 11 小时）"),
    "00b-drake-11-hours": ("00", "Drake 11 Hours Receipt Edition", "Drake 11 小时双标（带二维码铁证版）"),
    "14-gordon-ramsay-1151-tweets": ("14", "1,151 Tweets Selective Politeness Receipt", "1,151 条推文选择性礼貌（带收据条）"),
    "15-clown-zero-trademarks": ("15", "0 USPTO Trademarks Clown Receipt", "0 件美国商标事后补刀（带收据条）"),
    "16-cycle-repeat-offender": ("16", "2024–2026 Repeat Offender Cycle", "2024–2026 惯犯行为闭环图"),
}

COMICS_META = {
    "00-same-mit-11-hours-apart-en-qr": ("00", "Editorial Strip #00 (EN): Same MIT, 11 Hours Apart", "讽刺漫画 #00（英文带码）：同一个 MIT，11 小时两副嘴脸"),
    "00-same-mit-11-hours-apart-zh-qr": ("00", "Editorial Strip #00 (ZH): 同一个 MIT，11 小时两副嘴脸", "讽刺漫画 #00（中文带码）：同一个 MIT，11 小时两副嘴脸"),
    "14-1151-tweets-selective-politeness-en-qr": ("14", "Editorial Strip #14 (EN): 1,151 Tweets Measured", "讽刺漫画 #14（英文带码）：1,151 条推文精准看人下菜碟"),
    "14-1151-tweets-selective-politeness-zh-qr": ("14", "Editorial Strip #14 (ZH): 1,151 条连续推文实锤", "讽刺漫画 #14（中文带码）：1,151 条连续推文实锤"),
}


def detect_exhibit(stem: str) -> str:
    m = re.match(r"^(\d{2})", stem)
    if m and m.group(1) in CASE_TO_THREAD:
        return m.group(1)
    return "00"


def collect_sources() -> list[dict]:
    items: list[dict] = []

    # 1. 19 Sins Collector Cards
    sins_dir = MEMES_DIR / "yugioh_19sins"
    if sins_dir.is_dir():
        for p in sorted(sins_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex, t_en, t_zh = SINS_META.get(stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem))
            items.append({
                "id": f"sins-{stem}",
                "series": "sins",
                "exhibit": ex,
                "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
                "titleEn": t_en,
                "titleZh": t_zh,
                "featured": True,
                "srcPath": p,
                "r2Key": f"memes/sins/{stem}.webp",
            })

    # 2. 33 Viral Blended Memes
    blended_dir = MEMES_DIR / "blended_en"
    if blended_dir.is_dir():
        for p in sorted(blended_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex, t_en, t_zh, feat = BLENDED_META.get(
                stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem, False)
            )
            items.append({
                "id": f"blended-{stem}",
                "series": "blended",
                "exhibit": ex,
                "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
                "titleEn": t_en,
                "titleZh": t_zh,
                "featured": feat,
                "srcPath": p,
                "r2Key": f"memes/blended/{stem}.webp",
            })

    # 3. Classic Receipt Memes
    classic_dir = MEMES_DIR / "classic_en"
    if classic_dir.is_dir():
        for p in sorted(classic_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex, t_en, t_zh = CLASSIC_META.get(stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem))
            items.append({
                "id": f"classic-{stem}",
                "series": "classic",
                "exhibit": ex,
                "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
                "titleEn": t_en,
                "titleZh": t_zh,
                "featured": False,
                "srcPath": p,
                "r2Key": f"memes/classic/{stem}.webp",
            })

    # 4. Bilingual Editorial Strips (QR share editions)
    out_dir = MEMES_DIR / "out"
    if out_dir.is_dir():
        for lang_sub in ("en", "zh"):
            sub = out_dir / lang_sub
            if not sub.is_dir():
                continue
            for p in sorted(sub.glob("*-qr.png")):
                stem = p.stem
                ex, t_en, t_zh = COMICS_META.get(stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem))
                items.append({
                    "id": f"comics-{stem}",
                    "series": "comics",
                    "exhibit": ex,
                    "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
                    "titleEn": t_en,
                    "titleZh": t_zh,
                    "featured": False,
                    "srcPath": p,
                    "r2Key": f"memes/comics/{stem}.webp",
                })

    # 5. Future community-submitted memes (drop any image into memes/community/)
    comm_dir = MEMES_DIR / "community"
    if comm_dir.is_dir():
        for p in sorted(comm_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex = detect_exhibit(stem)
            items.append({
                "id": f"community-{stem}",
                "series": "community",
                "exhibit": ex,
                "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
                "titleEn": stem.replace("-", " ").replace("_", " ").title(),
                "titleZh": f"社区投稿 · {stem}",
                "featured": False,
                "srcPath": p,
                "r2Key": f"memes/community/{stem}.webp",
            })

    return items


def convert_to_webp(item: dict) -> dict:
    src: Path = item["srcPath"]
    dst = STAGE_DIR / item["r2Key"]
    dst.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(src) as im:
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        w, h = im.size
        if max(w, h) > MAX_DIM:
            im.thumbnail((MAX_DIM, MAX_DIM), Image.Resampling.LANCZOS)
            w, h = im.size
        im.save(dst, "WEBP", quality=WEBP_QUALITY, method=5)

    raw_bytes = dst.read_bytes()
    sha = hashlib.sha256(raw_bytes).hexdigest()[:16]
    item["webpPath"] = dst
    item["width"] = w
    item["height"] = h
    item["bytes"] = len(raw_bytes)
    item["sha"] = sha
    item["url"] = f"{CDN_BASE}/{item['r2Key']}"
    return item


def upload_one(item: dict, uploaded_cache: dict, force: bool) -> tuple[str, str]:
    key = item["r2Key"]
    if not force and uploaded_cache.get(key) == item["sha"]:
        return (key, "skipped")

    cmd = [
        "wrangler",
        "r2",
        "object",
        "put",
        f"{BUCKET}/{key}",
        "--file",
        str(item["webpPath"]),
        "--content-type",
        "image/webp",
        "--cache-control",
        "public, max-age=31536000, immutable",
        "--remote",
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"Upload failed for {key}: {proc.stderr or proc.stdout}")
    return (key, "uploaded")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Re-upload every WebP even if hash unchanged")
    parser.add_argument("--no-upload", action="store_true", help="Convert and write memes.json without uploading")
    parser.add_argument("--workers", type=int, default=6, help="Concurrent upload workers")
    args = parser.parse_args()

    items = collect_sources()
    if not items:
        print("No memes found in memes/.", file=sys.stderr)
        return 1

    print(f"Found {len(items)} curated memes. Converting to WebP (max {MAX_DIM}px, q={WEBP_QUALITY})...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=os.cpu_count() or 4) as ex:
        items = list(ex.map(convert_to_webp, items))

    total_kb = sum(i["bytes"] for i in items) / 1024
    print(f"Converted {len(items)} WebPs -> total {total_kb / 1024:.2f} MB (avg {total_kb / len(items):.0f} KB/img)")

    uploaded_cache: dict = {}
    if STATE_FILE.is_file():
        try:
            uploaded_cache = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except Exception:
            uploaded_cache = {}

    if not args.no_upload:
        print(f"Uploading to R2 bucket '{BUCKET}' ({CDN_BASE}) with {args.workers} workers...")
        uploaded = 0
        skipped = 0
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
            futs = {ex.submit(upload_one, it, uploaded_cache, args.force): it for it in items}
            for fut in concurrent.futures.as_completed(futs):
                it = futs[fut]
                key, status = fut.result()
                if status == "uploaded":
                    uploaded += 1
                    uploaded_cache[key] = it["sha"]
                else:
                    skipped += 1
        STATE_FILE.write_text(json.dumps(uploaded_cache, indent=2) + "\n", encoding="utf-8")
        print(f"R2 sync complete: uploaded={uploaded}, skipped={skipped}")

    counts: dict[str, int] = {}
    out_items = []
    for it in items:
        counts[it["series"]] = counts.get(it["series"], 0) + 1
        out_items.append({
            "id": it["id"],
            "series": it["series"],
            "exhibit": it["exhibit"],
            "thread": it["thread"],
            "titleEn": it["titleEn"],
            "titleZh": it["titleZh"],
            "featured": it["featured"],
            "url": it["url"],
            "width": it["width"],
            "height": it["height"],
            "bytes": it["bytes"],
        })

    payload = {
        "cdnBase": CDN_BASE,
        "bucket": BUCKET,
        "total": len(out_items),
        "counts": counts,
        "items": out_items,
    }
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_JSON.relative_to(ROOT)} ({len(out_items)} entries, counts={counts})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
