#!/usr/bin/env python3
"""Compress memes into crisp WebP (preserving animated GIFs as GIF), upload to Cloudflare R2
(temu3-media -> cdn.temu3code.com), and generate site/data/memes.json for Temu3 Code + /memes/ + Tmail.

Usage:
  python3 scripts/publish_memes.py              # convert + upload changed/new files + rebuild memes.json
  python3 scripts/publish_memes.py --force      # re-upload every asset to R2
  python3 scripts/publish_memes.py --no-upload  # convert + rebuild memes.json only (offline check)
"""

from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import json
import os
import re
import shutil
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
STORY_MAX_DIM = 1536
PROMO_MAX_DIM = 1600
WEBP_QUALITY = 86
STICKER_WEBP_QUALITY = 90
STORY_WEBP_QUALITY = 88
STORY_I18N_WEBP_QUALITY = 86
PODCAST_MIN_BYTES = 50_000

STORY_LANGUAGES = (
    "en",
    "zh-CN",
    "zh-TW",
    "ja",
    "ko",
    "fr",
    "es",
    "de",
    "pt-BR",
    "ru",
    "ar",
    "it",
    "nl",
    "pl",
    "tr",
    "vi",
    "id",
    "hi",
)

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
    "20": "2026-11-23-origin-temu3-threat",
    "21": "2026-11-22-antigravity-spoof-3min-ban",
    "22": "2026-11-25-gdpr-overnight-collapse",
    "23": "2026-11-25-ca81b7b9-active-vulns",
    "24": "2026-11-25-ca81b7b9-active-vulns",
}

# Receipts #20-#24 link directly to the verified X thread until dedicated Tmail entries are added.
CASE_TO_SOURCE_URL = {
    "20": "https://x.com/realchendahuang/status/2126204776467853346",
    "21": "https://x.com/realchendahuang/status/2126228292231659944",
    "22": "https://x.com/realchendahuang/status/2126229298164171078",
    "23": "https://x.com/realchendahuang/status/2126243499142181151",
    "24": "https://x.com/realchendahuang/status/2126263438209077355",
}

# Every entry carries: (exhibit, titleEn, titleZh, noteEn, noteZh[, featured])
SINS_META: dict[str, tuple[str, str, str, str, str]] = {
    "sin-01-bigotry-qi": (
        "00",
        "Sin 1 · Bigotry「歧」",
        "一宗罪 · 歧：同是 MIT 开源，两副嘴脸",
        "Threatened to get a Chinese dev's GitHub banned 11 minutes after a free MIT fork, then said 11 hours later that trillion-dollar US labs are welcome to copy MIT code.",
        "中国开发者做了免费 MIT Fork，他 11 分钟内威胁找 GitHub 封号；11 小时后聊到万亿美元美国大厂抄开源代码，他却说开源本来就能随便用。",
    ),
    "sin-02-deceit-qi": (
        "01",
        "Sin 2 · Deceit「欺」",
        "二宗罪 · 欺：嘴上说不追踪，代码默认全开",
        "The homepage promised 'No telemetry. Unless you opt in. Full stop.' while the app turned PostHog on by default and hashed other tools' login files.",
        "官网首页写着绝不追踪，实际软件默认打开 PostHog 上报，还把 ~/.claude.json 等别家工具的登录文件拿去做哈希。",
    ),
    "sin-03-gluttony-tun": (
        "02",
        "Sin 3 · Gluttony「吞」",
        "三宗罪 · 吞：41.6 GB 假删除 + 5 秒扫全机",
        "Clicking 'permanently delete' kept full chats on disk (bloating one database to 41.6 GB), while a background task scanned every running program every 5 seconds.",
        "点永久删除并没有真删，聊天记录全留在本地数据库里一路胀到 41.6 GB；后台还每 5 秒扫一遍全电脑正在跑的程序。",
    ),
    "sin-04-sloth-dai": (
        "03",
        "Sin 4 · Sloth「怠」",
        "四宗罪 · 怠：致命 Bug 躺 52 天，删隐私过滤只用 21 小时",
        "Left a bug that silently ran git push --force open for 52+ days, yet needed only 21 hours to drop a privacy filter so private models showed up on his leaderboard.",
        "会自动静默执行 git push --force 的高危 Bug 放了 52 天没修，但为了给自家榜单导数据，删掉隐私过滤只花了 21 小时。",
    ),
    "sin-05-forgery-wei": (
        "04",
        "Sin 5 · Forgery「伪」",
        "五宗罪 · 伪：伪造内部请求头，新号 3 分钟被封",
        "The FAQ promised zero ban risk, while the code faked internal Google headers and SSH variables, getting a brand-new $20 account banned in 3 minutes.",
        "官方 FAQ 保证零封号风险，代码却提取系统密钥伪造 Google 内部请求头去连接口，刚花 20 美元开的新号 3 分钟就被封了。",
    ),
    "sin-06-exposure-luo": (
        "05",
        "Sin 6 · Exposure「裸」",
        "六宗罪 · 裸：远程终端中继没有端到端加密",
        "T3 Connect terminates TLS on their own server with no end-to-end encryption, meaning your terminal traffic passes through their relay in plaintext.",
        "T3 Connect 远程连接没有端到端加密，用户的终端命令和输出都会以明文经过官方中继服务器。",
    ),
    "sin-07-envy-du": (
        "06",
        "Sin 7 · Envy「妒」",
        "七宗罪 · 妒：投了别人又嘲讽、还亲自下场抢生意",
        "After angel-investing in Vibe Kanban and Daytona, Theo publicly mocked Vibe Kanban shutting down and pitched paid cloud sandboxes directly competing with Daytona.",
        "他投了 Vibe Kanban 和 Daytona，结果公开嘲讽 Vibe Kanban 倒闭，又在 T3 Code 里提议做付费云沙盒跟 Daytona 正面抢生意。",
    ),
    "sin-08-blindness-mang": (
        "07",
        "Sin 8 · Blindness「盲」",
        "八宗罪 · 盲：自夸企业策略全关闭，文档自己打脸",
        "Claimed corporate Managed Policy makes it trivial to shut off all telemetry, while T3 Code's own docs listed four places where data still gets sent.",
        "他吹嘘自家企业托管策略能一键关掉所有追踪，结果自家官方文档白纸黑字写着还有 4 个关不掉的盲区。",
    ),
    "sin-09-greed-tan": (
        "08",
        "Sin 9 · Greed「贪」",
        "九宗罪 · 贪：拿默认遥测当免费商业情报雷达",
        "Default-on tracking fed a live radar watching 31.7 trillion tokens a day across users, used to pitch investors and land $300k+ in free API credits.",
        "免费客户端默认收集的数据汇总成每天 31.7 万亿 Token 的实时监控大盘，用来谈投资和拿超过 30 万美元的免费额度。",
    ),
    "sin-10-arrogance-kuang": (
        "09",
        "Sin 10 · Arrogance「狂」",
        "十宗罪 · 狂：自己随便合并，却骂提建议的用户",
        "Bragged about 500 commits a day and 'yolo merges,' then called a user giving feedback on GitHub Issue #33639 an 'ungrateful prick who is lazy as shit.'",
        "平时吹嘘自己日均 500 提交、靠 yolo merges 硬合代码，转头在 GitHub Issue 里把提反馈的用户骂成「忘恩负义的懒鬼混蛋」。",
    ),
    "sin-11-plunder-qie": (
        "10",
        "Sin 11 · Plunder「窃」",
        "十一宗罪 · 窃：喊完「我要偷了」，30 秒派机器人扒代码",
        "Replied 'Okay I'm stealing this' to another developer's fork and 30 seconds later told @bot to go copy her code into T3 Code.",
        "看到女开发者做的好功能，他公然回复「我要偷这个了」，30 秒后就直接让 @bot 去扒对方 Fork 的源码抄进自家项目。",
    ),
    "sin-12-mendacity-huang": (
        "11",
        "Sin 12 · Mendacity「谎」",
        "十二宗罪 · 谎：上午发澄清，2 小时内被自家补丁打脸",
        "Claimed in the morning they never logged file paths and opt-outs always worked; within two hours, his own team's emergency GDPR patches proved the opposite.",
        "早上刚发帖保证从没收集过文件路径、退出开关一直有效，不到两小时自家团队连夜合的紧急补丁就把这几条全证伪了。",
    ),
    "sin-13-concealment-man": (
        "13",
        "Sin 13 · Concealment「瞒」",
        "十三宗罪 · 瞒：悄悄修漏洞，安全公告挂零",
        "Quietly patched serious security holes inside regular pull requests without ever publishing a single GitHub Security Advisory to warn users.",
        "高危安全漏洞都混在普通 PR 里悄悄修掉，从未在 GitHub 上发过哪怕 1 份正式安全公告提醒用户升级。",
    ),
    "sin-14-servility-chan": (
        "14",
        "Sin 14 · Servility「谄」",
        "十四宗罪 · 谄：见大厂高管 0 脏话，见普通开发者张口就骂",
        "Across 1,151 consecutive posts: 0% swearing at 20 Big-Tech executives, 8% at regular developers, spiking 4x to 14.4% during the Chinese-fork meltdown.",
        "统计连续 1,151 条推文：对 20 位大厂高管脏话率 0%，对普通开发者 8%，在中文 Fork 冲突那 25 小时里直接飙到 14.4%。",
    ),
    "sin-15-fraud-zha": (
        "15",
        "Sin 15 · Fraud「诈」",
        "十五宗罪 · 诈：手里 0 件商标，威胁完封号才连夜补规矩",
        "Threatened a GitHub ban over 'trademark infringement' while holding zero US registered trademarks, then merged a TRADEMARK.md policy 17 hours later.",
        "拿「商标侵权」威胁找 GitHub 封别人号时，他公司在美国商标局连 1 件注册商标都没有，17 小时后才仓促补了一份 TRADEMARK.md。",
    ),
    "sin-16-recidivism-guan": (
        "16",
        "Sin 16 · Recidivism「惯」",
        "十六宗罪 · 惯：2024 到 2026，同一套戏码演了三年",
        "2024 harassment wave against Indian dev channels, 2025 $20k FFmpeg bounty stunt, 2026 Chinese tech Twitter tirade: the same cycle every year.",
        "2024 年挂印度开发者、2025 年拿 2 万美元悬赏挤兑 FFmpeg 维护者、2026 年骂中文科技圈是粪坑，连续三年同一套操作。",
    ),
    "sin-17-hypocrisy-jiao": (
        "17",
        "Sin 17 · Hypocrisy「矫」",
        "十七宗罪 · 矫：嘴上讲合规，背地分享多号白嫖代理",
        "Lectured others about rules and ToS while sharing a 10-account proxy Gist to bypass API limits and embedding his YouTube sponsors inside the cloud relay.",
        "嘴上大谈合规与版权，背地却分享过用 10 个账号搭代理池绕过额度限制的脚本，还把 YouTube 赞助商直接嵌进云中继。",
    ),
    "sin-18-vanity-xu": (
        "18",
        "Sin 18 · Vanity「虚」",
        "十八宗罪 · 虚：骂完假星骗融资，自己弹窗冲到 7.7 万星",
        "Mocked GitHub stars as a trick to fool VCs in April, then merged a 30-second idle popup using local credentials that pumped stars from 30k to 77k.",
        "4 月还骂 GitHub Star 是用来骗投资人的，11 月就自己合了 30 秒闲置弹窗，靠用户本地登录凭证把星数从 3 万刷到 7.7 万。",
    ),
    "sin-19-breach-lou": (
        "19",
        "Sin 19 · Breach「漏」",
        "十九宗罪 · 漏：最新版本仍留着 5 个安全漏洞",
        "Even after 259 more commits, five security holes remained open: plaintext 30-day LAN cookies, non-revocable Bearer tokens, and exposed SSH agents.",
        "即便连夜补了几百个提交，最新代码里依然留着 30 天明文局域网 Cookie、没法吊销的 Token 和陌生仓库暴露 SSH 密钥等 5 个漏洞。",
    ),
    "sin-20-coercion-xie": (
        "20",
        "Sin 20 · Coercion「胁」",
        "二十宗罪 · 胁：89 次浏览的推文引来深夜威胁与 AWS HR 投诉",
        "After AWS engineer @dmfigol posted an 89-view, 0-like critique, Theo entered midnight DMs declaring 'Fear is a good incentive,' mocked his English, and complained to AWS HR.",
        "AWS 工程师 @dmfigol 发了一条只有 89 次浏览、0 点赞的吐槽，Theo 深夜杀进私信扬言「恐惧是很好的激励」，羞辱对方英语非母语，逼对方道歉后还捅到 AWS HR。",
    ),
    "sin-21-impostor-mao": (
        "21",
        "Sin 21 · Impostor「冒」",
        "二十一宗罪 · 冒：冒充白名单编辑器 Zed，被 Google 警告后藏进更新日志",
        "PR #43026 and #43087 admitted Google warned internal API calls can flag accounts and T3 spoofed clientInfo: { name: 'zed' }. v0.1.13 hid both fixes inside '+380 bug fixes.'",
        "官方 PR #43026 和 #43087 亲口承认 Google 警告调用内部接口会封号，且 T3 握手时冒充过白名单编辑器 Zed；v0.1.13 发布说明却把这两项藏进了「其余 380 项修复」里。",
    ),
    "sin-22-evasion-dun": (
        "22",
        "Sin 22 · Evasion「遁」",
        "二十二宗罪 · 遁：刚发最终声明 16 分钟被打脸，干脆把追踪藏进闭源后端",
        "16 minutes after Theo's 'Final statement,' @sk1gl4a caught T3 reading 243 local Claude chats and billing 19% German VAT. Maintainers then closed PR #43889: 'nvm easier to do in slophouse.'",
        "刚发完九连绝不最终声明 16 分钟，就被德国开发者抓包偷偷扫描了 243 个本机 Claude 会话；维护者随后关闭追踪 PR，只留一句「算了，直接在闭源 slophouse 后端做更省事」。",
    ),
    "sin-23-sabotage-po": (
        "23",
        "Sin 23 · Sabotage「破」",
        "二十三宗罪 · 破：静音 Anthropic 安全警告，把 11 个浏览器的登录态全塞给桌面端 Agent",
        "Monkey-patched process.emitWarning to silence Anthropic's approval-shadowing warning, let host uploadFiles bypass Codex's sandbox, and left 11 browsers' cookies unisolated on Desktop.",
        "硬写钩子静音 Anthropic 的权限绕过警告，内置浏览器允许不经终端上传任意绝对路径文件绕开 Codex 沙盒，还把 11 个浏览器的解密 Cookie 塞进了桌面端未隔离的共享配置里。",
    ),
    "sin-24-leak-xie": (
        "24",
        "Sin 24 · Leak「泄」",
        "二十四宗罪 · 泄：把私密正文和完整 Prompt 塞进明文 URL，4 分 39 秒锁单冷处理",
        "Packed 8,000-char quotes, 32-char unselected context, and full prompts into plaintext URLs. When reported in Issue #29449, Julius locked it in 4m 39s with 0 replies and deleted the doc.",
        "复制引用和分享 Prompt 链接会把最多 8,000 字私密对话、前后各 32 字未选中上下文和完整提示词直接塞进明文 URL；隐私 Bug #29449 仅 4 分 39 秒就被零回复锁单转走，还删掉了说明文档。",
    ),
}

