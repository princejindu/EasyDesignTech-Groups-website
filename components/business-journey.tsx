"use client";

import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Compass, Plane } from "lucide-react";

const journeys = [
  { id: "explore", label: "A trip away", icon: Plane, title: "Land ready for the good part.", copy: "Maps, messages and plans should be within reach when you arrive. Find a destination plan that fits the places you are going and focus on the journey, not the setup.", note: "For holidays and short trips" },
  { id: "work", label: "Work on the move", icon: BriefcaseBusiness, title: "Take your working day with you.", copy: "From a new city to a new time zone, a digital data plan helps you keep the essentials close. Check the available coverage and allowance before you travel.", note: "For remote work and business travel" },
  { id: "multi", label: "More than one stop", icon: Compass, title: "Make room for the whole route.", copy: "Crossing borders? Explore regional and global options on Easylink, compare what is available for your itinerary and choose the plan that makes sense for your trip.", note: "For multi destination journeys" },
] as const;

export function BusinessJourney() {
  const [selected, setSelected] = useState<(typeof journeys)[number]["id"]>("explore");
  const active = journeys.find(item => item.id === selected) || journeys[0];
  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % journeys.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + journeys.length) % journeys.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = journeys.length - 1;
    else return;
    event.preventDefault();
    setSelected(journeys[next].id);
    document.getElementById(`journey-tab-${journeys[next].id}`)?.focus();
  }
  return <section className="journey-section" aria-labelledby="journey-title"><div className="container journey-layout">
    <div className="journey-heading"><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> MADE FOR MOVEMENT</p><h2 id="journey-title">Your journey.<br /><em>Your way to connect.</em></h2><p>Different trips ask different things of your data. Choose the journey that feels like yours.</p><div className="journey-tabs" role="tablist" aria-label="Travel scenario">{journeys.map((item, index) => <button key={item.id} type="button" id={`journey-tab-${item.id}`} role="tab" aria-selected={selected === item.id} aria-controls="journey-panel" tabIndex={selected === item.id ? 0 : -1} className={selected === item.id ? "selected" : ""} onClick={() => setSelected(item.id)} onKeyDown={event => handleTabKey(event, index)}><item.icon size={19} strokeWidth={1.7} aria-hidden="true" />{item.label}<span aria-hidden="true">↗</span></button>)}</div></div>
    <div className="journey-panel" id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${active.id}`} key={active.id}><div className="journey-panel-top"><active.icon size={32} strokeWidth={1.4} aria-hidden="true" /><span>EASYLINK / {active.note.toUpperCase()}</span></div><div><span className="journey-panel-index">0{journeys.findIndex(item => item.id === selected) + 1} / 03</span><h3>{active.title}</h3><p>{active.copy}</p><a href="https://www.geteasylink.app/" target="_blank" rel="noopener noreferrer">Explore available plans <ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
  </div></section>;
}
