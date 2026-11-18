# 新しい外国語実践研究会（新外研） 公式サイト

新しい外国語実践研究会（新外研）の公式サイトの「原稿の書庫」です。

このリポジトリに入っているのは、サイトの原稿（研究会のお知らせ、会則、沿革など）と、それを Web ページに組み立てる仕組みです。原稿を保存すると、GitHub が自動でページを組み立てて公開します。学級通信にたとえると、原稿を書いて職員室の棚に入れておけば、印刷と配布は係が毎回同じ手順でやってくれる、という形です。

- 本番の URL：https://shingaiken.github.io/
- 公開されるのは HTML と CSS だけです。作るときに JavaScript の道具（Astro）を使いますが、閲覧者の側でプログラムが動いたり、個人情報を集めたりすることはありません。
- 申込は Peatix、問い合わせはメールで受けます。サイトにはフォームを置きません。

---

## 誰が何をできるか

| 作業 | 必要な知識 | 担当 |
|---|---|---|
| **日常の更新**：研究会の告知を追加する、開催報告を書き足す、文章の誤りを直す | なし（決まった形のファイル 1 つを書き換えるだけ） | 後任の先生・学生でもできます |
| **デザインやページ構成の変更**：色や配置を変える、ページを増やす、メニューを変える | Astro・HTML・CSS の知識 | 詳しい人に頼んでください |

日常の更新は、ブラウザで GitHub を開いて Markdown（`.md`）のファイルを 1 つ書くだけです。パソコンに何かを入れる必要はありません。くわしい手順は [docs/更新手順_研究会の告知.md](docs/更新手順_研究会の告知.md) にあります。

ファイルの置き場所（日常の更新で触るのは `src/content/events/` だけ）：

```
src/content/events/   ← 研究会のお知らせ（1 回につき 1 ファイル）と写真
src/data/site.ts      ← 会の基本情報（連絡先・SNS・本番の URL）
src/pages/            ← 各ページ（新外研について・沿革・会則・役員など）
src/components/ src/layouts/ src/styles/   ← デザイン（詳しい人向け）
.github/              ← 自動で動く仕組み（詳しい人向け）
```

---

## 研究会を追加する手順

1. GitHub で `src/content/events/_template.md`（ひな形）を開き、中身をすべてコピーします。
2. 同じフォルダで「Add file」→「Create new file」を選び、ファイル名を **`開催日-英字の短い名前.md`** にします。
   - 例：`2026-11-07-meaningful-repetition.md`
   - 日付は半角で `YYYY-MM-DD`（月・日は 0 を付けて 2 けた）。日付のあとは半角の英小文字・数字・ハイフンだけです。
   - このファイル名がそのままページの URL になります（`/events/2026-11-07-meaningful-repetition/`）。あとから変えると URL も変わるので、決めたら変えないでください。
3. コピーした中身を貼り付け、各項目を書き換えます。各項目の書き方は、ひな形の中に説明があります。
   - 【必須】：`title`（名称）、`start`（開始日時。`'2026-11-07T10:00:00+09:00'` のように最後に `+09:00` を付け、全体を `' '` で囲む）、`format`（形式）、`kind`（種別）、`venue`（会場）、`summary`（検索結果に出る説明）。対面・ハイブリッドでは `venueAddress`（住所）も必須
   - 【任意】：副題、沿革に出す短い名称（`shortTitle`）、終了日時、参加費、申込先（Peatix の URL）、登壇者、写真
   - 文（`title`・`summary` など）は、いつも全体を `' '` で囲みます
   - 沿革のページには、開催日を過ぎた研究会が自動で載ります（手で書き足す必要はありません）
   - `---` より下が本文です。
4. 画面右上の「Commit changes...」を押し、変更の説明（例：「11月のセミナーを追加」）を書いて「Commit changes」で保存します。
5. 「Actions」タブを開き、いちばん上の「Deploy to GitHub Pages」が緑のチェックになるのを待ちます（数分）。
   - 赤い × になったときは、書き方かファイル名に誤りがあります。× をクリックすると、どの項目が誤っているかが表示されます（例：`summary` が短すぎる、`start` に `+09:00` がない、ファイル名の形が違う）。ファイルを直して保存し直してください。誤りがある間、サイトは前の状態のままで、まちがったページが公開されることはありません。
6. サイトを開いて、研究会が載っていることを確かめます。開催日までは「次回の研究会」に、開催日を過ぎると自動でトップの「研究会の記録」と研究会一覧の「過去の研究会」に表示されます。

**開催後**は、同じファイルの最後に `## 開催報告` という見出しを追加し、実施した内容を書いて保存します。ファイルを新しく作る必要はありません。

---

## 写真を載せるとき