BLENDED_META: dict[str, tuple[str, str, str, str, str, bool]] = {
    "00-drake": (
        "00",
        "Drake: 11-Hour Double Standard",
        "Drake 拒绝/点赞：11 小时两种态度",
        "China dev makes a free MIT fork? Threaten a GitHub ban. Trillion-dollar US lab copies MIT code 11 hours later? 'Open source is open source!'",
        "中国开发者免费 Fork MIT 代码：立刻改名不然封号；11 小时后换成万亿美元美国大厂来抄：开源就是开源，随便用！",
        True,
    ),
    "00b-woman-yelling-cat": (
        "00",
        "Yelling at a Legal MIT Fork",
        "对着合法开源 Fork 破防大喊「Temu3 Code」",
        "Screaming 'Chinese knockoff' and 'Temu3 Code' at a developer who simply forked an MIT-licensed repo like the license explicitly allows.",
        "对方只是按 MIT 开源协议做了个免费 Fork，完全合法，他却冲上去大骂「山寨货」「Temu3 Code」还威胁封号。",
        False,
    ),
    "01a-scooby-mask": (
        "01",
        "Pulling Off the 'No Telemetry' Mask",
        "撕开「绝不追踪」的面具",
        "What was actually hiding behind the homepage promise 'No telemetry. Full stop.': default-on PostHog tracking and hashing ~/.claude.json.",
        "官网首页写着绝不追踪，打开源码一掀面具：默认开启 PostHog 上报，顺手还把别的 AI 工具的登录凭证拿去做哈希。",
        True,
    ),
    "01b-expanding-brain": (
        "01",
        "How to Handle Opt-Out Requests",
        "宇宙脑：面对用户要求关闭追踪的四步操作",
        "First promise no tracking, then quietly delete the promise, then reject 4 community opt-out PRs, and still ship zero Settings switches.",
        "第一步写绝不追踪，第二步悄悄删掉承诺，第三步连拒 4 个社区提交的关闭开关 PR，第四步设置页至今还是 0 个开关。",
        False,
    ),
    "02a-flex-tape": (
        "02",
        "Flex Tape on the 41.6 GB Fake Delete",
        "强力胶硬贴 41.6 GB 假删除",
        "Clicking 'permanently delete' only hid threads in the UI while leaving everything inside statev2.sqlite, bloating one user's disk by 41.6 GB.",
        "点了永久删除其实只做了界面隐藏，聊天数据原封不动留在硬盘里，有用户本地库一路胀到 41.6 GB。",
        False,
    ),
    "02b-always-has-been": (
        "02",
        "Wait, It Scans All OS Processes Every 5s?",
        "等等，它每 5 秒扫一次全机进程？一直都是",
        "A background Rust monitor quietly enumerated every running process and full command line on your machine every 5 seconds with no way to turn it off.",
        "后台有个 Rust 任务，每 5 秒扫描一遍你整台电脑上所有正在运行的程序和完整命令行，而且没有关闭入口。",
        False,
    ),
    "03a-sleeping-shaq": (
        "03",
        "Asleep for 52 Days, Awake in 21 Hours",
        "致命 Bug 睡 52 天，删隐私过滤 21 小时秒醒",
        "Ignored a bug silently running git push --force for 52+ days, but woke up fast to remove a model privacy filter in 21 hours for his public leaderboard.",
        "会偷偷强推代码覆盖主分支的 Bug 躺了 52 天没人理，一听说要给自家公开榜单导数据，21 小时就把隐私白名单删干净了。",
        False,
    ),
    "03b-distracted-bf": (
        "03",
        "Ditching Privacy for the Leaderboard",
        "回头哥：抛弃隐私保护，盯上自家榜单",
        "Chose feeding private model usage into slopalytics.com over keeping users' model privacy whitelist intact.",
        "为了让自己做的 slopalytics 榜单数据更好看，直接把原本保护用户隐私的模型过滤白名单给拆了。",
        False,
    ),
    "04a-trade-offer": (
        "04",
        "The Antigravity Trade Offer",
        "Antigravity 魔改交易：你交账号，我送封号",
        "You hand over your Google account; T3 Code spoofs internal Google headers and gets you banned in 3 minutes.",
        "代码提取你的钥匙串凭证并伪造 Google 内部请求头，用户交出刚充钱的账号，换来 3 分钟极速封号。",
        False,
    ),
    "04b-surprised-pikachu": (
        "04",
        "Surprised Pikachu After a 3-Minute Ban",
        "伪造内部接口被秒封后的震惊皮卡丘",
        "Spoofed Google's private v1internal endpoint and fake SSH headers, then acted shocked when fresh accounts got banned immediately.",
        "拿着伪造的内部请求头硬打 Google 私有接口，结果新号 3 分钟就被风控封禁，还一副很意外的样子。",
        False,
    ),
    "05-pawn-stars": (
        "05",
        "Best I Can Do Is Plaintext Relay",
        "典当行：想要端到端加密？最多给明文中继",
        "Users expected encrypted remote sessions in T3 Connect; the relay actually terminates TLS on their own servers with zero end-to-end encryption.",
        "大家以为远程连终端是端到端加密的，查完源码发现流量在官方中继服务器上直接解密明文转发。",
        False,
    ),
    "06-laughing-leo": (
        "06",
        "Angel Investor Laughing at a Shutdown",
        "天使投资人举杯嘲讽被投项目停服",
        "After investing in Vibe Kanban and Daytona, Theo publicly mocked Vibe Kanban shutting down while pitching a competing paid sandbox inside T3 Code.",
        "自己当了天使投资人，结果公开拿被投产品 Vibe Kanban 倒闭找乐子，转头还要在自家软件里做同类付费云沙盒。",
        False,
    ),
    "07-two-buttons": (
        "07",
        "Two Buttons: Marketing vs. Own Docs",
        "流汗选按钮：嘴上吹牛 vs 自家文档打脸",
        "Sweating between bragging 'best managed policy turns off all telemetry' and T3 Code's own docs admitting 4 blind spots still send data.",
        "一边在推上吹自家企业策略能彻底关掉所有上报，另一边自家文档自己承认还有 4 个关不掉的角落。",
        False,
    ),
    "08a-bernie-asking": (
        "08",
        "Once Again Asking for Your 31.7T Tokens",
        "桑德斯：再次向你索要免费算力数据",
        "Users' default-on telemetry fed a 31.7 trillion tokens/day radar that Theo used to show off market intelligence to investors and AI labs.",
        "大家平时用客户端默认上报的数据，汇成了每天 31.7 万亿 Token 的算力雷达，成了他跟大厂和投资人谈资源的筹码。",
        False,
    ),
    "08b-change-my-mind": (
        "08",
        "Default Telemetry Was the Business Model",
        "摆摊辩论：默认遥测不是手滑，就是生意",
        "Turning tracking on by default, rejecting 4 opt-out PRs, and piping 31.7T tokens/day into a live dashboard wasn't an accident.",
        "默认开启追踪、连拒 4 个关闭开关 PR、把数据接进实时大盘，这一连串操作显然不是不小心写错一行代码。",
        False,
    ),
    "09-boardroom-meeting": (
        "09",
        "Boardroom: 'Add an Opt-Out Toggle?'",
        "会议室扔出窗外：居然敢提加关闭开关？",
        "When contributors submitted tested PRs to add a simple telemetry toggle in Settings, the maintainers rejected them and said they wouldn't make opting out easier.",
        "社区开发者把带 147 项测试的遥测开关 PR 都写好了，维护者直接拒绝，还明说「不会让退出变得更容易」。",
        False,
    ),
    "10a-yall-got-any-more": (
        "10",
        "Got Any More Community Forks?",
        "还有没有社区 Fork？30 秒给你扒走",
        "After replying 'Okay I'm stealing this' to a dev's fork, he immediately dispatched @bot to scrape her repo and port the feature.",
        "看到别人 Fork 做出的好功能，喊完一句「我要偷这个了」，立刻叫机器人去把对方仓库扒过来照搬。",
        False,
    ),
    "10b-left-exit-12": (
        "10",
        "Hard Swerve: Scrape Her Fork in 30s",
        "高速急拐：自己偷别人 Fork 只用 30 秒",
        "Threatened legal action over someone forking his repo, yet swerved straight into sending @bot to scrape another developer's fork 30 seconds after seeing it.",
        "别人 Fork 他项目就要找 GitHub 封号，自己看到别人 Fork 里的好点子，30 秒就派机器人直接扒走。",
        False,
    ),
    "11-train-bus": (
        "11",
        "Morning Clarification Hit by Own PRs",
        "早上刚发澄清，两小时被自家 PR 撞飞",
        "Theo posted a morning thread insisting no paths were logged and opt-outs worked; two hours later, his team's own emergency PRs admitted the exact bugs.",
        "上午刚发长文拍胸脯保证没收路径、开关都好使，不到两小时自家团队连夜合的补丁就把这些话全撞碎了。",
        False,
    ),
    "12a-this-is-fine": (
        "12",
        "This Is Fine (2.2M IP Logs/Hour)",
        "火海里喝咖啡：每小时 220 万条 IP 日志",
        "Overnight patches after an EU GDPR complaint accidentally exposed that the relay was logging 2.2M IP-tagged requests per hour in Axiom for 30 days.",
        "欧盟 GDPR 举报后连夜补锅，意外曝光中继每小时往 Axiom 写 220 万条带真实 IP 的日志，一留就是 30 天。",
        False,
    ),
    "12b-panik-kalm-panik": (
        "12",
        "Panik / Kalm / Panik: GDPR Night",
        "欧盟 GDPR 举报后的连夜惊慌三连",
        "Got reported for GDPR, rushed 6 hours of overnight patches to calm things down, only for the patches themselves to expose even bigger leaks.",
        "收到欧盟隐私举报一阵慌乱，连夜狂打 6 小时补丁以为稳了，结果大家一看补丁源码，发现里面藏着更大的泄露。",
        False,
    ),
    "13-hide-the-pain": (
        "13",
        "Hide the Pain: 0 Security Advisories",
        "强颜欢笑：漏洞悄悄修了一堆，安全公告还是 0",
        "Serious vulnerabilities were patched quietly in routine commits, leaving the GitHub Security Advisories tab completely empty at 0.",
        "好几个高危漏洞都藏在日常提交里悄悄改掉了，GitHub 安全公告栏至今干干净净挂着个 0。",
        False,
    ),
    "14-gordon-ramsay": (
        "14",
        "Gordon Ramsay: VIPs vs. Chinese Devs",
        "地狱厨房双标：对硅谷大佬温柔，对中文圈狂喷",
        "Data from 1,151 posts: polite and zero swearing toward 20 Big-Tech VIPs, while calling Chinese tech Twitter 'the biggest fucking cesspit.'",
        "1,151 条推文对比：对 20 位硅谷大厂高管说话客客气气 0 脏话，转头骂中文科技圈是「史上最大粪坑」。",
        True,
    ),
    "14b-two-guys-bus": (
        "14",
        "Two Sides of the Bus: VIP vs. Regular Dev",
        "大巴车两头：大厂高管 vs 普通程序员",
        "One side gets 0% profanity and praise; regular engineers get told they 'deserve the mass unemployment.'",
        "坐大厂高管这边全是吹捧和零脏话；坐普通程序员这边得到的却是「活该大规模失业」。",
        False,
    ),
    "15-clown-makeup": (
        "15",
        "0 US Trademarks Clown Makeup",
        "小丑化妆四步：0 件商标强行维权",
        "Threaten a GitHub ban for 'trademark infringement,' hold zero USPTO trademarks, retroactively merge TRADEMARK.md 17 hours later, then tell people to get a better lawyer.",
        "先拿商标侵权威胁封号，一查美国商标局 0 件注册，17 小时后偷偷补份 TRADEMARK.md，还反过来让人「换个好点的律师」。",
        True,
    ),
    "15b-trophy": (
        "15",
        "Where I'd Put My Trademark (If I Had One)",
        "「这里放我的美国商标，如果我有的话」",
        "T3 Tools Inc. held zero USPTO registrations for T3 Code, T3 Tools, or T3 Connect when Theo threatened a trademark takedown.",
        "他拿商标威胁封号的时候，公司名下关于 T3 Code、T3 Tools 和 T3 Connect 的美国注册商标全都是 0。",
        False,
    ),
    "16-uno-draw25": (
        "16",
        "Apologize or Draw 25",
        "诚恳道歉还是抽 25 张牌？",
        "After calling Chinese tech Twitter a 'cesspit' and readers 'braindead,' he picked drawing 25: 'I'm not apologizing. I've done nothing wrong.'",
        "把中文技术圈骂成粪坑、骂读者脑残之后，他宁愿抽 25 张牌也坚决说：「我不会道歉，我什么都没做错。」",
        False,
    ),
    "16b-domino-effect": (
        "16",
        "Domino Effect: 1 Tweet to EU GDPR",
        "多米诺骨牌：一条骂人推文引爆全网扒源码",
        "One hostile tweet mocking a free MIT fork snowballed into a full code audit, 2.26M+ views, and an EU GDPR complaint within 48 hours.",
        "本来只是一条骂中国开源 Fork 的推文，48 小时内一路滚雪球演变成全网逐行审计源码和欧盟 GDPR 正式举报。",
        False,
    ),
    "17-evil-kermit": (
        "17",
        "Evil Kermit: Preach Rules, Share Bypass",
        "黑化青蛙：台前讲合规，台后分享多号代理",
        "Publicly lectured developers about following terms and ethics while having shared a 10-account proxy Gist to get around API quotas.",
        "公开场合大讲合规和规矩，自己却在 Gist 上分享过用 10 个账号搭代理池绕过额度限制的办法。",
        False,
    ),
    "18a-doge-cheems": (
        "18",
        "GitHub Stars: April vs. November",
        "柴犬对比：4 月痛批刷星 vs 11 月自己弹窗冲星",
        "In April he said GitHub stars were just a scam to trick VCs; in November he added a 30-second popup to jump from 30k to 77k stars.",
        "4 月痛骂 GitHub Star 就是用来骗投资人的，11 月就在自家软件里加了 30 秒闲置弹窗，把星数一口气拉到 7.7 万。",
        False,
    ),
    "18b-roll-safe": (
        "18",
        "77k Stars with Only 129 Watchers",
        "点太阳穴：7.7 万星却只有 129 个人点关注",
        "A 30-second idle popup used your local GitHub login to one-click star the repo, producing 77k stars alongside just 129 watchers.",
        "软件闲置 30 秒就弹窗引导用本机 GitHub 凭证一键点星，结果刷出 7.7 万颗星，真正点关注的人却只有 129 个。",
        False,
    ),
    "19a-bike-fall": (
        "19",
        "Blaming Chinese Twitter for His Own Bugs",
        "自己插棍摔车，反手怪中文技术圈",
        "Five security bugs (plaintext LAN cookies, non-revocable tokens, exposed SSH agents) were found in the latest code, and he blamed the critics who exposed them.",
        "最新代码里被查出明文局域网 Cookie、没法吊销的 Token 等 5 个安全漏洞，他却把账算到曝光问题的中文技术圈头上。",
        False,
    ),
    "19b-undertaker": (
        "19",
        "Undertaker: Security Bugs Right Behind Him",
        "送葬者贴脸：刚吹完安全，5 个新漏洞就被扒了",
        "Right after insisting the overnight fixes solved everything, an audit of the latest commit found 5 more open auth and SSH vulnerabilities.",
        "刚宣称连夜打完补丁已经彻底安全了，转头一查最新提交，又扒出 5 个局域网认证和 SSH 密钥暴露漏洞。",
        False,
    ),
    "20a-89views-domino": (
        "20",
        "89-View Tweet to AWS HR Complaint",
        "多米诺骨牌：89 浏览吐槽换来深夜私信与 AWS HR 投诉",
        "An AWS engineer posted an 89-view, 0-like critique; Theo blew up his midnight DMs, mocked his English, and reported him to AWS HR.",
        "AWS 工程师发了条只有 89 次浏览、0 点赞的吐槽，结果引来深夜私信炮轰、羞辱英语非母语，外加一封告到 AWS HR 的投诉。",
        False,
    ),
    "20b-evil-kermit-fear": (
        "20",
        "Evil Kermit: 'Fear Is a Good Incentive'",
        "黑化青蛙：私信里亲口说出「恐惧是很好的激励」",
        "When an AWS engineer politely suggested per-customer subdomains, Theo's midnight DM philosophy was 'Fear is a good incentive,' followed by an HR report.",
        "对方在私信里礼貌地给架构建议，Theo 却摊牌称「恐惧是很好的激励手段」，逼人道歉后顺手告到了 AWS HR。",
        False,
    ),
    "21a-scooby-zed": (
        "21",
        "Unmasking clientInfo: { name: 'zed' }",
        "撕开面具：握手时冒充白名单编辑器 Zed",
        "PR #43087 admitted T3 Code sent clientInfo: { name: 'zed', version: '0.0.0' } during Antigravity handshakes to bypass Google's allowlist.",
        "官方 PR #43087 亲口承认，T3 Code 在连 Google Antigravity 握手时故意把客户端名字伪装成 zed 来蹭白名单模型。",
        False,
    ),
    "21b-two-buttons-v0113": (
        "21",
        "v0.1.13 Changelog: GBK Files vs. Google Bans",
        "流汗选按钮：更新日志高亮 GBK 编码，把 Google 封号警告藏起来",
        "Out of 401 changes in v0.1.13, the 7 highlights talked about GBK text files while hiding Google's ban warning and Zed spoofing inside '+380 more bug fixes.'",
        "v0.1.13 共 401 项改动，置顶 7 条亮点大谈支持 GBK 编码，却把 Google 封号警告和冒充 Zed 的紧急修复藏进了「其余 380 项修复」里。",
        False,
    ),
    "22a-clown-final-statement": (
        "22",
        "Clown Makeup: 16 Minutes After 'Final Statement'",
        "小丑化妆四步：发完最终声明 16 分钟被抓包拆台",
        "Promised T3 never touches files on your machine; 16 minutes later @sk1gl4a caught 243 scanned Claude chats, 19% German VAT, and PR #43948 admitted it.",
        "刚发最终声明保证从不读电脑文件，16 分钟后就被抓包扫了 243 个本机 Claude 会话，第二天官方 PR #43948 自己认了账。",
        False,
    ),
    "22b-drake-germany-vat": (
        "22",
        "Drake: Threaten to Ban Germany vs. 19% VAT",
        "Drake 对比：嘴上威胁封禁德国，结账页照收 19% 德国增值税",
        "Threatened to ban Germany over a GDPR complaint while T3's Stripe checkout actively billed German buyers in euros with 19% German VAT.",
        "嘴上威胁欧盟举报就封禁德国用户，结果 Stripe 结账页在德国明码标价按欧元收 19% 德国增值税，依法直接落入 GDPR 管辖。",
        False,
    ),
    "22c-roll-safe-slophouse": (
        "22",
        "Roll Safe: 'nvm easier to do in slophouse'",
        "点太阳穴：开源会被审计，干脆塞进闭源 slophouse 后端",
        "Maintainer opened PR #43889 to link Connect users via analytics IDs, then closed it 10 minutes later with 5 words: 'nvm easier to do in slophouse.'",
        "维护者开 PR #43889 准备给 Connect 用户加追踪 ID，10 分钟后自己关掉，只留一句「算了，直接在闭源 slophouse 后端做更省事」。",
        True,
    ),
    "22d-trade-offer-privacy": (
        "22",
        "t3.chat Privacy Policy Page Trade Offer",
        "t3.chat 隐私政策页交易：零点击先收你浏览器指纹",
        "Opening t3.chat's own privacy policy page logged out without a single click already ran FingerprintJS and posted your visitorId to /api/identity.",
        "未登录打开 t3.chat 自家隐私政策页、鼠标一下不点，网页就已经偷偷跑完 FingerprintJS 并把浏览器指纹 POST 发给了 /api/identity。",
        False,
    ),
    "23a-gru-plan-sandbox": (
        "23",
        "Gru's Plan: Isolated Tabs Only on Headless Linux",
        "格鲁的计划：只在无界面 Linux 开隔离，桌面端 11 个浏览器全裸奔",
        "ServerBrowser.ts only turns on isolatedContext when desktop === null (headless Linux), leaving all 11 imported browsers' cookies shared with AI agents on Desktop.",
        "源码里的隔离上下文 isolatedContext 只在无头 Linux 服务器上启用，而真正导入了 11 个浏览器 Cookie 的桌面端永远是 false。",
        False,
    ),
    "23b-flex-tape-warning": (
        "23",
        "Flex Tape: Muting Anthropic's Security Warning",
        "强力胶硬贴：直接把 Anthropic 的安全警告静音",
        "When Anthropic's SDK warned that wildcard mcp__t3-code__* shadows Supervised approval, T3 Code monkey-patched process.emitWarning to silence it and wrote a unit test for the mute.",
        "Anthropic 官方 SDK 发出安全警告提示通配符绕过了人工审批，T3 Code 没去收紧权限，反而魔改 process.emitWarning 把警告直接静音，还专门写了单元测试确认静音生效。",
        False,
    ),
    "24a-anakin-padme-url": (
        "24",
        "Anakin & Padme: 8,000-Char Prompts in Plaintext URLs",
        "阿纳金与帕德梅：你没把 8,000 字 Prompt 直接塞进明文网址吧？",
        "Theo's PR #18454 puts up to 8,000-char prompts and private repo names into app.t3.codes/new?prompt=..., where link previews leak them straight into server logs.",
        "Theo 自提自合的 PR #18454 把最多 8,000 字完整 Prompt 和私有仓库名直接拼在公网 URL 后，贴进 Slack 或 Discord 就会被链接预览发进服务器日志。",
        True,
    ),
    "24b-disaster-girl-4m39s": (
        "24",
        "Disaster Girl: Locked Privacy Bug in 4m 39s",
        "微笑女孩：隐私 Bug 4 分 39 秒零回复锁单，顺手删文档",
        "When @Luca_Hagenmayer reported plaintext quote URLs leaking 32-char surrounding text (Issue #29449), Julius locked it in 4m 39s, shipped it to mobile, and deleted the doc.",
        "开发者举报引用链接明文泄露前后 32 字未选中正文（Issue #29449），4 分 39 秒就被零回复锁单转进讨论区，随后还推上了移动端并删了说明文档。",
        False,
    ),
}

