import { EVENTS_URL } from '../../src/scripts/config.js';

const eventsContainer = document.querySelector('#events-container');
const pageStatus = document.querySelector('#page-status');

const refreshEvents = async () => {
  const events = await loadEvents();
  displayEvents(events);
};

window.addEventListener('eventCreated', refreshEvents);

const initApp = async () => {
  await refreshEvents();
};

const loadEvents = async () => {
  try {
    const response = await fetch(EVENTS_URL);

    if (!response.ok) {
      throw new Error('Kunde inte hämta events.');
    }

    return await response.json();
  } catch (error) {
    showStatus(error.message);
    console.error(error);
    return [];
  }
};

const displayEvents = (events) => {
  console.log('Alla events från API:', events);

  // Filtrera kommande events (startdatum idag eller senare)
  const upcomingEvents = events.filter(event => new Date(event.start) >= new Date().setHours(0, 0, 0, 0));

  console.log('Kommande events efter filtrering:', upcomingEvents);

  // Sortera efter startdatum (tidigast först)
  upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

  eventsContainer.innerHTML = '';

  if (upcomingEvents.length === 0) {
    eventsContainer.innerHTML = '<p>Det finns inga kommande event att visa.</p>';
    return;
  }

  upcomingEvents.forEach((event) => {
    const eventCard = createEventCard(event);
    eventsContainer.appendChild(eventCard);
  });
};

const createEventCard = (event) => {
  const article = document.createElement('article');
  article.classList.add('event-card');

  const participantsHtml = createParticipantsHtml(event.participants);

  article.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p><strong>Start:</strong> ${formatDate(event.start)}</p>
    <p><strong>Slut:</strong> ${formatDate(event.end)}</p>
    <p><strong>Adress:</strong> ${event.address}</p>
    <p><strong>Kontakt:</strong> ${event.contact}</p>

    <button type="button" class="signup-btn" data-event-id="${event.id}">
      Anmäl dig
    </button>

    <h4>Anmälda deltagare</h4>
    <ul class="participants-list">
      ${participantsHtml}
    </ul>
  `;

  return article;
};

const createParticipantsHtml = (participants = []) => {
  if (participants.length === 0) {
    return '<li>Inga anmälda ännu.</li>';
  }

  return participants
    .map(
      (participant) => `
        <li>
          ${participant.firstName} ${participant.lastName},
          ${participant.gender},
          ${participant.weight} kg,
          ${participant.matches} matcher,
          ${participant.club},
          ${participant.phone}
        </li>
      `
    )
    .join('');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString('sv-SE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const showStatus = (message) => {
  pageStatus.hidden = false;
  pageStatus.textContent = message;
};

window.addEventListener('DOMContentLoaded', initApp);