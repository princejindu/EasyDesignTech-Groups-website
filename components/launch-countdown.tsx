"use client";

import { useEffect, useState } from "react";

const units = ["days", "hours", "minutes", "seconds"] as const;

export function LaunchCountdown() {
  const [launchAt, setLaunchAt] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/echat", { cache: "no-store" })
      .then(response => response.ok ? response.json() as Promise<{ launchAt: string | null }> : null)
      .then(data => { if (active) setLaunchAt(data?.launchAt || null); })
      .catch(() => {});
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  const target = launchAt ? Date.parse(launchAt) : NaN;
  const remaining = Number.isFinite(target) && now !== null ? Math.max(0, Math.floor((target - now) / 1000)) : null;
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400), Math.floor(remaining % 86400 / 3600), Math.floor(remaining % 3600 / 60), remaining % 60];
  const launched = remaining === 0;

  return <div className="echat-countdown" aria-label="eChat launch countdown">
    <div className="echat-countdown-heading"><span>LAUNCH COUNTDOWN</span><strong>{launchAt && !launched ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" }).format(target) + " UK time" : launched ? "The target date has arrived" : "Launch date to be announced"}</strong></div>
    <div className="echat-countdown-grid" role="timer" aria-live="off">{units.map((unit, index) => <div key={unit}><strong>{values[index] === null ? "––" : String(values[index]).padStart(2, "0")}</strong><span>{unit}</span></div>)}</div>
    <p>{launched ? "We are preparing the latest launch details. Please contact us for an update." : launchAt ? "Time remaining until the announced launch target." : "We will start the countdown here when a launch date is confirmed."}</p>
  </div>;
}