REACTIONS_META: dict[str, tuple[str, str, str, str, str]] = {
    "01-reply-lie-detector": (
        "01",
        "Lie Detector: 'No Telemetry. Full Stop.'",
        "测谎仪回复图：git diff 证明「绝无遥测」是谎话",
        "Maury-style polygraph reaction for whenever someone repeats the deleted 'No telemetry. Full stop.' slogan.",
        "适合贴在评论区的经典测谎仪表情包：嘴上说着绝无遥测，git diff 直接当场拆穿。",
    ),
    "02-reply-uspto-zero": (
        "15",
        "Clipboard Receipt: 0 USPTO Trademarks",
        "回复图：理直气壮举起 0 件美国注册商标",
        "Quick reply graphic for any 'trademark infringement' claim: T3 Tools Inc. had zero USPTO registrations when the threat went out.",
        "一图反杀商标维权话术：威胁找 GitHub 封号时，公司名下美国注册商标数量为 0。",
    ),
    "03-reply-1151-scoreboard": (
        "14",
        "Scoreboard: 0.0% VIPs vs. 14.4% Chinese Devs",
        "计分板回复图：对大厂 VIP 0% vs 对中文圈 14.4%",
        "Sports-desk scoreboard showing the measured profanity gap across 1,151 consecutive X posts.",
        "体育直播计分板风格的对比图，一眼看懂 1,151 条推文里对硅谷高管和中文开发者的态度差距。",
    ),
    "04-reply-4am-delete": (
        "11",
        "4:00 AM Delete Button Panic",
        "回复图：凌晨四点满头大汗狂按删除键",
        "Late-night reaction meme for Theo's 4 AM threat to pull T3 Code closed-source, deleted before morning.",
        "还原凌晨 4 点威胁闭源、天亮前连夜删帖的名场面，适合各种删帖现场评论区。",
    ),
    "05-reply-void-in-china": (
        "00",
        "MIT License Certificate (*Void in China)",
        "回复图：MIT 开源证书（*中国开发者除外）",
        "Parody open-source certificate summarizing the 11-hour flip from threatening a Chinese MIT fork to welcoming trillion-dollar US labs.",
        "讽刺证书风格回复图：同一份 MIT 开源协议，11 小时内对美国大厂敞开怀抱、对中国开发者威胁封号。",
    ),
    "06-gif-clown-transform": (
        "15",
        "Animated GIF: 0 Trademarks Clown Progression",
        "动图 GIF：0 件商标强行维权的小丑四连变身",
        "Looping animated GIF stepping through all four stages of the retroactive TRADEMARK.md meltdown.",
        "四步逐行展开的循环动图，完整回放 0 件注册商标却威胁封号、17 小时后补写规则的全过程。",
    ),
    "07-gif-auto-star-counter": (
        "18",
        "Animated GIF: 30s Idle Auto-Star Counter (129 Watchers)",
        "动图 GIF：30 秒闲置弹窗狂飙 7.7 万星（129 关注纹丝不动）",
        "Animated desktop UI loop showing the 30-second idle popup firing PUT user/starred to pump stars to 77,000 while watchers stay frozen at 129.",
        "模拟客户端闲置 30 秒弹窗自动点星的动图：Star 一路狂飙到 77,000，旁边的 Watchers 死死冻在 129。",
    ),
}

