import { EVENTS_URL } from "../config.js";

// ---------------------------------------------------
// FORMULÄR-HTML (moderniserad)
// ---------------------------------------------------
export const createEventFormHtml = () => {
  return `
    <form id="create-event-form" class="event-form">

      <label for="title">Titel</label>
      <input type="text" id="title" name="title" required />

      <label for="description">Beskrivning</label>
      <textarea id="description" name="description" required></textarea>

      <label for="start">Startdatum och tid</label>
      <input type="datetime-local" id="start" name="start" required />

      <label for="end">Slutdatum och tid</label>
      <input type="datetime-local" id="end" name="end" required />

      <label for="address">Adress</label>
      <input type="text" id="address" name="address" required />

      <label for="contact">Kontakt</label>
      <input type="text" id="contact" name="contact" required />

      <button type="submit" class="submit-btn">
        <span class="material-symbols-outlined">check_circle</span>
        Spara event
      </button>

    </form>
  `;
};

// ---------------------------------------------------
// SKAPA EVENT
// ---------------------------------------------------
export const createEvent = async (eventData) => {
  const response = await fetch(EVENTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) throw new Error("Kunde inte skapa event.");

  window.dispatchEvent(new Event("eventCreated"));
};

// ---------------------------------------------------
// FYLL FORMULÄR VID REDIGERING
// ---------------------------------------------------
export function fillEventForm(form, event) {
  form.querySelector('[name="title"]').value = event.title;
  form.querySelector('[name="description"]').value = event.description;

  // Säkerställ att datetime-local får korrekt format
  form.querySelector('[name="start"]').value = event.start;
  form.querySelector('[name="end"]').value = event.end;

  form.querySelector('[name="address"]').value = event.address;
  form.querySelector('[name="contact"]').value = event.contact;
}

// ---------------------------------------------------
// UPPDATERA EVENT
// ---------------------------------------------------
export async function updateEvent(eventId, updatedEvent) {
  const response = await fetch(`${EVENTS_URL}/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent),
  });

  if (!response.ok) throw new Error("Kunde inte uppdatera event.");
}