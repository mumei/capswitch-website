import type { Metadata } from "next";
import { CapswitchDemo } from "./capswitch-demo";

export const metadata: Metadata = {
  title: "Capswitch — Caps Lockを、Macのコントロールキーへ",
  description:
    "Caps Lockを押すだけで、Functionキー、音量、オーディオ出力、入力ソース、タイマーなどを操作できるmacOSメニューバーアプリ。",
};

const modes = [
  ["Functionキー切替", "F1〜F12を標準Functionキーとメディア操作の間で切り替えます。", "2状態"],
  ["マイクミュート", "選択した入力デバイスのミュートを、短いHUDとLEDで確認できます。", "2状態"],
  ["外観切替", "macOSのライト／ダーク外観をCaps Lockで切り替えます。", "2状態"],
  ["スリープ防止", "標準のスリープ設定と、一時的なスリープ防止を切り替えます。", "2状態"],
  ["スピーカーミュート", "現在の出力先をそのままに、音声出力をミュートします。", "2状態"],
  ["音量コントローラー", "連打で5％上げ、長押しで下げます。LEDの速度が音量を示します。", "連続値"],
  ["オーディオ出力", "スピーカーやヘッドフォンを順に選び、点滅回数で選択先を示します。", "複数状態"],
  ["入力ソース", "日本語・英語などの入力ソースを順に切り替えます。", "複数状態"],
  ["タイマー", "単押しで開始・停止、連打で加算、長押しで減算。終了時は音とHUDで通知します。", "時間"],
  ["ショートカット", "ON、OFF、連打、長押しに任意のショートカットを割り当てます。", "カスタム"],
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
            ほとんど使わないキーを、毎日使う操作に変える。
            押した結果は物理LEDと短いHUDで、手元からすぐ確認できます。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases">
              14日間試す
            </a>
            <a className="text-link" href="https://github.com/mumei/capswitch-core">
              公開Coreを見る <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="requirements">macOS 14以降 · Apple Silicon / Intel · 全機能を14日間試用</p>
        </div>
        <CapswitchDemo />
      </section>

      <section className="guided-tour" aria-labelledby="tour-title">
        <div className="section-intro">
          <p className="kicker">How it works</p>
          <h2 id="tour-title">押す。見る。次の操作へ。</h2>
          <p>キーボードから手を離さず、状態だけを確かめられるように設計しています。</p>
        </div>
        <div className="tour-frame">
          <div className="tour-step"><span className="step-index">01</span><div><h3>Caps Lockを捕捉</h3><p>通常のCaps Lock入力は止め、選択したモードの操作として解釈します。</p></div></div>
          <div className="signal-line" aria-hidden="true"><span /></div>
          <div className="tour-step"><span className="step-index">02</span><div><h3>操作を判定</h3><p>単押し、連打、長押しを区別。連打の判定時間も設定できます。</p></div></div>
          <div className="signal-line" aria-hidden="true"><span /></div>
          <div className="tour-step"><span className="step-index">03</span><div><h3>LEDとHUDで返答</h3><p>点灯、点滅回数、点滅速度と短い画面表示で、現在の状態を伝えます。</p></div></div>
        </div>
      </section>

      <section className="modes-section" id="modes" aria-labelledby="modes-title">
        <div className="section-intro">
          <p className="kicker">10 modes</p>
          <h2 id="modes-title">1つのキーに、10通りの役割。</h2>
          <p>2状態の切り替えだけでなく、連打・長押し・LED点滅を使う操作にも対応します。</p>
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
          <h2 id="led-title">LEDは、状態の小さな表示器。</h2>
          <p>点灯と消灯だけに固定しません。複数の候補は点滅回数、連続した値は点滅速度で表現します。</p>
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
          <p>アカウント登録なしで試用を開始できます。購入後はライセンスキーを入力し、同じアプリをそのまま使い続けられます。</p>
          <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases">Capswitchをダウンロード</a>
          <span className="release-note">正式な購入リンクは公開準備中です。</span>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Capswitch</span><span>macOSのCaps Lockを、使える入力へ。</span>
        <a href="https://github.com/mumei/capswitch-core">Apache-2.0 Core ↗</a>
      </footer>
    </main>
  );
}
