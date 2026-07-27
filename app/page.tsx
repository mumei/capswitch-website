import type { Metadata } from "next";
import { CapswitchDemo } from "./capswitch-demo";

export const metadata: Metadata = {
  title: "Capswitch — Caps Lockを、Macのコントロールキーへ",
  description:
    "Caps Lockを押すだけで、Functionキー、音量、オーディオ出力、入力ソース、タイマーなどを操作できるmacOSメニューバーアプリ。",
};

const modes = [
  ["Functionキー切替", "F1〜F12の動作を切り替える", "2状態"],
  ["マイクミュート", "マイクをミュート／解除する", "2状態"],
  ["外観切替", "ライト／ダークを切り替える", "2状態"],
  ["スリープ防止", "スリープ防止を開始／停止する", "2状態"],
  ["スピーカーミュート", "音声出力をミュート／解除する", "2状態"],
  ["音量コントローラー", "連打で上げ、長押しで下げる", "連続値"],
  ["オーディオ出力", "出力先を順番に切り替える", "複数状態"],
  ["入力ソース", "日本語・英語などを切り替える", "複数状態"],
  ["タイマー", "開始・停止と時間調整を行う", "時間"],
  ["ショートカット", "押し方ごとに操作を割り当てる", "カスタム"],
] as const;

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
          <p className="kicker">macOS menu bar app</p>
          <h1>Caps Lockを、<br />Macのコントロールキーへ。</h1>
          <p className="hero-lede">
            Caps Lockに、よく使う操作を1つ割り当てます。
            結果はキーのLEDとHUDで確認できます。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases">
              14日間試す
            </a>
            <a className="text-link" href="https://github.com/mumei/capswitch-core">
              公開Coreを見る <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="requirements">macOS 14以降 · 14日間無料</p>
        </div>
        <CapswitchDemo />
      </section>

      <section className="guided-tour" aria-labelledby="tour-title">
        <div className="section-intro">
          <p className="kicker">How it works</p>
          <h2 id="tour-title">設定して、押すだけ。</h2>
        </div>
        <div className="tour-frame">
          <div className="tour-step"><span className="step-index">01</span><div><h3>モードを選ぶ</h3><p>設定から使いたい操作を1つ選びます。</p></div></div>
          <div className="signal-line" aria-hidden="true"><span /></div>
          <div className="tour-step"><span className="step-index">02</span><div><h3>Caps Lockを押す</h3><p>標準動作は無効化。必要なら3〜5回の連打で、通常のCaps Lockも切り替えられます。</p></div></div>
          <div className="signal-line" aria-hidden="true"><span /></div>
          <div className="tour-step"><span className="step-index">03</span><div><h3>状態が切り替わる</h3><p>選んだモードに合わせて機能が動作し、LEDとHUDにも状態を表示します。</p></div></div>
        </div>
      </section>

      <section className="modes-section" id="modes" aria-labelledby="modes-title">
        <div className="section-intro">
          <p className="kicker">10 modes</p>
          <h2 id="modes-title">モードを、1つ選ぶ。</h2>
        </div>
        <div className="mode-list" role="list">
          {modes.map(([name, description, type], index) => (
            <article className="mode-row" role="listitem" key={name}>
              <span className="mode-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{name}</h3><p>{description}</p><span className="mode-type">{type}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="led-section" id="display" aria-labelledby="led-title">
        <div className="led-copy">
          <p className="kicker">Physical feedback</p>
          <h2 id="led-title">LEDで現在の状態を確認。</h2>
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
        <div><p className="kicker">Try first</p><h2 id="price-title">14日間、すべて試せます。</h2></div>
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
