import type { Metadata } from "next";
import Image from "next/image";
import { CapswitchDemo } from "./capswitch-demo";

export const metadata: Metadata = {
  title: "Capswitch — あまり使わないCaps Lockを活用",
  description:
    "Caps Lockを押すだけで、Functionキー、音量、オーディオ出力、入力ソース、タイマーなどを操作できるmacOSメニューバーアプリ。",
};

const modes = [
  {
    name: "Functionキー切替",
    description: "F1〜F12の動作を切り替える",
    type: "2状態",
    states: ["メディア操作", "Functionキー入力"],
    actions: ["単押し"],
    loop: true,
  },
  {
    name: "マイクミュート",
    description: "マイクをミュート／解除する",
    type: "2状態",
    states: ["使用中", "ミュート"],
    actions: ["単押し"],
    loop: true,
  },
  {
    name: "外観切替",
    description: "ライト／ダークを切り替える",
    type: "2状態",
    states: ["ライト", "ダーク"],
    actions: ["単押し"],
    loop: true,
  },
  {
    name: "スリープ防止",
    description: "スリープ防止を開始／停止する",
    type: "2状態",
    states: ["標準設定", "スリープ防止"],
    actions: ["単押し"],
    loop: true,
  },
  {
    name: "スピーカーミュート",
    description: "音声出力をミュート／解除する",
    type: "2状態",
    states: ["再生中", "ミュート"],
    actions: ["単押し"],
    loop: true,
  },
  {
    name: "音量コントローラー",
    description: "連打で上げ、長押しで下げる",
    type: "連続値",
    states: ["現在の音量", "＋5%"],
    actions: ["連打"],
    note: "長押し中は−5%ずつ調整",
  },
  {
    name: "オーディオ出力",
    description: "出力先を順番に切り替える",
    type: "複数状態",
    states: ["出力先 1", "出力先 2", "次の出力先"],
    actions: ["単押し", "単押し"],
    loop: true,
  },
  {
    name: "入力ソース",
    description: "日本語・英語などを切り替える",
    type: "複数状態",
    states: ["入力 1", "入力 2", "次の入力"],
    actions: ["単押し", "単押し"],
    loop: true,
  },
  {
    name: "タイマー",
    description: "開始・停止と時間調整を行う",
    type: "時間",
    states: ["停止中", "カウント中", "一時停止", "完了"],
    actions: ["単押し", "単押し", "時間終了"],
    note: "停止中は連打＋1分／長押し−1分",
  },
  {
    name: "ショートカット",
    description: "押し方ごとに操作を割り当てる",
    type: "カスタム",
    states: ["押し方を判定", "設定した操作を実行"],
    actions: ["単押し・連打・長押し"],
    note: "長押しは1回／連続を選択",
  },
] as const;

function ModeTransition({ mode }: { mode: (typeof modes)[number] }) {
  const accessibleFlow = mode.states
    .map((state, index) => index === 0 ? state : `${mode.actions[index - 1]}で${state}`)
    .join("、") + ("loop" in mode && mode.loop ? "、その後は最初の状態へ戻る" : "");

  return (
    <div className="mode-transition" role="img" aria-label={`状態遷移: ${accessibleFlow}`}>
      <div className="transition-track" aria-hidden="true">
        {mode.states.map((state, index) => (
          <div className="transition-part" key={`${mode.name}-${state}`}>
            {index > 0 && (
              <span className="transition-action">
                <small>{mode.actions[index - 1]}</small>
                <i>→</i>
              </span>
            )}
            <span className="transition-state">{state}</span>
          </div>
        ))}
        {"loop" in mode && mode.loop && (
          <span className="transition-return">
            {mode.actions[mode.actions.length - 1]} → 最初の状態へ
          </span>
        )}
      </div>
      {"note" in mode && <span className="transition-note">{mode.note}</span>}
    </div>
  );
}

