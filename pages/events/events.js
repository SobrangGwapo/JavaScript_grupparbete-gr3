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

  addSignupListeners();
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
          ${participant.gender === 'M' ? 'Man' : 'Kvinna'},
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

const addSignupListeners = () => {
  const signupButtons = document.querySelectorAll('.signup-btn');
  signupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.dataset.eventId;
      showSignupModal(eventId);
    });
  });
};

const showSignupModal = (eventId) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Anmäl dig till event</h3>
      <form id="signup-form">
        <label for="firstName">Förnamn:</label>
        <input type="text" id="firstName" required>
        <label for="lastName">Efternamn:</label>
        <input type="text" id="lastName" required>
        <label for="gender">Kön:</label>
        <select id="gender" required>
          <option value="">Välj kön</option>
          <option value="M">Man</option>
          <option value="W">Kvinna</option>
        </select>
        <label for="weight">Vikt (kg):</label>
        <input type="number" id="weight" required>
        <label for="matches">Matcher:</label>
        <input type="number" id="matches" required>
        <label for="club">Klubb:</label>
        <input type="text" id="club" required>
        <label for="phone">Telefonnummer:</label>
        <input type="text" id="phone" required>
        <button type="submit">Spara</button>
        <button type="button" id="cancel">Avbryt</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  const form = modal.querySelector('#signup-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const matches = document.getElementById('matches').value;
    const club = document.getElementById('club').value;
    const phone = document.getElementById('phone').value;
    const participant = {
      firstName,
      lastName,
      gender,
      weight: parseInt(weight),
      matches: parseInt(matches),
      club,
      phone
    };
    const events = await loadEvents();
    const event = events.find(e => e.id == eventId);
    if (event) {
      event.participants = event.participants || [];
      event.participants.push(participant);
      try {
        const response = await fetch(`${EVENTS_URL}/${eventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event)
        });
        if (response.ok) {
          modal.remove();
          refreshEvents();
        } else {
          showStatus('Kunde inte spara anmälan.');
        }
      } catch (error) {
        showStatus('Fel vid sparande.');
        console.error(error);
      }
    }
  });
  const cancelBtn = modal.querySelector('#cancel');
  cancelBtn.addEventListener('click', () => modal.remove());
};

window.addEventListener('DOMContentLoaded', initApp);