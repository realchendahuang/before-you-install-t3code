# #05 · T3 Connect 零端對端加密：所有提示詞、原始碼與終端機輸出皆以明文行經 T3 自有閘道

> 透過 T3 Connect 遠端連線電腦時，完全沒有任何端對端加密——所有對話、原始碼與終端機輸出，都在 T3 控制的 Cloudflare 或 OVH Caddy 閘道上以明文終結，且新裝置核准預設為關閉。

<!-- section:claim -->
## 官方 / Theo 的說法

- 11 月 24 日，`@theo` 公開宣稱使用者的對話資料 *"lives on your machine. It never touches any of our servers"*（只留在你的電腦上，從不經過我們任何伺服器，[`2125191784859115766`](https://x.com/theo/status/2125191784859115766)）。
- 官網 [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)（`effectiveDate="2026-10-06"`）僅籠統宣稱 *"encrypted network transport"*，從未揭露缺乏端對端加密。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **T3 自有 Cloudflare 帳號明文終結（`ManagedEndpointProvider.ts`）：** T3 Connect 在 T3 自己的 Cloudflare 帳號下建立 Cloudflare Tunnel（`docs/internals/06_t3-connect.md`），僅具備用戶端到 Cloudflare 邊緣節點的普通 TLS，並無用戶端到用戶端的載荷加密。只要在邊緣掛上一條 Workers Route，全部對話與程式碼流量在技術上隨時明文可見。
- **明確拒絕端對端加密（`Issue #32098`）：** 社群提交 [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) 請求雙向認證與端對端加密時，維護者以改動太大為由直接關閉；討論 `#21286` 與 `#37831` 無人回覆；11 月 25 日 `@theo` 直接宣稱端對端加密「不可能做到」（[`2125370330244128924`](https://x.com/theo/status/2125370330244128924)）。
- **遷往自租 OVH Caddy 明文閘道（`PR #32945`）：** 當 Cloudflare Tunnel 月帳單飆到 **25,000 美元** 後，`@theo` 提交 [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) 遷往 T3 自租的 OVH Hillsboro 閘道（`gw.t3coderelay.com`），由 T3 自己的 Caddy 終結 TLS 後，再經 Unix socket 以明文轉發給 Go `yamux` 代理——依舊零端對端加密。
- **新裝置核准預設關閉（`PR #36419`、`settings.ts`）：** [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts)（第 1424–1426 行）中 `requireConnectDeviceApproval` 至今預設為 `false`。正如 `SECURITY.md` 自己承認：一旦雲端帳號或中繼簽章金鑰外洩，攻擊者將取得等同主機 shell 的完全控制權。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **仍未修復：** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) 僅新增了新裝置登入提醒，**T3 Connect 至今零端對端加密**，`requireConnectDeviceApproval` 預設值仍為 `false`，`privacy-policy.astro` 仍停留在 `2026-10-06` 未做更新。

<!-- section:visuals -->
## 一手實證原圖

![Issue #32098 中維護者承認雲端帳號或中繼金鑰失守即可控制關聯主機，但仍不做端對端加密](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 提及每月 2.5 萬美元的 Cloudflare 帳單，並遷往自建 OVH Caddy TLS 終結閘道](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts 在 T3 自有 Cloudflare 帳號下設定通道與網域](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## 可核驗的原始來源

- [X 調查原帖（第 5 彈）](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 留言](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [深度技術卷宗 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
