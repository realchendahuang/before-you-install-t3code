# #14 · Dataset quantitativo di 1.151 tweet: cortesia selettiva e impennata anti-cinese di 4,0×

> Un'analisi quantitativa esaustiva di 1.151 post consecutivi di `@theo` su X (7–24 novembre 2026) dimostra una netta asimmetria di potere: 0,0% di volgarità verso 20 dirigenti big-tech e personale di laboratorio contro l'8,0% di ostilità verso sviluppatori comuni — un'impennata di 4,0× fino al 14,4% durante la disputa di 25 ore sul fork cinese.

<!-- section:claim -->
## Che cosa era stato affermato

- Meno di 24 ore prima della disputa sul fork cinese, `@theo` ha tenuto una lezione a un altro utente su X, dicendogli di non bruciare la fiducia della community ([`2124449493513068862`](https://x.com/theo/status/2124449493513068862)).
- Il suo tono aspro viene spesso giustificato dai difensori come un modo di trattare tutti allo stesso modo, con una schiettezza senza filtri.

<!-- section:evidence -->
## Che cosa dimostrano le prove

L'analisi di ogni post consecutivo di `@theo` su X dal **7 al 24 novembre 2026** (`n = 1.151`; `17,24` giorni; `66,8` post al giorno; `75,6%` risposte; intervallo mediano di `2,7` minuti) stabilisce una gerarchia di rispetto misurabile e riproducibile:

- **Dirigenti big-tech, personale di laboratorio e top KOL (`n = 43` strict / `60`–`62` broader):** **0,0%** di volgarità mirate o insulti personali (`30,0%`–`32,6%` ringraziamenti cortesi). Persino le critiche ai grandi laboratori (Gemini 4 Carbon, GPT-6.2 Astra) sono state ammorbidite con elogi o seguite da scuse pubbliche ([`2123255588570501585`](https://x.com/theo/status/2123255588570501585), [`2123995323123343869`](https://x.com/theo/status/2123995323123343869)).
- **Sviluppatori comuni e critici (`n = 766` strict / `749` broader):** ostilità e volgarità raggiungono l'**8,0%** (`61/766`) — inclusi un quote-tweet di un semplice confronto tra strumenti per dichiarare *"Engineers deserve the mass unemployment they have coming"* ([`2124470530590011704`](https://x.com/theo/status/2124470530590011704)), il desiderio di *"dance on the graves of the 'local ai' community"* ([`2120733839832273025`](https://x.com/theo/status/2120733839832273025)), l'appellativo di *"Linux larpers"* rivolto agli utenti Linux ([`2124298216271499605`](https://x.com/theo/status/2124298216271499605)), ripetuti attacchi con `"stupid bitch"` ([`2120599310211703274`](https://x.com/theo/status/2120599310211703274)) e derisione su carcere/RSD ([`2122865897375400066`](https://x.com/theo/status/2122865897375400066)).
- **Finestra di crisi di 25 ore sul fork cinese (`n = 132`):** gli insulti personali diretti sono schizzati di **4,0×** dal `3,6%` di base al **14,4%** (`19/132`), inclusi l'appellativo di *"the biggest fucking cesspit"* per il Twitter tech cinese e l'etichetta di *"fucking braindead"* per gli sviluppatori che leggevano gli audit del codice cinese ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Base riproducibile:** metodologia completa, regole di classificazione regex, elenchi di handle e quattro grafici forensi interattivi sono archiviati nel Dossier 06.

<!-- section:visuals -->
## Prove visive

![Grafico forense 3: cortesia selettiva — 0,0% di volgarità verso i VIP contro 8,0% di ostilità verso gli sviluppatori e impennata anti-cinese del 14,4%](../../evidence/charts/theo-chart-3-double-standard.png)

![Grafico forense 4: scomposizione in tre ondate della finestra di crisi di 25 ore sul fork cinese](../../evidence/charts/theo-chart-4-cn-crisis.png)

![Theo che cita un tweet con una domanda semplice per affermare che gli ingegneri meritano la disoccupazione di massa](../../evidence/25-engineers-unemployment.png)

![Theo che definisce il Twitter tech cinese un letamaio e insulta gli sviluppatori che leggono gli audit del codice cinese](../../evidence/26-cn-cesspit.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 14)](https://x.com/realchendahuang/status/2125404517697290438)
- ["Engineers deserve mass unemployment" (`2124470530590011704`)](https://x.com/theo/status/2124470530590011704) · ["Chinese tech Twitter cesspit" (`2125177503526588877`)](https://x.com/theo/status/2125177503526588877)
- ["Dance on the graves of local AI" (`2120733839832273025`)](https://x.com/theo/status/2120733839832273025) · ["Linux larpers" (`2124298216271499605`)](https://x.com/theo/status/2124298216271499605) · [Derisione su carcere/RSD (`2122865897375400066`)](https://x.com/theo/status/2122865897375400066)
- [Ammorbidimento verso la big-tech (`2123255588570501585`)](https://x.com/theo/status/2123255588570501585) · [`2123995323123343869`](https://x.com/theo/status/2123995323123343869) · ["Bruciare la fiducia" (`2124449493513068862`)](https://x.com/theo/status/2124449493513068862)
- [Dossier tecnico approfondito 06 (dataset completo di 1.151 tweet)](../../docs/dossiers/06-tweet-forensic-dataset-1151.md)