const ledPatterns = [
  ["2状態", "点灯／消灯", "Functionキー、ミュート、外観など"],
  ["複数状態", "短い点滅を1〜n回 → 長い消灯", "出力先、入力ソース"],
  ["連続値", "値が高いほど速く点滅", "音量"],
  ["残り時間", "終了に近づくほど速く点滅", "タイマー"],
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Capswitch トップ">
          Capswitch<span className="wordmark-dot" aria-hidden="true" />
        </a>
        <a className="nav-download" href="https://github.com/mumei/capswitch-releases/releases">
          ダウンロード
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <h1>あまり使わない<br />Caps Lockを活用</h1>
          <p className="hero-lede">
            Caps Lockを他の操作に！<br />
            Caps LockのLEDもフィードバックに活用！
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases">
              14日間試す
            </a>
            <a className="text-link" href="https://github.com/mumei/capswitch-core">
              公開Coreを見る <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="requirements">macOS 14以降</p>
        </div>
        <CapswitchDemo />
      </section>

      <section className="guided-tour" aria-labelledby="tour-title">
        <div className="section-intro">
          <p className="kicker">How it works</p>
          <h2 id="tour-title">設定から、普段の操作まで</h2>
        </div>
        <div className="tour-story">
          <article className="tour-chapter tour-chapter-settings">
            <div className="tour-step">
              <span className="step-index">01</span>
              <div>
                <h3>設定でモードを選ぶ</h3>
                <p>10種類から使いたい操作を1つ選び、必要な項目だけ調整します。</p>
              </div>
            </div>
            <figure className="tour-screenshot">
              <Image
                src="/capswitch-settings.png"
                width="1012"
                height="724"
              loading="lazy"
              alt="Capswitchの設定画面。左側に一般、入力、モード、表示、ライセンス、診断のメニューが並ぶ"
            />
          </figure>
          </article>

          <article className="tour-action">
            <div className="tour-step">
              <span className="step-index">02</span>
              <div>
                <h3>Caps Lockで操作する</h3>
                <p>単押し、連打、長押しをモードに合わせて使います。</p>
              </div>
            </div>
            <div className="action-flow" aria-label="Caps Lockの操作結果">
              <strong>Caps Lock</strong>
              <span aria-hidden="true">→</span>
              <strong>モードが動作</strong>
              <span aria-hidden="true">→</span>
              <strong>LED・HUDに表示</strong>
            </div>
          </article>

          <article className="tour-chapter tour-chapter-menu">
            <div className="tour-step">
              <span className="step-index">03</span>
              <div>
                <h3>メニューバーから管理する</h3>
                <p>稼働状態の確認、一時停止、設定、終了をすぐに操作できます。</p>
              </div>
            </div>
            <figure className="tour-screenshot">
              <Image
                src="/capswitch-menu.png"
                width="588"
                height="370"
                loading="lazy"
                alt="Capswitchの常駐メニュー。稼働状態、一時停止、設定、終了を表示している"
              />
            </figure>
          </article>
        </div>
      </section>

      <section className="caps-lock-section" aria-labelledby="caps-lock-title">
        <div className="section-intro">
          <p className="kicker">Keep Caps Lock</p>
          <h2 id="caps-lock-title">通常のCaps Lockも使えます</h2>
          <p>設定した回数だけ連打したときは、選んだモードではなく通常のCaps Lockとして動作します。</p>
        </div>
        <div className="caps-lock-flow" aria-label="通常のCaps Lockを使う手順">
          <div>
            <span>設定</span>
            <strong>3・4・5回から選ぶ</strong>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>操作</span>
            <strong>選んだ回数だけ連打</strong>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>結果</span>
            <strong>Caps LockをON／OFF</strong>
          </div>
        </div>
      </section>

      <section className="modes-section" id="modes" aria-labelledby="modes-title">
        <div className="modes-inner">
          <div className="section-intro">
            <p className="kicker">10 modes</p>
            <h2 id="modes-title">モードを、1つ選ぶ</h2>
          </div>
          <div className="mode-list" role="list">
            {modes.map((mode, index) => (
              <article className="mode-row" role="listitem" key={mode.name}>
                <span className="mode-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="mode-summary">
                  <div className="mode-heading">
                    <h3>{mode.name}</h3>
                    <span className="mode-type">{mode.type}</span>
                  </div>
                  <p>{mode.description}</p>
                </div>
                <ModeTransition mode={mode} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="led-section" id="display" aria-labelledby="led-title">
        <div className="led-copy">
          <p className="kicker">Physical feedback</p>
          <h2 id="led-title">LEDで状態を表示</h2>
          <p>点灯・消灯・点滅回数・点滅速度を使い分けます。</p>
        </div>
        <div className="led-table" role="table" aria-label="LED点滅パターン">
          {ledPatterns.map(([state, pattern, examples]) => (
            <div className="led-row" role="row" key={state}>
              <span role="cell">{state}</span><strong role="cell">{pattern}</strong><span role="cell">{examples}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="price-section" id="download" aria-labelledby="price-title">
        <div><p className="kicker">Try first</p><h2 id="price-title">14日間、すべて試せます</h2></div>
        <div className="price-copy">
          <p>登録なしで全機能を試せます。</p>
          <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases">Capswitchをダウンロード</a>
          <span className="release-note">正式な購入リンクは公開準備中です。</span>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Capswitch</span>
        <a href="https://github.com/mumei/capswitch-core">Apache-2.0 Core ↗</a>
      </footer>
    </main>
  );
}