- 載せてよいのは、**児童の顔が写っていない写真**か、**学校から掲載の許諾を得た写真**だけです。迷ったら載せないでください。
- 写真ファイルは、研究会の `.md` と同じフォルダ（`src/content/events/`）に置きます。ファイル名は半角英数字にします（例：`2026-11-07-meaningful-repetition-1.jpg`）。
- `.md` の `images:` に、写真ごとに次の 3 つを必ず書きます。どれかが欠けているとサイトの更新が止まります。
  - `src`：写真ファイルの場所（例：`./2026-11-07-meaningful-repetition-1.jpg`）
  - `alt`：写真の説明（目の見えにくい方の読み上げや、写真が表示されないときに使われます。例：「授業の板書のようす」）
  - `consent: true`：掲載の許諾を確認した、という印
- 写真は、研究会のページの本文の下に並んで表示されます。大きな写真も自動で軽く縮めて表示されます。縮める作業は不要です。

---

## 自動で行われること

| いつ | 何が起きるか | 設定ファイル |
|---|---|---|
| main に保存（コミット）したとき | サイトを組み立てて公開します | `.github/workflows/deploy.yml` |
| 毎日 0 時 10 分（日本時間） | サイトを組み立て直します。静的サイトは日付が過ぎても勝手には変わらないので、これで「次回」「過去」が切り替わります | 同上 |
| プルリクエスト（PR）を作ったとき | 研究会データの書き方、ページの組み立て、サイト内のリンク切れを点検します。誤りがあると PR に赤い × が付きます | `.github/workflows/check.yml` |
| 毎週月曜 | Dependabot（GitHub の自動係）が、部品（Astro など）や自動化の仕組みの更新を PR で提案します | `.github/dependabot.yml` |

Dependabot の PR の扱い：点検が緑で、題名に「npm-minor-patch」「actions-minor-patch」（小さな更新のまとめ）とあるものは、そのまま「Merge」してかまいません。Astro の大きな版上げ（例：7 → 8）は別の PR になり、作りが変わることがあるので、詳しい人に確認してもらってください。

### 毎日の自動更新が止まらないように

GitHub の決まりで、**公開リポジトリに 60 日間なにも変更がないと、毎日の自動更新が止められます**。研究会の告知を出すたびに数え直しになるので、ふだんは気にしなくてかまいません。

- 念のため、最後の更新から 45 日たつと、GitHub が「Issue」を立ててメールで知らせます。知らせが来たら、何か 1 つ保存（README の誤字直しなどでも可）してください。
- もし止まってしまったら：「Actions」タブ →「Deploy to GitHub Pages」→「Enable workflow」を押し、続けて「Run workflow」を押してください。

---

## 手元のパソコンで動かす（詳しい人向け）

日常の更新には必要ありません。デザインを変えるときなどに使います。

1. Node.js 26 を入れます（版は `.nvmrc` に書いてあります。nvm や fnm を使う場合は `nvm use`）。
2. このリポジトリを手元に複製し、フォルダで次を実行します。

```sh
npm ci          # 部品を入れる（package-lock.json のとおりに入る）
npm run dev     # 試し表示。http://localhost:4321/ で見られる。保存すると自動で反映される
npm run check   # 型と研究会データの点検
npm run build   # 本番と同じ組み立て（dist/ にできる）
npm run preview # 組み立てたものの確認
```

技術の要点：Astro（静的出力）、素の CSS（`src/styles/global.css` に色や文字の大きさの変数。Web フォントは見出しの Zen Maru Gothic の太字 1 種だけで、本文は各端末の標準ゴシックで表示）、研究会データは Content Collections（決まりは `src/content.config.ts`）。サイト内のリンクと画像の URL は必ず `src/lib/url.ts` の `withBase()` を通してください（試験公開でサブパスに置いても壊れないようにするため。点検で、通していないリンクは切れたリンクとして見つかります）。

---

## アカウント構成

- **GitHub Organization**「shingaiken」：会の Gmail（shingaiken.english@gmail.com）で作成し、会が所有します。個人のアカウントには置きません。
  - Owner（管理者）は **2 名以上**（担当者＋代表を想定）。1 人が抜けても会として引き継げるようにするためです。
  - Organization の設定で、全メンバーに **二段階認証を必須** にします（Settings → Authentication security）。
  - 日常の更新をする人は、Owner ではなくメンバー（書き込み権限）として招待します。
- **公開先**：GitHub Pages（無料）。Organization が無料プランの場合、リポジトリは公開（public）にする必要があります。原稿は公開されて困るものを置かない前提です（個人情報・未許諾の写真は置かない）。
- **独自ドメイン**：今は使っていません（`shingaiken.github.io` のみ）。取得したら下の「独自ドメインを足すとき」を参照してください。
- 計測：Search Console・Bing Webmaster Tools（会の Gmail で登録）。