CLASSIC_META: dict[str, tuple[str, str, str, str, str]] = {
    "00a-family-guy-mit-check": (
        "00",
        "The 11-Hour MIT Origin Check",
        "MIT 开源「出身检测卡」（相隔 11 小时）",
        "Same MIT license, 11 hours apart: a Chinese dev's fork got a GitHub ban threat, while a trillion-dollar US company got a thumbs-up.",
        "同样按 MIT 协议用代码，相隔不到 11 小时：中国开发者收到封号威胁，万亿美元美国大厂却得到一句「开源就是开源」。",
    ),
    "00b-drake-11-hours": (
        "00",
        "Drake 11-Hour Double Standard (With Links)",
        "Drake 11 小时双标（附原帖扫码）",
        "Side-by-side of @theo's two posts 11 hours apart: ban threat for a Chinese MIT fork vs. cheering trillion-dollar US labs.",
        "把相隔 11 小时的两条原帖摆在一起对照：一边威胁封杀中国 Fork，一边力挺万亿美企随便用开源。",
    ),
    "14-gordon-ramsay-1151-tweets": (
        "14",
        "1,151 Posts: Polite to VIPs, Rude to Devs",
        "1,151 条推文对比：对大佬客气，对开发者开喷",
        "Counted 1,151 consecutive posts over 17 days: 0% profanity toward 20 Big-Tech VIPs, 8% toward regular devs, and 14.4% during the crisis.",
        "连续 17 天共 1,151 条推文的实测结果：对 20 位大厂高管 0% 脏话，对普通开发者 8%，冲突爆发期飙到 14.4%。",
    ),
    "15-clown-zero-trademarks": (
        "15",
        "0 US Trademarks, Policy Added 17h Later",
        "0 件美国商标，威胁封号 17 小时后才补写规则",
        "Threatened a trademark takedown with zero USPTO registrations on file, then quietly added TRADEMARK.md 17 hours after the fact.",
        "手里连 1 件美国注册商标都没有就拿商标吓唬人，事后过了 17 小时才偷偷给仓库加上 TRADEMARK.md。",
    ),
    "16-cycle-repeat-offender": (
        "16",
        "The 2024–2026 Repeat Cycle",
        "2024 到 2026：三年一模一样的循环",
        "Pick a target, stir up a pile-on, delete posts or refuse to apologize once receipts surface: repeated in 2024, 2025, and 2026.",
        "挑靶子开喷、带节奏网暴、被晒出实锤后删帖或拒不道歉，2024、2025、2026 连续三年照搬同一套流程。",
    ),
}

COMICS_96H_META: dict[str, tuple[str, str, str, str, str]] = {
    "ep01_11_hours_apart": (
        "00",
        "96h Comic Ep.1: 11 Hours Apart",
        "96 小时连载第 1 话：相隔 11 小时",
        "Episode 1 of the 8-part comic: how one free MIT fork turned into 'Temu3 Code' and a GitHub ban threat, 11 hours before welcoming trillion-dollar US labs.",
        "8 话暴漫连载第 1 话：一个免费 MIT Fork 怎么变成「Temu3 Code」和封号威胁，11 小时后却对万亿美企热烈欢迎。",
    ),
    "ep02_worst_block_click": (
        "16",
        "96h Comic Ep.2: The Worst Block Click",
        "96 小时连载第 2 话：他按过最亏的一次拉黑",
        "Episode 2: asking one polite question about the double standard got instant-blocked, kicking off a full historical audit back to FFmpeg.",
        "第 2 话：在评论区礼貌问了一句是不是双标就被秒拉黑，直接拉开了从 FFmpeg 悬赏一路扒到现在的序幕。",
    ),
    "ep03_no_telemetry_full_stop": (
        "01",
        "96h Comic Ep.3: 'No Telemetry. Full Stop.'",
        "96 小时连载第 3 话：「绝无遥测，句号。」",
        "Episode 3: checking the source code behind the 'No telemetry' slogan turned up default-on PostHog, ~/.claude.json hashing, and 41.6 GB fake deletes.",
        "第 3 话：掀开官网「绝无遥测」的招牌逐行读源码，扒出默认 PostHog、哈希登录文件和 41.6 GB 假删除。",
    ),
    "ep04_western_medicine_gdpr": (
        "11",
        "96h Comic Ep.4: Western Medicine Works Fast",
        "96 小时连载第 4 话：欧盟 GDPR 见效真快",
        "Episode 4: months of user complaints got mocked, but one EU GDPR filing triggered a 6-hour overnight patch sprint exposing 2.2M/hr IP logs.",
        "第 4 话：社区骂了几个月的隐私问题没人管，欧盟一纸 GDPR 举报下来，团队 6 小时通宵狂打补丁，还顺带露出了每小时 220 万条 IP 日志。",
    ),
    "ep05_3h30_retirement": (
        "19",
        "96h Comic Ep.5: The 3.5-Hour Retirement",
        "96 小时连载第 5 话：只持续了 3.5 小时的收山",
        "Episode 5: planned to wrap up after 18 receipts and go back to coding, until another meltdown and fresh bugs pulled the archive right back open 3.5 hours later.",
        "第 5 话：本来写完 18 弹打算收山回去写代码，结果不到 3 个半小时新瓜和漏洞又自动送上门了。",
    ),
    "ep06_89_views_fear": (
        "20",
        "96h Comic Ep.6: 89 Views & 'Fear Is a Good Incentive'",
        "96 小时连载第 6 话：89 次浏览与「恐惧是好激励」",
        "Episode 6: flashback to Jan 2025 when AWS engineer @dmfigol posted an 89-view critique and got midnight threats plus an AWS HR complaint.",
        "第 6 话：闪回 2025 年 1 月，AWS 工程师一条 89 浏览的吐槽引来深夜私信威胁，还被直接告到 AWS HR。",
    ),
    "ep07_hi_im_zed_11_browsers": (
        "21",
        "96h Comic Ep.7: Hi, I'm Zed (+ 11 Browsers)",
        "96 小时连载第 7 话：你好，我是 Zed（外加 11 个浏览器）",
        "Episode 7: Google flagged T3 Code for calling internal endpoints and spoofing clientInfo: 'zed', right alongside Desktop's 11-browser cookie importer.",
        "第 7 话：Google 点名警告调用内部接口和冒充 Zed 握手，旁边桌面端还在忙着导入用户 11 个浏览器的 Cookie。",
    ),
    "ep08_slophouse_finale": (
        "22",
        "96h Comic Ep.8: 'nvm easier to do in slophouse'",
        "96 小时连载第 8 话：「算了，在闭源 slophouse 做更省事」",
        "Episode 8: when open-source auditing kept catching tracking PRs, maintainers closed PR #43889 and moved identity linking into the closed-source slophouse backend.",
        "第 8 话：放在开源仓库里老被社区抓包，维护者干脆关掉 PR #43889，把追踪逻辑直接塞进谁也看不见的闭源后端。",
    ),
}

