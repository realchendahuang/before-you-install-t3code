# #00 · 원조 논쟁: "Steal Our Code", 포크 명명 협박, 그리고 인종적 이중 기준

> 11분 만에 @theo는 중국인 개발자의 무료 MIT 포크를 "Chinese knockoff"이자 "Temu3 Code"라고 낙인찍고 GitHub 계정 정지까지 위협했다. 그러고는 11시간이 채 지나기 전에, MIT 코드를 베끼는 조 단위 미국 기업들을 공개적으로 환영했다.

<!-- section:claim -->
## 무엇이 주장되었나

- T3 Code의 홈페이지([`t3.codes`](https://t3.codes/))는 MIT 라이선스 아래 공개된 자사 GitHub 링크에 *"Steal our code (legally)"*라는 문구를 붙였다.
- 중국인 개발자의 MIT 포크를 공격한 지 11시간도 지나지 않아, 조 단위 미국 기업들이 T3 Code를 베껴도 괜찮은지 묻는 질문에 `@theo`는 이렇게 답했다. *"Nah. Open source is open source, even if a trillion dollar company uses it!"* ([`2124989435154726982`](https://x.com/theo/status/2124989435154726982)).

<!-- section:evidence -->
## 증거가 보여주는 것

- **MIT 포크를 겨냥한 표적 공격(11월 23일 19:11–19:54 CST):** 한 제3자가 중국인 개발자 `@DDdxx666`의 무료 MIT 포크를 공식 앱으로 착각하자, `@theo`는 11분 안에 두 차례 글을 올려 이를 *"Chinese knockoff"*, *"Temu3 Code"*라고 불렀고, 해당 개발자의 GitHub 계정 전체를 삭제시키겠다고 위협했다. *"Do it right now or I'm going to contact GitHub and have your account taken down"* ([`2124829315657576890`](https://x.com/theo/status/2124829315657576890)).
- **즉각적 순응, 비대칭적 사과:** `@DDdxx666`는 30분 안에 저장소 이름을 `Stardust`로 바꾸고 T3 관련 브랜딩을 모두 제거했다. `@theo`는 다이렉트 메시지로만 사과했고, 두 공개 게시물(합산 20만 회 이상 조회)은 그대로 둔 채였다.
- **국적에 따른 선별적 적용:** T3 팀원 `@maria_rcks`는 `maria-rcks/t3libre`(*"T3 Code, liberated"*)를 공개적으로 호스팅했고, `t3code-quota-ui`, `t3code-atlas`, `t3code-bar` 같은 영어권 저장소들은 삭제 요구 한 번 없이 아무런 제지 없이 운영됐다.
- **FAQ에 스스로 인정한 영감의 출처:** T3 Code의 자체 FAQ에는 Codex Desktop, Conductor, Claude Desktop, Cursor에서 직접적인 영감을 받았다고 명시되어 있다([`2125066677188702698`](https://x.com/realchendahuang/status/2125066677188702698)).
- **전체 조사의 발단:** 11월 24일부터 `pingdotgg/t3code`를 줄 단위로 검토하고 공공 기록을 확인한 결과, 이어지는 19건의 문서화된 사례가 드러났다. 이는 유럽 GDPR 진정서 제출과 거의 20건에 달하는 긴급 야간 패치로 이어졌다.

<!-- section:status -->
## 업스트림 현황 (`ca81b7b9`)

- **공공 기록:** 11월 23일의 두 차례 공개 공격과 11월 24일의 *"Open source is open source"* 답변은 모두 영구적인 공공 기록의 일부로 남아 있다.

<!-- section:visuals -->
## 시각 증거

![Theo가 GitHub에 연락해 MIT 포크 작성자의 계정을 삭제하겠다고 위협하는 장면](../../evidence/01-origin-theo-threat.png)

![T3 직원 @maria_rcks가 maria-rcks/t3libre라는 이름의 공개 포크를 호스팅하는 모습](../../evidence/extra/p1-3-maria-t3libre.png)

![영어권 t3code 포크들이 아무런 제지 없이 운영되는 모습을 보여주는 GitHub 검색 결과](../../evidence/extra/p1-4-github-t3code-search.png)

<!-- section:sources -->
## 1차 출처

- [발단 게시물 1("steal our code")](https://x.com/realchendahuang/status/2125059292919394654)
- [발단 게시물 2(포크 분쟁과 이중 기준)](https://x.com/realchendahuang/status/2125062675147448475)
- [`@theo`의 GitHub 계정 정지 위협 (`2124829315657576890`)](https://x.com/theo/status/2124829315657576890)
- [조 단위 미국 기업을 환영한 `@theo` (`2124989435154726982`)](https://x.com/theo/status/2124989435154726982)
- [FAQ 영감 관련 맥락 (`2125066677188702698`)](https://x.com/realchendahuang/status/2125066677188702698)
- [T3 Code 홈페이지 (`t3.codes`)](https://t3.codes/)
- [심층 기술 문서 05](../../docs/dossiers/05-governance-trademark-and-history.md)