---

## 本番公開チェックリスト

試験公開（個人のアカウントのリポジトリ）から本番に移すときの手順です。

まず、仮置きの文言と未決定の内容を片づけます（今は、画面上では仮置きと分からない形で表示されています）。

- [ ] トップのキャッチコピー（`src/components/home/Hero.astro`）を代表が承認した。
- [ ] 「新外研が大切にしていること」3 項目と、トップの「新外研について」の文（`src/components/home/About.astro`）を代表が承認した。
- [ ] 「新外研について」のページの文言（`src/pages/about.astro`）を代表が承認した。
- [ ] 会則の原文を `src/pages/bylaws.astro` に貼り、「準備中」のお知らせを外した（または、準備中のまま公開することを会で決めた）。
- [ ] 役員ページの掲載範囲を会で決め、`src/pages/officers.astro` に反映した（または、準備中のまま公開することを会で決めた）。
- [ ] ロゴ画像（112×112 ピクセル以上の PNG など）を `public/logo.png` に置き、`src/pages/index.astro` の Organization に `logo: absoluteUrl(site.logo, Astro.site)` を加えた（検索エンジン向けの会の情報に、ロゴが必要です。画像がないまま加えると、存在しない画像を指してしまいます）。

次に、公開の設定をします。

- [ ] リポジトリを Organization「shingaiken」に移し、名前を **`shingaiken.github.io`** にする（この名前にすると `https://shingaiken.github.io/` で公開されます）。
  - 試験公開のリポジトリが非公開（private）だった場合、無料プランでは Pages が使えないので、公開（public）に切り替える。
- [ ] Settings → Pages → Build and deployment → Source を **「GitHub Actions」** にする。
- [ ] Actions タブで「Deploy to GitHub Pages」を「Run workflow」で 1 回動かし、緑になることを確かめる。
- [ ] `src/data/site.ts` の `productionUrl` が公開先の URL（`https://shingaiken.github.io/`）と一致していることを確かめる。一致していれば、検索エンジンに載せない設定（`noindex`、robots.txt の `Disallow`）は自動で外れます。公開後、ページのソースに `noindex` がないことを確かめる。
- [ ] **Google Search Console** に「URL プレフィックス」で `https://shingaiken.github.io/` を登録する。独自ドメインがなく DNS の設定はできないので、所有確認は **HTML ファイル**（`public/` に置いて保存）か **メタタグ**（詳しい人に `BaseHead.astro` へ追加してもらう）で行う。登録後、サイトマップ `https://shingaiken.github.io/sitemap-index.xml` を送信する。
- [ ] **Bing Webmaster Tools** に登録する（Search Console から取り込むのがいちばん簡単。または `BingSiteAuth.xml` を `public/` に置く）。
- [ ] Instagram・X・Peatix のプロフィールの URL を新しいサイトに変える（担当：未定）。
- [ ] 旧サイト（Google Sites）を、新しいサイトへの移転のお知らせだけのページにする（何か月残すかは会で決める）。
- [ ] Organization の Owner が 2 名以上いること、二段階認証が必須になっていることを確かめる。

---

## 独自ドメインを足すとき

1. ドメインを会のアカウントで取得する（例：`shingaiken.jp`）。
2. Organization の Settings → Pages で、ドメインの所有確認（Verify）をする（他人に乗っ取られないため）。
3. ドメインの管理画面で、GitHub Pages を指す DNS の設定をする（GitHub の案内「Managing a custom domain for your GitHub Pages site」のとおり）。
4. リポジトリの Settings → Pages → Custom domain にドメインを入れて保存し、「Enforce HTTPS」にチェックを入れる。GitHub Actions で公開しているので、`CNAME` ファイルは不要です。
5. `src/data/site.ts` の `productionUrl` を新しいドメイン（例：`https://shingaiken.jp/`）に書き換える。`astro.config.mjs` の手元用の既定値（`https://shingaiken.github.io`）も同じものに直す。公開時の URL は Actions が Pages の設定から自動で受け取ります。
6. `https://shingaiken.github.io/` へのアクセスは、GitHub が新しいドメインへ自動で転送します。
7. Search Console・Bing に新しいドメインを登録し直す（Search Console は「アドレス変更」ツールも使う）。
8. この README のこの節に、**ドメインの更新月と請求先（支払う人・費目）** を書き足す。更新を忘れると、サイトが見られなくなります。

| 項目 | 内容 |
|---|---|
| ドメイン | （未取得） |
| 更新月 | （未定） |
| 請求先・支払い方法 | （未定） |