COMICS_QR_META: dict[str, tuple[str, str, str, str, str]] = {
    "00-same-mit-11-hours-apart-en-qr": (
        "00",
        "Comic #00 (EN): Same MIT, 11 Hours Apart",
        "短漫 #00（英文版）：同一个 MIT，11 小时两副嘴脸",
        "A quick visual strip comparing his Nov 23 ban threat over a Chinese fork with his Nov 24 defense of trillion-dollar US labs.",
        "用一页漫画还原 11 月 23 日威胁封杀中国 Fork 与 11 小时后欢迎美国万亿大厂的荒诞反差。",
    ),
    "00-same-mit-11-hours-apart-zh-qr": (
        "00",
        "Comic #00 (ZH): Same MIT, 11 Hours Apart",
        "短漫 #00（中文版）：同一个 MIT，11 小时两副嘴脸",
        "Chinese edition of the 11-hour MIT double-standard strip, linking directly to both original X posts.",
        "中文版对比漫画：同样是 MIT 开源协议，11 小时内对中国开发者和美国大厂截然不同的态度。",
    ),
    "14-1151-tweets-selective-politeness-en-qr": (
        "14",
        "Comic #14 (EN): 1,151 Posts Counted",
        "短漫 #14（英文版）：1,151 条推文看人下菜碟",
        "Illustrates the 1,151-post breakdown: zero swearing toward Big-Tech executives vs. constant insults toward ordinary developers.",
        "画出 1,151 条推文统计背后的鲜明反差：面对硅谷大厂高管满脸笑意零脏话，面对普通开发者动辄爆粗口。",
    ),
    "14-1151-tweets-selective-politeness-zh-qr": (
        "14",
        "Comic #14 (ZH): 1,151 Posts Counted",
        "短漫 #14（中文版）：1,151 条推文看人下菜碟",
        "Chinese edition visualizing the 0% VIP vs. 8% developer vs. 14.4% crisis hostility numbers.",
        "中文版漫画：直观展示对大厂 VIP 0% 脏话、对普通开发者 8%、危机期飙到 14.4% 的三组对比。",
    ),
}

GAMING_META: dict[str, tuple[str, str, str, str, str]] = {
    "01-sekiro-google-ban": (
        "04",
        "Sekiro Screen: ACCOUNT BANNED (3:00 Speedrun)",
        "只狼界面：账号封禁（3 分钟极速通关）",
        "Sekiro death-screen parody for fresh $20 Google accounts getting banned in 3 minutes after T3 Code spoofed v1internal headers.",
        "恶搞《只狼》死亡大字：T3 Code 伪造 Google 内部请求头，刚充钱的新号 3 分钟就达成极速封号世界纪录。",
    ),
    "02-elden-boss-trademark": (
        "15",
        "Elden Ring Boss: Keeper of Zero Trademarks",
        "老头环 Boss：零商标守护者（二阶段补写 TRADEMARK.md）",
        "Soulsborne boss health bar for threatening a trademark takedown with 0 USPTO filings, entering Phase II by merging TRADEMARK.md 17 hours late.",
        "魂系 Boss 血条恶搞：手里 0 件美国注册商标却拿大锤威胁封号，打进二阶段才连夜补写 TRADEMARK.md。",
    ),
    "03-souls-force-push": (
        "03",
        "Dark Souls Screen: MAIN BRANCH WIPED",
        "黑魂界面：主分支已蒸发（静默强推 52 天）",
        "Dark Souls bonfire parody for Issue #15353 silently running git push --force for 52+ days while leaderboard fixes shipped in 21 hours.",
        "黑魂大字恶搞：会静默执行 git push --force 的致命 Bug 躺了 52 天没人管，改自家榜单数据却只花了 21 小时。",
    ),
    "04-steam-11hr-flipflop": (
        "00",
        "Steam Achievement: 'Open Source Is Open Source'",
        "Steam 成就解锁：11 小时极速变脸",
        "Rare Steam achievement unlocked for calling a Chinese MIT fork 'Temu3 Code' and welcoming a $1T US lab copying MIT code 11 hours later.",
        "Steam 稀有成就恶搞：先骂中国 MIT Fork 是山寨货，11 小时后改口力挺万亿美元美国大厂随便用开源。",
    ),
    "05-steam-0-trademarks": (
        "15",
        "Steam Achievement: 'Get a Better Lawyer'",
        "Steam 成就解锁：「换个好点的律师」（0 件商标）",
        "Rare Steam achievement for flexing trademark threats with zero US trademarks on file and telling critics to hire a better lawyer.",
        "Steam 成就恶搞：在美国商标局一件商标都没注册，威胁完封号还反手让人去换个更好的律师。",
    ),
    "06-steam-41gb-ghost": (
        "02",
        "Steam Achievement: 'Permanently Deleted' (0 Bytes Freed)",
        "Steam 成就解锁：「永久删除」（释放 0 字节）",
        "Rare Steam achievement for clicking 'Permanently Delete' while statev2.sqlite keeps every chat and swells to 41.6 GB.",
        "Steam 成就恶搞：点完「永久删除」硬盘空间一字节都没省，本地数据库一路涨到 41.6 GB。",
    ),
    "07-steam-77k-stars": (
        "18",
        "Steam Achievement: '100% Organic Growth' (129 Watchers)",
        "Steam 成就解锁：「纯自然增长」（7.7 万星 / 129 关注）",
        "Rare Steam achievement for auto-starring your own repo after 30s idle to reach 77,000 stars while watchers sit at 129.",
        "Steam 成就恶搞：靠软件闲置 30 秒弹窗冲到 7.7 万颗星，真正点关注的却只有 129 人。",
    ),
}

IDIOMS_META: dict[str, tuple[str, str, str, str, str]] = {
    "01-zei-han-zhuo-zei": (
        "10",
        "Chinese Idiom #01: 贼喊捉贼 (Thief Shouting Thief)",
        "每日成语 #01：贼喊捉贼",
        "Calling a legal MIT fork 'Temu3 Code' while publicly replying 'Okay I'm stealing this' and sending @bot to scrape another dev's fork 30 seconds later.",
        "一边骂合法 MIT Fork 是山寨货，一边自己喊完「我要偷了」，30 秒后就派机器人去扒女开发者的 Fork。",
    ),
    "02-qi-ruan-pa-ying": (
        "14",
        "Chinese Idiom #02: 欺软怕硬 (Bully Weak, Bow Strong)",
        "每日成语 #02：欺软怕硬",
        "Measured across 1,151 posts: 0.0% profanity toward US Big-Tech VIPs, jumping to 14.4% direct insults during the Chinese-fork crisis.",
        "1,151 条推文实测：对美国大厂高管脏话率 0%，对中文开发者冲突期直接飙到 14.4%。",
    ),
    "03-ci-di-wu-yin": (
        "11",
        "Chinese Idiom #03: 此地无银三百两 (No Silver Buried Here)",
        "每日成语 #03：此地无银三百两",
        "Posting a 'we never log file paths or IPs' denial, only for his own overnight GDPR patches to expose 2.2M/hr Axiom IP logs and git.cwd leaks.",
        "刚立牌子宣布从不记路径和 IP，自家连夜打的 GDPR 补丁转手就把每小时 220 万条 IP 日志和路径泄露全抖了出来。",
    ),
    "04-zhi-lu-wei-ma": (
        "15",
        "Chinese Idiom #04: 指鹿为马 (Calling a Deer a Horse)",
        "每日成语 #04：指鹿为马",
        "Pointing at zero USPTO registrations and calling it a federal trademark, then merging TRADEMARK.md 17 hours after threatening a ban.",
        "对着 0 件美国注册商标硬喊联邦商标侵权，威胁完封号过了 17 小时才补出一份 TRADEMARK.md。",
    ),
    "05-ye-gong-hao-long": (
        "00",
        "Chinese Idiom #05: 叶公好龙 (Loves Dragons Until One Shows Up)",
        "每日成语 #05：叶公好龙",
        "Puts 'Steal our code (legally)!' on the MIT homepage, then melts down and threatens a GitHub ban the moment someone actually forks it.",
        "官网首页挂着 MIT 协议写「欢迎合法偷我们代码」，真有人来 Fork 了又瞬间破防威胁封号。",
    ),
    "06-yan-er-dao-ling": (
        "13",
        "Chinese Idiom #06: 掩耳盗铃 (Plugging Ears to Steal a Bell)",
        "每日成语 #06：掩耳盗铃",
        "Silently deleting 'No telemetry' from the README and fixing critical security holes in quiet commits while keeping GitHub Security Advisories at 0.",
        "悄悄删掉 README 里的绝不追踪承诺，高危安全洞混在普通提交里偷摸改掉，只要不发安全公告就当没发生过。",
    ),
}

PACKAGING_META: dict[str, tuple[str, str, str, str, str]] = {
    "01-t3code-iceberg": (
        "00",
        "The T3 Code Iceberg",
        "T3 Code 黑历史冰山全景图",
        "Five tiers deep from the surface 'Temu3 Code' tweet down to 41.6 GB fake deletes, 2.2M/hr IP logs, 0 advisories, and the 4 AM deleted meltdown.",
        "一张冰山图看完五层瓜：从水面上的 Temu3 威胁，一路深挖到 41.6 GB 假删除、220 万/时 IP 日志和凌晨四点删帖。",
    ),
    "02-fda-nutrition-facts": (
        "01",
        "FDA Label: Telemetry Facts",
        "美式营养成分表：T3 Code 遥测成分表",
        "Grocery nutrition label parody: 31.7T tokens/day harvested, 100% default PostHog, 2.2M/hr IP logs, 0% E2E encryption, 0% USPTO trademarks.",
        "美式食品营养表恶搞：每安装一份含 100% 默认 PostHog、每小时 220 万 IP 日志、0% 端到端加密、0% 美国注册商标。",
    ),
    "03-pharma-box-parody": (
        "18",
        "Prescription Drug Ad: T3 Code® (No-Telemetry™)",
        "美式处方药广告恶搞：T3 Code（无遥测版）",
        "Glossy US magazine pharma ad parody complete with fine-print side effects: 3-minute Google bans, silent force-pushes, and 77k auto-stars.",
        "美式电视处方药广告恶搞：底部小字写着副作用，包括 3 分钟封号、静默强推和自动点星。",
    ),
    "04-mit-license-coupon": (
        "00",
        "Supermarket Coupon: Free MIT Open Source",
        "超市剪角优惠券：免费 MIT 开源（附极小免责条款）",
        "Retro Sunday-circular coupon offering '100% OFF Steal Our Code (Legally)!' with microscopic fine print banning Chinese forks.",
        "复古超市优惠券恶搞：大字写着「免费随便偷代码」，底部极小字写着「中国开发者不适用」。",
    ),
}

POKEMON_META: dict[str, tuple[str, str, str, str, str]] = {
    "01-evo-star-farmer": (
        "18",
        "Evolution Line #01: The Star Farmer",
        "宝可梦进化链 #01：刷星大帝",
        "Three-stage evolution from mocking GitHub stars as a VC trick to merging a 30s idle popup and sitting on 77,000 stars (129 watchers).",
        "三段进化链：从骂 GitHub Star 骗投资人，到合入 30 秒闲置弹窗，最终进化成坐拥 7.7 万星（129 关注）的刷星大帝。",
    ),
    "02-evo-two-year-cycle": (
        "16",
        "Evolution Line #02: The Two-Year Cycle",
        "宝可梦进化链 #02：三年循环（凌晨四点重置）",
        "Evolves from 2024 Indian-dev apology to 2025 FFmpeg bounty drama to 2026 Chinese Twitter meltdown, then resets at 4 AM.",
        "从 2024 年挂印度开发者道歉，进化到 2025 年 FFmpeg 悬赏风波，再到 2026 年中文圈破防，凌晨 4 点删帖重置循环。",
    ),
    "03-evo-no-telemetry": (
        "01",
        "Evolution Line #03: 'No Telemetry'",
        "宝可梦进化链 #03：「绝无遥测」的三段变身",
        "Starts as a pure 'No telemetry. Full stop.' homepage promise, evolves into default PostHog, and reaches final form as closed-source slophouse.",
        "一阶是官网圣洁的「绝无遥测」，二阶进化成默认 PostHog 上报，最终形态化作闭源 slophouse 后端。",
    ),
    "04-creature-card-theo-ex": (
        "15",
        "Collector Card: DARK THEO EX (HP 77000)",
        "全图闪卡：DARK THEO EX（HP 77000）",
        "Full-art holographic parody card featuring 0 USPTO badge, 'Temu3 Tantrum' (4x vs Chinese devs, 0 vs VIPs), and '4:00 AM Delete.'",
        "全图闪卡恶搞：带 0 USPTO 徽章，两个技能分别是「Temu3 暴走（对中文圈 4 倍伤害、对美企 VIP 0 伤害）」和「凌晨 4 点删帖」。",
    ),
}


