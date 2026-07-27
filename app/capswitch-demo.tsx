"use client";

import { useState } from "react";

const demoStates = [
  { label: "メディア操作", short: "Media", led: true },
  { label: "Functionキー", short: "Function", led: false },
] as const;

export function CapswitchDemo() {
  const [state, setState] = useState(0);
  const [hudKey, setHudKey] = useState(0);
  const current = demoStates[state];

  function toggle() {
    setState((value) => (value + 1) % demoStates.length);
    setHudKey((value) => value + 1);
  }

  return (
    <div className="demo-panel reveal" style={{ "--i": 1 } as React.CSSProperties}>
      <div className="demo-status"><span>LIVE DEMO</span><strong>{current.label}</strong></div>
      <div className="key-stage">
        <div className="hud-preview" key={hudKey} aria-live="polite">{current.short}</div>
        <button className={`caps-key ${current.led ? "is-on" : ""}`} type="button" onClick={toggle}
          aria-label={`Caps Lockを押す。現在は${current.label}`} aria-pressed={current.led}>
          <span className="key-led" aria-hidden="true" /><span className="caps-symbol" aria-hidden="true">⇪</span><span>caps lock</span>
        </button>
      </div>
      <div className="demo-caption">
        <span>Caps Lockを押して切り替え</span>
        <span className="demo-led-label"><i className={current.led ? "active" : ""} aria-hidden="true" />LED {current.led ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
}
