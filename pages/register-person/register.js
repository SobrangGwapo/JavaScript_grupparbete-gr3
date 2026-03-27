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
};