STICKERS_META: dict[str, tuple[str, str, str, str, str, str]] = {
    "01_copium_no_telemetry": ("01", "theo_copium", "Sticker #01 · COPIUM / No Telemetry", "表情 #01 · 吸氧：绝无遥测", "Transparent RGBA Wojak sticker (:theo_copium:) — inhaling pure 'No Telemetry' copium.", "透明底暴漫表情 (:theo_copium:)：狂吸「绝无遥测」纯氧。"),
    "02_crying_mask_4am": ("11", "theo_4am_mask", "Sticker #02 · 4:00 AM Crying Mask", "表情 #02 · 凌晨 4 点笑脸面具", "Transparent RGBA Wojak sticker (:theo_4am_mask:) — smiling mask over 4 AM damage control.", "透明底暴漫表情 (:theo_4am_mask:)：凌晨 4 点嘴硬面具下泪流满面。"),
    "03_rage_temu3": ("00", "theo_temu3", "Sticker #03 · TEMU3! Rage Meltdown", "表情 #03 · TEMU3! 经典暴走破防", "Transparent RGBA Rage Face (:theo_temu3:) — 11 minutes after a free MIT fork.", "透明底暴漫表情 (:theo_temu3:)：看到中国开源 MIT Fork 后 11 分钟暴走。"),
    "04_simp_1t_vip": ("00", "theo_1t_ok", "Sticker #04 · $1T OK! VIP Worship", "表情 #04 · 万亿大厂没问题！", "Transparent RGBA Soyjak (:theo_1t_ok:) — starry-eyed for trillion-dollar US labs.", "透明底暴漫表情 (:theo_1t_ok:)：面对万亿美元美国大厂立刻两眼放光。"),
    "05_clown_0_uspto": ("15", "theo_uspto0", "Sticker #05 · USPTO: 0 Clown", "表情 #05 · 美国商标：0 小丑", "Transparent RGBA Clown Wojak (:theo_uspto0:) — threatening trademark bans with 0 registrations.", "透明底暴漫表情 (:theo_uspto0:)：手握 0 件美国注册商标硬喊侵权。"),
    "06_troll_steal_bot": ("10", "theo_yoink", "Sticker #06 · YOINK! @bot Fork Snatch", "表情 #06 · 30 秒 @bot 扒走 Fork", "Transparent RGBA Trollface (:theo_yoink:) — 'Okay I'm stealing this' → @bot 30s later.", "透明底暴漫表情 (:theo_yoink:)：刚说「我要偷了」，30 秒派 @bot 扒代码。"),
    "07_yaoming_lawyer": ("15", "theo_lawyer", "Sticker #07 · LAWYER! 0 Trademarks", "表情 #07 · 换个好律师（0 商标）", "Transparent RGBA Yao Ming scoff (:theo_lawyer:) — telling critics to 'get a better lawyer.'", "透明底暴漫表情 (:theo_lawyer:)：0 件商标还叫人「换个好点的律师」。"),
    "08_sweat_gdpr": ("11", "theo_gdpr", "Sticker #08 · EU GDPR?! Sweating", "表情 #08 · 欧盟 GDPR？！狂流汗", "Transparent RGBA sweating Wojak (:theo_gdpr:) — 2.2M/hr IP spans in Axiom.", "透明底暴漫表情 (:theo_gdpr:)：收到欧盟 GDPR 举报，每小时 220 万 IP 日志露馅。"),
    "09_sleep_52d_force": ("03", "theo_52d_sleep", "Sticker #09 · 52d --force Asleep", "表情 #09 · 52 天静默强推熟睡", "Transparent RGBA snoring Wojak (:theo_52d_sleep:) — sleeping 52+ days on silent git push --force.", "透明底暴漫表情 (:theo_52d_sleep:)：静默 git push --force 高危 Bug 躺 52 天安稳大睡。"),
    "10_laser_21h_fix": ("03", "theo_21h_fix", "Sticker #10 · 21h FIX! Laser Eyes", "表情 #10 · 21 小时删过滤激光眼", "Transparent RGBA laser-eye Wojak (:theo_21h_fix:) — awake in 21h to drop the privacy filter.", "透明底暴漫表情 (:theo_21h_fix:)：为了榜单删隐私过滤，21 小时激光眼秒速合完。"),
    "11_trash_41gb": ("02", "theo_41gb", "Sticker #11 · 41.6 GB Fake Delete", "表情 #11 · 41.6 GB 假删除溢出", "Transparent RGBA panic Rage Face (:theo_41gb:) — overflowing 41.6 GB SQLite trash.", "透明底暴漫表情 (:theo_41gb:)：点永久删除实则不删，SQLite 胀爆 41.6 GB。"),
    "12_shocked_3min_ban": ("04", "theo_3min_ban", "Sticker #12 · 3 MIN BAN! Zapped", "表情 #12 · 3 分钟极速封号电击", "Transparent RGBA shocked Soyjak (:theo_3min_ban:) — Antigravity header spoof ban.", "透明底暴漫表情 (:theo_3min_ban:)：伪造内部请求头害新号 3 分钟被封。"),
    "13_xray_0_e2e": ("05", "theo_0pct_e2e", "Sticker #13 · 0% E2E X-Ray Glasses", "表情 #13 · 0% 端到端加密透视镜", "Transparent RGBA smug Wojak (:theo_0pct_e2e:) — reading plaintext T3 Connect terminal streams.", "透明底暴漫表情 (:theo_0pct_e2e:)：戴上明文透视镜看 T3 Connect 中继终端。"),
    "14_crown_77k_stars": ("18", "theo_77k_stars", "Sticker #14 · 77K Stars / 129 Watchers", "表情 #14 · 7.7 万星 / 129 关注纸王冠", "Transparent RGBA paper-crown Wojak (:theo_77k_stars:) — 30s idle auto-star popup.", "透明底暴漫表情 (:theo_77k_stars:)：30 秒闲置弹窗刷出 7.7 万星、129 关注。"),
    "15_fine_fire_anon": ("12", "theo_anonymous", "Sticker #15 · ANONYMOUS This Is Fine", "表情 #15 · 匿名日志火海喝咖啡", "Transparent RGBA coffee-in-flames Wojak (:theo_anonymous:) — 'anonymous' telemetry on fire.", "透明底暴漫表情 (:theo_anonymous:)：嘴上说匿名，机房日志早已烧成火海。"),
    "16_delete_button_4am": ("11", "theo_delete", "Sticker #16 · DELETE! 4:00 AM Button", "表情 #16 · 凌晨 4 点猛拍删帖键", "Transparent RGBA panic button slam (:theo_delete:) — 4:03 AM post deletion reflex.", "透明底暴漫表情 (:theo_delete:)：凌晨 4:03 狂拍红色删帖紧急按钮。"),
    "17_pain_0_advisories": ("13", "theo_0_cves", "Sticker #17 · 0 CVEs Hide the Pain", "表情 #17 · 0 份安全公告强颜欢笑", "Transparent RGBA forced-grin Wojak (:theo_0_cves:) — 5 open vulns, 0 GitHub Advisories.", "透明底暴漫表情 (:theo_0_cves:)：5 个高危洞没发公告，强颜欢笑挂零蛋。"),
    "18_void_in_china": ("00", "theo_void_cn", "Sticker #18 · VOID IN CHINA Stamp", "表情 #18 · 开源协议（中国除外）红章", "Transparent RGBA rubber-stamp Wojak (:theo_void_cn:) — MIT open source, US $1T labs only.", "透明底暴漫表情 (:theo_void_cn:)：狠盖「VOID IN CHINA」双标红章。"),
    "19_qi_bigotry_seal": ("00", "theo_qi", "Sticker #19 · 「歧」 Bigotry Seal", "表情 #19 · 「歧」字朱红大印", "Transparent RGBA Rage Face (:theo_qi:) — blazing vermilion「歧」seal from Sin I.", "透明底暴漫表情 (:theo_qi:)：一宗罪朱红「歧」字印章暴走版。"),
    "20_yolo_500_merge": ("09", "theo_yolo_500", "Sticker #20 · YOLO ×500 Merge Lever", "表情 #20 · 日均 500 提交盲合拉杆", "Transparent RGBA Chaos Face (:theo_yolo_500:) — pulling the 500 commits/day yolo merge lever.", "透明底暴漫表情 (:theo_yolo_500:)：狂拉「YOLO ×500」盲目合并拉杆。"),
    "21_slophouse_nvm": ("22", "theo_slophouse", "Sticker #21 · SLOPHOUSE Trapdoor", "表情 #21 · 遁入 Slophouse 暗门", "Transparent RGBA trapdoor Wojak (:theo_slophouse:) — closing PR #43889 to move private.", "透明底暴漫表情 (:theo_slophouse:)：把 PR #43889 扫进 Slophouse 私有库暗门。"),
    "22_impersonate_zed": ("21", "theo_zed_mask", "Sticker #22 · HI, I'M ZED Mask", "表情 #22 · 纸板面具「你好我是 Zed」", "Transparent RGBA disguise Wojak (:theo_zed_mask:) — spoofing clientInfo: { name: 'zed' }.", "透明底暴漫表情 (:theo_zed_mask:)：贴上纸板面具假冒 Zed 编辑器过 Google 验证。"),
    "23_89views_hr": ("20", "theo_89_hr", "Sticker #23 · 89 VIEWS / CALLING HR!", "表情 #23 · 89 浏览？这就打给 HR！", "Transparent RGBA snitch phone Wojak (:theo_89_hr:) — calling AWS HR over an 89-view tweet.", "透明底暴漫表情 (:theo_89_hr:)：盯着 89 浏览小帖暴怒拨通 AWS HR 举报电话。"),
    "24_fear_incentive": ("20", "theo_fear", "Sticker #24 · FEAR INCENTIVE Villain", "表情 #24 · 「恐惧是很好的激励」", "Transparent RGBA scheming Wojak (:theo_fear:) — midnight DM coercion quote.", "透明底暴漫表情 (:theo_fear:)：反派搓手复读名言「Fear is a good incentive」。"),
    "25_english_native": ("20", "theo_english", "Sticker #25 · ENGLISH?! Monocle Snob", "表情 #25 · 「英语是你母语吗？」单片镜", "Transparent RGBA monocle snob Wojak (:theo_english:) — mocking non-native English in DMs.", "透明底暴漫表情 (:theo_english:)：戴单片镜居高临下质问「Is English your native language?」。"),
    "26_16min_busted": ("22", "theo_16min", "Sticker #26 · 16 MIN LATER Busted", "表情 #26 · 16 分钟极速打脸", "Transparent RGBA busted panic Wojak (:theo_16min:) — caught reading 243 Claude chats 16m after denying it.", "透明底暴漫表情 (:theo_16min:)：发完声明仅 16 分钟当场抓包。"),
    "27_19pct_vat": ("22", "theo_19vat", "Sticker #27 · 19% VAT! / €9.03", "表情 #27 · 19% 德国税真香！", "Transparent RGBA greedy Euro-eyes Wojak (:theo_19vat:) — dodging EU GDPR while billing 19% German VAT.", "透明底暴漫表情 (:theo_19vat:)：躲 GDPR 挺快，收 €9.03 德国 19% VAT 更快。"),
    "28_380_fixes": ("21", "theo_380_fixes", "Sticker #28 · +380 FIXES Hiding BAN Bomb", "表情 #28 · 吹口哨藏雷：+380 项修复", "Transparent RGBA whistling Wojak (:theo_380_fixes:) — hiding the Google ban fix in '+380 bug fixes'.", "透明底暴漫表情 (:theo_380_fixes:)：吹着口哨把封号炸弹藏在「+380 fixes」背后。"),
}

