# #18 · Lej 77 000 gwiazdek: gwiazdkowanie po 30 s bezczynności z użyciem poświadczeń hosta i nienaprawiony błąd dowolnego repozytorium

> Sześć miesięcy po tym, jak potępił gwiazdki GitHuba jako sposób „to trick VCs into investing”, @theo samodzielnie zmergował w aplikacji toast wyzwalany po 30 sekundach bezczynności, który wysyła `PUT user/starred/...` z użyciem poświadczeń GitHuba hosta — katapultując repozytorium z 30 tys. do 77 tys. gwiazdek (przy ~129 obserwujących), pozostawiając jednocześnie nienaprawiony błąd gwiazdkowania dowolnego repozytorium.

<!-- section:claim -->
## Co zostało twierdzone

- 26 kwietnia 2026 r. `@theo` opublikował tekst *"Github has a fake star problem"*, pisząc, że gwiazdki GitHuba stały się *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- 24 listopada, przy 74,6 tys. gwiazdek, twierdził, że *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Co pokazują dowody

- **Dziesięciokrotny dzienny skok gwiazdek dzięki toastowi w aplikacji (`PR #27832`, `#29922`, `#29987`):** Po tym, jak dotarcie do 30 000 gwiazdek zajęło ponad 8 miesięcy, `@theo` sam napisał i sam zmergował [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) 30 października, dodając toast z gwiazdką po 5 wysłanych promptach (`PROMPTS_BEFORE_ASKING = 5`), natychmiast **dziesięciokrotnie** zwiększając dzienną liczbę gwiazdek (`+3,094` gwiazdek dziennie na GitHub Trending). 3 listopada [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) oraz [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) dodały **detekcję bezczynności w oknie 30 sekund** (`IDLE_MS = 30_000`), gdy użytkownicy czekają na tury AI, i zastąpiły przekierowanie w przeglądarce serwerowym RPC `sourceControl.star`, wysyłającym `PUT user/starred/pingdotgg/t3code` bezpośrednio przez poświadczenia **`gh` CLI / `GH_TOKEN` hosta**, a po nim następował konfetti z 160 cząsteczek.
- **Omijanie przeglądu i nieprzejrzystość konta na współdzielonym hoście:** Macroscope oznaczył `PR #29922` jako *Needs Human Approval* z powodu niezgodności między użytkownikiem przeglądarki a poświadczeniami serwera; `@theo` i tak zmergował go samodzielnie. Na hostach współdzielonych lub zdalnych kliknięcie *Star* po cichu gwiazdkuje repozytorium przy użyciu poświadczeń GitHuba tego, do kogo należą poświadczenia serwera — bez informowania użytkownika, którego konto zostało użyte.
- **Nienaprawiony błąd gwiazdkowania dowolnego repozytorium (`driver.ts#L60-L99`):** 6 listopada deweloper `zhilsinger` złożył `Request changes`, wskazując, że [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) przyjmuje dowolny ciąg `owner/repo` bez przypięcia do `pingdotgg/t3code` — co pozwala każdemu klientowi z uprawnieniem `source-control:write` gwiazdkować dowolne repozytoria GitHub przy użyciu poświadczeń hosta.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Nadal otwarte:** nieprzypięte gwiazdkowanie dowolnego repozytorium w `driver.ts#L60-L99` oraz recenzja `Request changes` od `zhilsinger` z 6 listopada pozostają bez odpowiedzi i bez poprawki 19 dni później (77 tys.+ gwiazdek vs. ~129 obserwujących).

<!-- section:visuals -->
## Dowody wizualne

![Wykres Theo z 2 listopada świętujący niemal pionowy, dziesięciokrotny skok gwiazdek tuż po wdrożeniu promptu w aplikacji](../../evidence/20-star-10x-cliff.png)

![Recenzja Request Changes dewelopera zhilsinger na PR #29922, bez odpowiedzi przez 19 dni](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 przyjmujący dowolne ciągi owner/repo bez przypięcia do pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Źródła pierwotne

- [Oryginalne śledztwo na X (część 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [10x cliff (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/day Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Szczegółowe dossier techniczne 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
