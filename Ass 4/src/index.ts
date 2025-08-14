import { fetchEvents } from "./fetcher.js";
import { renderEvents } from "./renderer.js";
import { openModal } from "./modal.js";
import { EventData } from "./types.js";

(async () => {
  try {
    const events: EventData[] = await fetchEvents("./events.json");
    renderEvents(events);

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("open-modal")) {
        openModal(`Details for event ID: ${target.dataset.id}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
})();