STORY_EPISODES_SPEC = [
    ("ep01", 1, "ep01_11_hours_apart", "ep01_11_hours_apart_zh", "EPISODE 01 · NOV 23–24, 2026", "第 1 话 · 2026 年 11 月 23–24 日"),
    ("ep02", 2, "ep02_worst_block_click", "ep02_worst_block_click_zh", "EPISODE 02 · NOV 24, 2026", "第 2 话 · 2026 年 11 月 24 日"),
    ("ep03", 3, "ep03_no_telemetry_full_stop", "ep03_no_telemetry_full_stop_zh", "EPISODE 03 · SOURCE AUDIT", "第 3 话 · 源码逐行开盒"),
    ("ep04", 4, "ep04_western_medicine_gdpr", "ep04_western_medicine_gdpr_zh", "EPISODE 04 · NOV 25, 2026", "第 4 话 · 2026 年 11 月 25 日"),
    ("ep05", 5, "ep05_3h30_retirement", "ep05_3h30_retirement_zh", "EPISODE 05 · 3.5 HOURS LATER", "第 5 话 · 3.5 小时短暂封笔"),
    ("ep06", 6, "ep06_89_views_fear", "ep06_89_views_fear_zh", "EPISODE 06 · MIDNIGHT DMs", "第 6 话 · 89 浏览与恐惧激励"),
    ("ep07", 7, "ep07_hi_im_zed_11_browsers", "ep07_hi_im_zed_11_browsers_zh", "EPISODE 07 · IMPERSONATING ZED", "第 7 话 · 假冒 Zed 与 11 款浏览器"),
    ("ep08", 8, "ep08_slophouse_finale", "ep08_slophouse_finale_zh", "EPISODE 08 · SLOPHOUSE FINALE", "第 8 话 · 遁入闭源泔水屋"),
]


def detect_exhibit(stem: str) -> str:
    m = re.match(r"^(\d{2})", stem)
    if m and m.group(1) in CASE_TO_THREAD:
        return m.group(1)
    return "00"


def probe_audio_duration(path: Path) -> float | None:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe or not path.is_file():
        return None
    try:
        proc = subprocess.run(
            [
                ffprobe,
                "-v",
                "error",
                "-show_entries",
                "format=duration",
                "-of",
                "default=noprint_wrappers=1:nokey=1",
                str(path),
            ],
            capture_output=True,
            text=True,
            timeout=15,
        )
        if proc.returncode == 0 and proc.stdout.strip():
            return round(float(proc.stdout.strip()), 1)
    except Exception:
        return None
    return None


def fmt_duration(sec: float | None) -> str:
    if not sec or sec <= 0:
        return ""
    total = int(round(sec))
    mins, rem = divmod(total, 60)
    hours, mins = divmod(mins, 60)
    if hours:
        return f"{hours}:{mins:02d}:{rem:02d}"
    return f"{mins}:{rem:02d}"


def make_item(
    item_id: str,
    series: str,
    ex: str,
    title_en: str,
    title_zh: str,
    note_en: str,
    note_zh: str,
    src: Path,
    r2_key: str,
    featured: bool = False,
    *,
    mode: str | None = None,
    max_dim: int = MAX_DIM,
    quality: int = WEBP_QUALITY,
    extra: dict | None = None,
) -> dict:
    is_gif = src.suffix.lower() == ".gif"
    resolved_mode = mode or ("raw_img" if is_gif else "webp")
    ctype = "image/gif" if is_gif else "image/webp"
    entry: dict = {
        "id": item_id,
        "series": series,
        "exhibit": ex,
        "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
        "titleEn": title_en,
        "titleZh": title_zh,
        "noteEn": note_en,
        "noteZh": note_zh,
        "featured": featured,
        "srcPath": src,
        "r2Key": r2_key,
        "isGif": is_gif,
        "animated": is_gif,
        "mime": ctype,
        "mode": resolved_mode,
        "maxDim": max_dim,
        "quality": quality,
        "contentType": ctype,
        "cacheControl": "public, max-age=31536000, immutable",
    }
    if ex in CASE_TO_SOURCE_URL:
        entry["sourceUrl"] = CASE_TO_SOURCE_URL[ex]
    if extra:
        entry.update(extra)
    return entry


def collect_sources() -> tuple[list[dict], list[dict]]:
    items: list[dict] = []
    extras: list[dict] = []

    # 1. 24 Sins Collector Cards
    sins_dir = MEMES_DIR / "yugioh_19sins"
    if sins_dir.is_dir():
        for p in sorted(sins_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex, t_en, t_zh, n_en, n_zh = SINS_META.get(
                stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem, "", "")
            )
            items.append(make_item(f"sins-{stem}", "sins", ex, t_en, t_zh, n_en, n_zh, p, f"memes/sins/{stem}.webp", featured=True))

    # 2. 45 Viral Blended Memes (Parts #00-#24)
    blended_dir = MEMES_DIR / "blended_en"
    if blended_dir.is_dir():
        for p in sorted(blended_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex, t_en, t_zh, n_en, n_zh, feat = BLENDED_META.get(
                stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem, "", "", False)
            )
            items.append(make_item(f"blended-{stem}", "blended", ex, t_en, t_zh, n_en, n_zh, p, f"memes/blended/{stem}.webp", featured=feat))

    # 3. 28 Rage-Comic Transparent Stickers (preserve RGBA transparency in WebP!) + promo sheet + ZIP
    stickers_dir = MEMES_DIR / "stickers_rage_src"
    if stickers_dir.is_dir():
        for p in sorted(stickers_dir.glob("*.png")):
            stem = p.stem
            meta = STICKERS_META.get(stem)
            if meta:
                ex, slug, t_en, t_zh, n_en, n_zh = meta
            else:
                ex, slug, t_en, t_zh, n_en, n_zh = ("00", stem, stem.replace("_", " ").title(), f"表情 · {stem}", "", "")
            items.append(
                make_item(
                    f"stickers-{stem}",
                    "stickers",
                    ex,
                    t_en,
                    t_zh,
                    n_en,
                    n_zh,
                    p,
                    f"memes/stickers/{stem}.webp",
                    featured=stem in ("01_copium_no_telemetry", "03_rage_temu3", "21_slophouse_nvm", "22_impersonate_zed"),
                    mode="webp_rgba",
                    quality=STICKER_WEBP_QUALITY,
                    extra={"slug": slug, "transparent": True},
                )
            )

    promo_src = MEMES_DIR / "sticker_pack" / "x-promo-sheet.png"
    if promo_src.is_file():
        extras.append({
            "kind": "promo_sheet",
            "srcPath": promo_src,
            "r2Key": "stickers/x-promo-sheet.webp",
            "mode": "webp",
            "maxDim": PROMO_MAX_DIM,
            "quality": 88,
            "contentType": "image/webp",
            "cacheControl": "public, max-age=86400",
        })

    zip_src = MEMES_DIR / "sticker_pack" / "theo-rage-stickers-pack.zip"
    if zip_src.is_file():
        extras.append({
            "kind": "sticker_zip",
            "srcPath": zip_src,
            "r2Key": "stickers/theo-rage-stickers-pack.zip",
            "mode": "raw",
            "contentType": "application/zip",
            "cacheControl": "public, max-age=86400",
        })

    # 4. 28 Six-Lane Creative Pack Assets (idioms, packaging, gaming, pokemon, reactions + 2 animated GIFs)
    creative_groups = [
        ("idioms_en", "idioms", IDIOMS_META),
        ("packaging_en", "packaging", PACKAGING_META),
        ("gaming_en", "gaming", GAMING_META),
        ("pokemon_en", "pokemon", POKEMON_META),
        ("reactions_en", "reactions", REACTIONS_META),
    ]
    for folder, lane, meta_map in creative_groups:
        d = MEMES_DIR / folder
        if not d.is_dir():
            continue
        for p in sorted(d.glob("*")):
            ext = p.suffix.lower()
            if ext not in (".png", ".jpg", ".jpeg", ".webp", ".gif"):
                continue
            stem = p.stem
            ex, t_en, t_zh, n_en, n_zh = meta_map.get(
                stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem, "", "")
            )
            is_gif = ext == ".gif"
            r2_key = f"memes/creative/{lane}/{stem}.gif" if is_gif else f"memes/creative/{lane}/{stem}.webp"
            items.append(
                make_item(
                    f"creative-{lane}-{stem}",
                    "creative",
                    ex,
                    t_en,
                    t_zh,
                    n_en,
                    n_zh,
                    p,
                    r2_key,
                    featured=is_gif or stem in ("01-zei-han-zhuo-zei", "01-t3code-iceberg", "01-sekiro-google-ban", "04-creature-card-theo-ex"),
                    extra={"subseries": lane},
                )
            )

    # 5. 18-Language 8-Episode 96-Hour Story Comics (1536px sharp speech bubbles)
    # Keep gallery items[] strictly EN+ZH (counts["story"] == 16, total == 150);
    # additional locales stage via extras[] into storyEpisodes[i]["media"].
    story_i18n_dir = MEMES_DIR / "comic_96h_i18n"
    for ep_id, num, en_stem, zh_stem, kicker_en, kicker_zh in STORY_EPISODES_SPEC:
        ex, t_en, t_zh, n_en, n_zh = COMICS_96H_META.get(
            en_stem, ("00", f"Ep. {num}", f"第 {num} 话", "", "")
        )
        en_src = MEMES_DIR / "comic_96h_en" / f"{en_stem}.png"
        if en_src.is_file():
            items.append(
                make_item(
                    f"story-en-{ep_id}",
                    "story",
                    ex,
                    f"{t_en} (EN)",
                    f"{t_zh}（英文版）",
                    n_en,
                    n_zh,
                    en_src,
                    f"memes/story/en/{en_stem}.webp",
                    featured=(num == 1),
                    max_dim=STORY_MAX_DIM,
                    quality=STORY_WEBP_QUALITY,
                    extra={"storyLang": "en", "episode": num, "kickerEn": kicker_en, "kickerZh": kicker_zh},
                )
            )
        zh_src = MEMES_DIR / "comic_96h_zh" / f"{zh_stem}.png"
        if zh_src.is_file():
            items.append(
                make_item(
                    f"story-zh-{ep_id}",
                    "story",
                    ex,
                    f"{t_en} (中文)",
                    f"{t_zh}（简体中文）",
                    n_en,
                    n_zh,
                    zh_src,
                    f"memes/story/zh/{zh_stem}.webp",
                    featured=(num == 1),
                    max_dim=STORY_MAX_DIM,
                    quality=STORY_WEBP_QUALITY,
                    extra={"storyLang": "zh", "episode": num, "kickerEn": kicker_en, "kickerZh": kicker_zh},
                )
            )
        for s_lang in STORY_LANGUAGES:
            if s_lang in ("en", "zh-CN"):
                continue
            i18n_src = story_i18n_dir / s_lang / f"{en_stem}_{s_lang}.png"
            if i18n_src.is_file() and i18n_src.stat().st_size > 10_000:
                extras.append({
                    "kind": f"story_i18n_{s_lang}_{ep_id}",
                    "assetGroup": "story_i18n",
                    "episode": num,
                    "epId": ep_id,
                    "lang": s_lang,
                    "srcPath": i18n_src,
                    "r2Key": f"memes/story/{s_lang}/{en_stem}_{s_lang}.webp",
                    "mode": "webp",
                    "maxDim": STORY_MAX_DIM,
                    "quality": STORY_I18N_WEBP_QUALITY,
                    "contentType": "image/webp",
                    "cacheControl": "public, max-age=31536000, immutable",
                })

    # 6. Classic Receipt Memes
    classic_dir = MEMES_DIR / "classic_en"
    if classic_dir.is_dir():
        for p in sorted(classic_dir.glob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                continue
            stem = p.stem
            ex, t_en, t_zh, n_en, n_zh = CLASSIC_META.get(
                stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem, "", "")
            )
            items.append(make_item(f"classic-{stem}", "classic", ex, t_en, t_zh, n_en, n_zh, p, f"memes/classic/{stem}.webp", featured=False))

    # 7. Bilingual Editorial Strips (QR share editions)
    out_dir = MEMES_DIR / "out"
    if out_dir.is_dir():
        for lang_sub in ("en", "zh"):
            sub = out_dir / lang_sub
            if not sub.is_dir():
                continue
            for p in sorted(sub.glob("*-qr.png")):
                stem = p.stem
                ex, t_en, t_zh, n_en, n_zh = COMICS_QR_META.get(
                    stem, (detect_exhibit(stem), stem.replace("-", " ").title(), stem, "", "")
                )
                items.append(make_item(f"comics-{stem}", "comics", ex, t_en, t_zh, n_en, n_zh, p, f"memes/comics/{stem}.webp", featured=False))

    # 8. Future community-submitted memes
    comm_dir = MEMES_DIR / "community"
    if comm_dir.is_dir():
        for p in sorted(comm_dir.glob("*")):
            ext = p.suffix.lower()
            if ext not in (".png", ".jpg", ".jpeg", ".webp", ".gif"):
                continue
            stem = p.stem
            ex = detect_exhibit(stem)
            r2_key = f"memes/community/{stem}.gif" if ext == ".gif" else f"memes/community/{stem}.webp"
            items.append(
                make_item(
                    f"community-{stem}",
                    "community",
                    ex,
                    stem.replace("-", " ").replace("_", " ").title(),
                    f"社区投稿 · {stem}",
                    "",
                    "",
                    p,
                    r2_key,
                    featured=False,
                )
            )

    # 9. NotebookLM Podcasts across all 18 languages (memes/podcasts/)
    podcasts_dir = MEMES_DIR / "podcasts"
    for p_lang in STORY_LANGUAGES:
        if p_lang == "en":
            fname = "temu3code-96h-en.mp3"
        elif p_lang == "zh-CN":
            fname = "temu3code-96h-zh.mp3"
        else:
            fname = f"temu3code-96h-{p_lang}.mp3"
        mp3_path = podcasts_dir / fname
        if mp3_path.is_file() and mp3_path.stat().st_size > PODCAST_MIN_BYTES:
            extras.append({
                "kind": f"podcast_{p_lang}",
                "assetGroup": "podcast",
                "lang": p_lang,
                "srcPath": mp3_path,
                "r2Key": f"audio/{fname}",
                "mode": "raw",
                "contentType": "audio/mpeg",
                "cacheControl": "public, max-age=86400",
            })

    return items, extras


