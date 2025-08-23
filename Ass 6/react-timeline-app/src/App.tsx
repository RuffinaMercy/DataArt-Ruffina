// src/App.tsx
import { useState, useRef, useEffect } from "react";

interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  { id: 1, year: 1990, title: "Event 1", description: "Details of Event 1" },
  { id: 2, year: 2000, title: "Event 2", description: "Details of Event 2" },
  { id: 3, year: 2010, title: "Event 3", description: "Details of Event 3" },
];

function App() {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Trap focus in modal
  useEffect(() => {
    if (!modalOpen || !modalRef.current) return;

    const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);

    firstEl?.focus();

    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [modalOpen]);

  const openModal = (event: TimelineEvent, button: HTMLButtonElement) => {
    setActiveEvent(event);
    setModalOpen(true);
    triggerButtonRef.current = button;
  };

  const closeModal = () => {
    setModalOpen(false);
    if (triggerButtonRef.current) triggerButtonRef.current.focus();
  };

  const handleKeyNavigation = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      document
        .getElementById(`event-btn-${index + 1}`)
        ?.focus();
    }
    if (e.key === "ArrowLeft") {
      document
        .getElementById(`event-btn-${index - 1}`)
        ?.focus();
    }
  };

  return (
    <div>
      <h1>Accessible Timeline</h1>
      <div role="tablist" aria-label="Timeline of Events">
        {timelineEvents.map((event, idx) => (
          <button
            key={event.id}
            id={`event-btn-${idx}`}
            role="tab"
            aria-current={activeEvent?.id === event.id ? "true" : undefined}
            onClick={(e) => openModal(event, e.currentTarget)}
            onKeyDown={(e) => handleKeyNavigation(e, idx)}
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              border:
                activeEvent?.id === event.id
                  ? "2px solid blue"
                  : "1px solid gray",
              background:
                activeEvent?.id === event.id ? "#e6f0ff" : "white",
            }}
          >
            {event.year}
          </button>
        ))}
      </div>

      {modalOpen && (
        <dialog
          ref={modalRef}
          open
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          style={{
            padding: "2rem",
            border: "2px solid #333",
            borderRadius: "8px",
          }}
        >
          <h2 id="modal-title">{activeEvent?.title}</h2>
          <p id="modal-desc">{activeEvent?.description}</p>
          <button onClick={closeModal} aria-label="Close modal">
            Close
          </button>
        </dialog>
      )}
    </div>
  );
}

export default App;
