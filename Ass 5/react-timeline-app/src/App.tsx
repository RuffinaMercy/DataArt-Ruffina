import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './App.css'; 

interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  category?: string;
}

const timelineEvents: TimelineEvent[] = [
  { id: 1, year: 1989, title: 'World Wide Web Invented', description: 'Tim Berners-Lee, a British scientist, invented the World Wide Web (WWW) at CERN.', category: 'Technology' },
  { id: 2, year: 1995, title: 'JavaScript Created', description: 'Brendan Eich at Netscape created JavaScript in just 10 days.', category: 'Technology' },
  { id: 3, year: 2007, title: 'First iPhone Released', description: 'Apple Inc. released the first-generation iPhone, a revolutionary device.', category: 'Technology' },
  { id: 4, year: 2020, title: 'mRNA Vaccines Developed', description: 'Scientists developed mRNA vaccines at an unprecedented speed in response to the COVID-19 pandemic.', category: 'Science' },
];

function App() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>React Timeline</h1>
        <button onClick={toggleTheme} className="theme-switch">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      
      <div className="timeline-container">
        {timelineEvents.map(event => (
          <div 
            key={event.id} 
            className="event-marker" 
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-marker-dot"></div>
            <div>
              <div className="event-year">{event.year}</div>
              <h3 className="event-title">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>&times;</button>
            <h2>{selectedEvent.year}: {selectedEvent.title}</h2>
            <p style={{ color: '#888' }}>Category: {selectedEvent.category}</p>
            <p>{selectedEvent.description}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default App;