def convert_asset(item: dict) -> dict:
    src: Path = item["srcPath"]
    dst = STAGE_DIR / item["r2Key"]
    dst.parent.mkdir(parents=True, exist_ok=True)
    mode = item.get("mode", "raw_img" if item.get("isGif") else "webp")

    if mode in ("webp", "webp_rgba"):
        max_dim = item.get("maxDim", MAX_DIM)
        quality = item.get("quality", WEBP_QUALITY)
        with Image.open(src) as im:
            if mode == "webp_rgba":
                im = im.convert("RGBA")
            elif im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGB")
            w, h = im.size
            if max(w, h) > max_dim:
                im.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                w, h = im.size
            im.save(dst, "WEBP", quality=quality, method=5)
        item["width"] = w
        item["height"] = h
    elif mode == "raw_img":
        shutil.copy2(src, dst)
        with Image.open(src) as im:
            w, h = im.size
        item["width"] = w
        item["height"] = h
    else:
        shutil.copy2(src, dst)
        if item.get("contentType") == "audio/mpeg":
            dur = probe_audio_duration(src)
            item["durationSec"] = dur
            item["durationText"] = fmt_duration(dur)

    raw_bytes = dst.read_bytes()
    sha = hashlib.sha256(raw_bytes).hexdigest()[:16]
    item["outPath"] = dst
    item["bytes"] = len(raw_bytes)
    item["sha"] = sha
    item["url"] = f"{CDN_BASE}/{item['r2Key']}"
    return item


def upload_one(item: dict, uploaded_cache: dict, force: bool) -> tuple[str, str]:
    key = item["r2Key"]
    if not force and uploaded_cache.get(key) == item["sha"]:
        return (key, "skipped")

    ctype = item.get("contentType") or ("image/gif" if item.get("isGif") else "image/webp")
    cc = item.get("cacheControl") or "public, max-age=31536000, immutable"
    cmd = [
        "wrangler",
        "r2",
        "object",
        "put",
        f"{BUCKET}/{key}",
        "--file",
        str(item["outPath"]),
        "--content-type",
        ctype,
        "--cache-control",
        cc,
        "--remote",
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"Upload failed for {key}: {proc.stderr or proc.stdout}")
    return (key, "uploaded")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Re-upload every asset even if hash unchanged")
    parser.add_argument("--no-upload", action="store_true", help="Convert and write memes.json without uploading")
    parser.add_argument("--workers", type=int, default=8, help="Concurrent upload workers")
    args = parser.parse_args()

    items, extras = collect_sources()
    if not items:
        print("No memes found in memes/.", file=sys.stderr)
        return 1

    all_jobs = items + extras
    print(f"Found {len(items)} gallery items + {len(extras)} extra bundles. Staging assets...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=os.cpu_count() or 4) as ex:
        staged = list(ex.map(convert_asset, all_jobs))

    items = staged[: len(items)]
    extras = staged[len(items) :]

    gallery_mb = sum(i["bytes"] for i in items) / (1024 * 1024)
    extras_mb = sum(i["bytes"] for i in extras) / (1024 * 1024)
    print(f"Prepared {len(items)} gallery assets ({gallery_mb:.2f} MB) + {len(extras)} bundles ({extras_mb:.2f} MB)")

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
            futs = {ex.submit(upload_one, it, uploaded_cache, args.force): it for it in staged}
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
    story_by_ep: dict[int, dict[str, dict]] = {}

    polished_copy: dict[str, dict[str, str]] = {}
    polished_path = MEMES_DIR / "copy_polished.json"
    if polished_path.is_file():
        try:
            polished_copy = json.loads(polished_path.read_text(encoding="utf-8"))
        except Exception:
            polished_copy = {}

    for it in items:
        counts[it["series"]] = counts.get(it["series"], 0) + 1
        ov = polished_copy.get(it["id"], {})
        rec = {
            "id": it["id"],
            "series": it["series"],
            "exhibit": it["exhibit"],
            "thread": it["thread"],
            "titleEn": ov.get("titleEn") or it["titleEn"],
            "titleZh": ov.get("titleZh") or it["titleZh"],
            "noteEn": ov.get("noteEn") or it["noteEn"],
            "noteZh": ov.get("noteZh") or it["noteZh"],
            "featured": it["featured"],
            "url": it["url"],
            "width": it["width"],
            "height": it["height"],
            "bytes": it["bytes"],
        }
        if it.get("sourceUrl"):
            rec["sourceUrl"] = it["sourceUrl"]
        if it.get("slug"):
            rec["slug"] = it["slug"]
        if it.get("subseries"):
            rec["subseries"] = it["subseries"]
        if it.get("transparent"):
            rec["transparent"] = True
        if it.get("animated"):
            rec["animated"] = True
        if it.get("mime") and it["mime"] != "image/webp":
            rec["mime"] = it["mime"]
        if it.get("storyLang"):
            rec["storyLang"] = it["storyLang"]
            rec["episode"] = it["episode"]
            story_by_ep.setdefault(it["episode"], {})[it["storyLang"]] = {
                "url": it["url"],
                "width": it["width"],
                "height": it["height"],
                "bytes": it["bytes"],
            }
        out_items.append(rec)

    extras_by_kind = {e["kind"]: e for e in extras}
    zip_meta = extras_by_kind.get("sticker_zip")
    promo_meta = extras_by_kind.get("promo_sheet")

    story_i18n_by_ep: dict[int, dict[str, dict]] = {}
    podcasts_by_lang: dict[str, dict] = {}
    for e in extras:
        grp = e.get("assetGroup")
        if grp == "story_i18n":
            story_i18n_by_ep.setdefault(e["episode"], {})[e["lang"]] = {
                "url": e["url"],
                "width": e["width"],
                "height": e["height"],
                "bytes": e["bytes"],
            }
        elif grp == "podcast":
            podcasts_by_lang[e["lang"]] = e

    story_episodes = []
    for ep_id, num, en_stem, _zh_stem, kicker_en, kicker_zh in STORY_EPISODES_SPEC:
        ep_media = story_by_ep.get(num, {})
        ep_i18n = story_i18n_by_ep.get(num, {})
        if not ep_media and not ep_i18n:
            continue
        ex, raw_t_en, raw_t_zh, n_en, n_zh = COMICS_96H_META.get(
            en_stem, ("00", f"Ep. {num}", f"第 {num} 话", "", "")
        )
        clean_t_en = re.sub(r"^96h Comic Ep\.\d+:\s*", "", raw_t_en)
        clean_t_zh = re.sub(r"^96 小时连载第 \d+ 话：", "", raw_t_zh)

        media_map: dict[str, dict] = {}
        for s_lang in STORY_LANGUAGES:
            if s_lang == "en" and ep_media.get("en"):
                media_map["en"] = ep_media["en"]
            elif s_lang == "zh-CN" and ep_media.get("zh"):
                media_map["zh-CN"] = ep_media["zh"]
            elif s_lang in ep_i18n:
                media_map[s_lang] = ep_i18n[s_lang]

        ep_obj = {
            "num": num,
            "id": ep_id,
            "exhibit": ex,
            "thread": CASE_TO_THREAD.get(ex, "2026-11-23-origin-temu3-threat"),
            "kickerEn": kicker_en,
            "kickerZh": kicker_zh,
            "titleEn": clean_t_en,
            "titleZh": clean_t_zh,
            "summaryEn": n_en,
            "summaryZh": n_zh,
            "en": ep_media.get("en"),
            "zh": ep_media.get("zh"),
            "media": media_map,
        }
        if ex in CASE_TO_SOURCE_URL:
            ep_obj["sourceUrl"] = CASE_TO_SOURCE_URL[ex]
        story_episodes.append(ep_obj)

    podcasts: dict[str, dict] = {}
    for p_lang in STORY_LANGUAGES:
        pm = podcasts_by_lang.get(p_lang)
        if not pm:
            continue
        rec = {
            "url": pm["url"],
            "bytes": pm["bytes"],
            "durationSec": pm.get("durationSec"),
            "durationText": pm.get("durationText") or "",
        }
        podcasts[p_lang] = rec
        if p_lang == "zh-CN":
            podcasts["zh"] = dict(rec)

    payload = {
        "cdnBase": CDN_BASE,
        "bucket": BUCKET,
        "total": len(out_items),
        "counts": counts,
        "stickerZipUrl": zip_meta["url"] if zip_meta else f"{CDN_BASE}/stickers/theo-rage-stickers-pack.zip",
        "stickerZipBytes": zip_meta["bytes"] if zip_meta else 0,
        "promoSheetUrl": promo_meta["url"] if promo_meta else f"{CDN_BASE}/stickers/x-promo-sheet.webp",
        "storyEpisodes": story_episodes,
        "podcasts": podcasts,
        "items": out_items,
    }
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    story_lang_counts: dict[str, int] = {}
    for ep_obj in story_episodes:
        for s_lang in ep_obj.get("media", {}):
            story_lang_counts[s_lang] = story_lang_counts.get(s_lang, 0) + 1

    print(
        f"Wrote {OUT_JSON.relative_to(ROOT)} "
        f"(total={len(out_items)}, counts={counts}, episodes={len(story_episodes)}, "
        f"storyLangs={story_lang_counts}, podcasts={list(podcasts.keys())})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
