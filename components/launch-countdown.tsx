"use client";

import { useEffect, useState } from "react";

const week = 7 * 24 * 60 * 60 * 1000;
const anchor = Date.UTC(2026, 10, 23);
const units = ["days", "hours", "minutes", "seconds"] as const;

function useWeeklyTimer() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  if (now === null) return null;
  const elapsed = ((now - anchor) % week + week) % week;
  const remaining = Math.ceil((week - elapsed) / 1000);
  return [Math.floor(remaining / 86400), Math.floor(remaining % 86400 / 3600), Math.floor(remaining % 3600 / 60), remaining % 60];
}

export function CompactWeeklyCountdown({ product }: { product: string }) {
  const values = useWeeklyTimer();
  return <div className="echat-compact-countdown" role="timer" aria-label={`${product} repeating seven day countdown`} aria-live="off"><span>COMING SOON / WEEKLY COUNTDOWN</span><strong>{units.map((unit, index) => <span key={unit}>{values === null ? "––" : String(values[index]).padStart(2, "0")}<small>{unit.slice(0, 1).toUpperCase()}</small></span>)}</strong></div>;
}

export function WeeklyCountdown({ product }: { product: string }) {
  const values = useWeeklyTimer();
  return <div className="echat-countdown" aria-label={`${product} repeating seven day countdown`}>
    <div className="echat-countdown-heading"><span>{product.toUpperCase()} / COMING SOON</span><strong>Seven day<br />countdown.</strong></div>
    <div className="echat-countdown-grid" role="timer" aria-live="off">{units.map((unit, index) => <div key={unit}><strong>{values === null ? "––" : String(values[index]).padStart(2, "0")}</strong><span>{unit}</span></div>)}</div>
    <p>This timer resets every seven days. A launch date has not been announced.</p>
  </div>;
}
