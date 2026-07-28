"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const demoStates = [
  { label: "メディア操作", short: "Media", led: true },
  { label: "Functionキー", short: "Function", led: false },
] as const;

export function CapswitchDemo() {
  const [state, setState] = useState(0);
  const [hudKey, setHudKey] = useState(0);
  const [hudVisible, setHudVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const hudTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCapsLockState = useRef<boolean | null>(null);
  const current = demoStates[state];

  const toggle = useCallback(() => {
    setState((value) => (value + 1) % demoStates.length);
    setHudKey((value) => value + 1);
    setHudVisible(true);
    if (hudTimer.current) clearTimeout(hudTimer.current);
    hudTimer.current = setTimeout(() => setHudVisible(false), 1400);
  }, []);

  useEffect(() => {
    function handleCapsLock(event: KeyboardEvent) {
      if ((event.key !== "CapsLock" && event.code !== "CapsLock") || event.repeat) return;

      const capsLockState = event.getModifierState("CapsLock");
      const shouldToggle = event.type === "keydown" || lastCapsLockState.current !== capsLockState;
      lastCapsLockState.current = capsLockState;

      if (!shouldToggle) {
        if (event.type === "keyup") setPressed(false);
        return;
      }

      setPressed(true);
      if (pressTimer.current) clearTimeout(pressTimer.current);
      pressTimer.current = setTimeout(() => setPressed(false), 120);
      toggle();
    }

    function handleBlur() {
      setPressed(false);
      lastCapsLockState.current = null;
    }

    window.addEventListener("keydown", handleCapsLock);
    window.addEventListener("keyup", handleCapsLock);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleCapsLock);
      window.removeEventListener("keyup", handleCapsLock);
      window.removeEventListener("blur", handleBlur);
      if (hudTimer.current) clearTimeout(hudTimer.current);
      if (pressTimer.current) clearTimeout(pressTimer.current);
    };
  }, [toggle]);

  return (
    <div className="demo-panel reveal" style={{ "--i": 1 } as React.CSSProperties}>
      <div className="demo-status"><strong>{current.label}</strong></div>
      <div className="key-stage">
        <div className={`hud-preview ${hudVisible ? "is-visible" : "is-hidden"}`} key={hudKey} aria-live="polite">
          {hudVisible ? current.short : ""}
        </div>
        <button className={`caps-key ${current.led ? "is-on" : ""} ${pressed ? "is-pressed" : ""}`} type="button"
          onClick={toggle} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)} onBlur={() => setPressed(false)}
          aria-label={`Caps Lockを押す。現在は${current.label}`} aria-pressed={current.led}>
          <span className="key-led" aria-hidden="true" /><span className="caps-symbol" aria-hidden="true">⇪</span><span>caps lock</span>
        </button>
      </div>
      <div className="demo-caption">
        <span className="demo-led-label"><i className={current.led ? "active" : ""} aria-hidden="true" />LED {current.led ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
}
