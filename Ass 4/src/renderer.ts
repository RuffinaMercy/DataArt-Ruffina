import { EventData } from "./types.js";

export function renderEvents(events: EventData[]): void {
  const container = document.getElementById("events");
  if (!container) return;

  container.innerHTML = events.map(e => `
    <div class="event">
      <h3>${e.title}</h3>
      <p>${e.date}</p>
      <button data-id="${e.id}" class="open-modal">Details</button>
    </div>
  `).join("");
}
