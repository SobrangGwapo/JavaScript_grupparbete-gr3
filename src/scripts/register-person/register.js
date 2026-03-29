import { EVENTS_URL } from "../config.js";

export const createRegisterForm = (eventId) => {
  return `
    <form id="register-form" data-event-id="${eventId}" class="register-form">

      <h3>Anmäl deltagare</h3>

      <label>Förnamn</label>
      <input type="text" name="firstName" required />

      <label>Efternamn</label>
      <input type="text" name="lastName" required />

      <label>Kön</label>
      <input type="text" name="gender" required />

      <label>Vikt (kg)</label>
      <input type="number" name="weight" required />

      <label>Antal matcher</label>
      <input type="number" name="matches" required />

      <label>Klubb</label>
      <input type="text" name="club" required />

      <label>Telefon</label>
      <input type="text" name="phone" required />

      <button type="submit" class="submit-btn">
        <span class="material-symbols-outlined">check_circle</span>
        Spara deltagare
      </button>

    </form>
  `;
};

export const registerParticipant = async (eventId, participant) => {
  const response = await fetch(`${EVENTS_URL}/${eventId}`);
  const event = await response.json();

  if (!event.participants) event.participants = [];
  event.participants.push(participant);

  await fetch(`${EVENTS_URL}/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  window.dispatchEvent(new Event("eventCreated"));
};

export function fillParticipantForm(form, participant) {
  form.querySelector('[name="firstName"]').value = participant.firstName;
  form.querySelector('[name="lastName"]').value = participant.lastName;
  form.querySelector('[name="gender"]').value = participant.gender;
  form.querySelector('[name="weight"]').value = participant.weight;
  form.querySelector('[name="matches"]').value = participant.matches;
  form.querySelector('[name="club"]').value = participant.club;
  form.querySelector('[name="phone"]').value = participant.phone;
}

export async function updateParticipant(eventId, index, updatedParticipant) {
  const response = await fetch(`${EVENTS_URL}/${eventId}`);
  const event = await response.json();

  event.participants[index] = updatedParticipant;

  await fetch(`${EVENTS_URL}/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  window.dispatchEvent(new Event("eventCreated"));
}