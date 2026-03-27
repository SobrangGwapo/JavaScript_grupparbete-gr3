import { EVENTS_URL } from '../../src/scripts/config.js';

const registerParticipant = async (eventId, participant) => {
  const response = await fetch(`${EVENTS_URL}/${eventId}`);
  const event = await response.json();
  event.participants.push(participant);

  await fetch(`${EVENTS_URL}/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });

  window.dispatchEvent(new Event('eventCreated'));
};

document.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('signup-btn')) return;

  const eventId = e.target.dataset.eventId;
  const participant = {
    firstName: prompt('Förnamn:'),
    lastName:  prompt('Efternamn:'),
    gender:    prompt('Kön:'),
    weight:    prompt('Vikt (kg):'),
    matches:   prompt('Antal matcher:'),
    club:      prompt('Klubb:'),
    phone:     prompt('Telefon:')
  };

  await registerParticipant(eventId, participant);
});
