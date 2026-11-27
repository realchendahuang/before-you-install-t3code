# #07 · Managed Policy 謊言：自誇「全業界最好一鍵關閉」，自家文件打臉四大盲區

> @theo 宣稱 T3 Code 擁有全業界最好的企業 Managed Policy、「輕而易舉關閉全部遙測」，卻被自家官方文件 `docs/user/telemetry.md` 與 `docs/user/managed-policy.md` 逐條證偽。

<!-- section:claim -->
## 官方／Theo 宣稱

- 11 月 24 日 19:13 CST，`@theo` 駁斥缺少關閉開關的質疑：*"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."*（[`2125186071357251715`](https://x.com/theo/status/2125186071357251715)）。
- 半小時後，他又聲稱對話資料 *"never touches any of our servers"*（[`2125191784859115766`](https://x.com/theo/status/2125191784859115766)）。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

T3 Code 自己的官方文件（[`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) 與 [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)）白紙黑字列出四個硬傷：

- **僅限系統管理員部署（沒有個人設定開關）：** 桌面端設定裡根本沒有關閉開關。Managed Policy 強制要求透過 MDM/GPO 或管理員保護路徑（`/Library/Application Support/T3Code/policy.json`、`C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code` 或 `/etc/t3code/policy.json`）部署，一般沒有 root 權限的使用者根本無權設定。
- **官方網頁版（`app.t3.codes`）徹底免疫政策：** 瀏覽器端無視伺服器端環境變數與 Managed Policy，若建置版本帶有追蹤，便會持續回報連線紀錄，文件明寫 *"has no relay tracing toggle"*（沒有中繼追蹤開關）。
- **行動端不受伺服器端政策控制：** 文件明確承認伺服器端環境變數與 Managed Policy *"do not disable mobile tracing"*（無法關閉行動端追蹤）。
- **`Publish agent activity` 無視遙測退出：** 該功能會將專案名稱、對話標題、模型名稱與即時狀態送往 T3 Connect，且文件直白寫明 *"The telemetry opt-out does not disable it."*；同時失敗的 Axiom 追蹤與當機日誌 *"can quote a value the app was handling"*，`Agent feedback` 還可附帶高達 16 KB 的對話正文。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **仍未修復：** 通宵合入的 [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) 僅為行動端加上獨立開關，Managed Policy 依然管不了行動端，`app.t3.codes` 仍無任何開關，`Publish agent activity` 依然無視遙測退出，桌面端依然沒有 UI 開關。

<!-- section:visuals -->
## 第一手實證原圖

![官方文件 docs/user/telemetry.md 證實 app.t3.codes 無開關、行動端與 Publish agent activity 不受退出限制](../../evidence/05-telemetry-cant-disable.png)

![官方文件 docs/user/managed-policy.md 列出三大系統管理員保護路徑](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theo 11 月 24 日發文宣稱 Managed Policy 可輕而易舉關閉全部遙測](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## 可核驗原始來源

- [X 調查原帖（第 7 彈）](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` 吹噓 Managed Policy（`2125186071357251715`）](https://x.com/theo/status/2125186071357251715) · [`@theo` 宣稱資料從不碰伺服器（`2125191784859115766`）](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [深度技術卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
