"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const journeys = [
  { id: "explore", label: "A trip away", title: "Land ready for the good part.", copy: "Maps, messages and plans should be within reach when you arrive. Find a destination plan that fits where you are going and focus on the journey, not the setup.", note: "For holidays and short trips" },
  { id: "work", label: "Work on the move", title: "Take your working day with you.", copy: "From a new city to a new time zone, a digital data plan keeps the essentials close. Check the coverage and allowance before you travel.", note: "For remote work and business travel" },
  { id: "multi", label: "More than one stop", title: "Make room for the whole route.", copy: "Crossing borders? Explore regional and global options on Easylink, compare what is available for your itinerary and choose the plan that suits the trip.", note: "For multi destination journeys" },
] as const;

export function BusinessJourney() {
  const [selected, setSelected] = useState(0);
  const active = journeys[selected];
  function onKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (index + keys[event.key] + journeys.length) % journeys.length;
    setSelected(next);
    document.getElementById(`journey-tab-${journeys[next].id}`)?.focus();
  }
  return <section className="band band-blue" aria-labelledby="journey-title">
    <div className="band-head"><h2 id="journey-title" className="rv">Your journey, your way to connect</h2><p className="rv">Different trips ask different things of your data. Choose the one that sounds like yours.</p></div>
    <div className="journey">
      <div className="journey-tabs rv" role="tablist" aria-label="Travel scenario">{journeys.map((item, index) => <button key={item.id} type="button" id={`journey-tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls="journey-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => onKey(event, index)}>{item.label}<ArrowUpRight size={20} aria-hidden="true" /></button>)}</div>
      <div className="journey-panel" id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${active.id}`} key={active.id}>
        <div><h3>{active.title}</h3><p>{active.copy}</p></div>
        <div><p className="note">{active.note}. Coverage, pricing and device compatibility vary; check current details on Easylink before you buy.</p><a className="button" style={{ marginTop: 20 }} href="https://www.geteasylink.app/" target="_blank" rel="noopener noreferrer">Explore Easylink plans <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </div>
    </div>
  </section>;
}
