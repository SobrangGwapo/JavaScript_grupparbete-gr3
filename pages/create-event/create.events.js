import { EVENTS_URL } from '../../src/scripts/config.js';

const status = document.querySelector('#page-status');

const showStatus = (message, isError = false) => {
  if (!status) return;
  status.hidden = false;
  status.textContent = message;
  status.style.color = isError ? 'darkred' : 'darkgreen';
};

const createFormHtml = () => {
  return `
    <form id="create-event-form">
      <label for="title">Titel:</label>
      <input type="text" id="title" name="title" required />

      <label for="description">Beskrivning:</label>
      <textarea id="description" name="description" required></textarea>

      <label for="start">Startdatum och tid:</label>
      <input type="datetime-local" id="start" name="start" required />

      <label for="end">Slutdatum och tid:</label>
      <input type="datetime-local" id="end" name="end" required />

      <label for="address">Adress:</label>
      <input type="text" id="address" name="address" required />

      <label for="contact">Kontakt:</label>
      <input type="text" id="contact" name="contact" required />

      <button type="submit">Skapa event</button>
    </form>
  `;
};

const initCreateEvent = () => {
  const toggleBtn = document.querySelector('#manage-events-btn');
  const formSection = document.querySelector('#create-event-section');

  if (!toggleBtn || !formSection) {
    console.warn('Det går inte att hitta knapp eller formulärcontainer.');
    return;
  }

  // Rendera formuläret en gång i container
  formSection.innerHTML = createFormHtml();
  const form = document.querySelector('#create-event-form');

  if (!form) {
    console.error('Formuläret kunde inte skapas.');
    return;
  }

  toggleBtn.addEventListener('click', () => {
    formSection.hidden = !formSection.hidden;
    toggleBtn.textContent = formSection.hidden ? 'Visa/skapa eventformulär' : 'Dölj eventformulär';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const eventData = {
      title: formData.get('title'),
      description: formData.get('description'),
      start: formData.get('start'),
      end: formData.get('end'),
      address: formData.get('address'),
      contact: formData.get('contact'),
      participants: []
    };

    try {
      const response = await fetch(EVENTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Kunde inte skapa event. Kontrollera servern.');
      }

      showStatus('Event skapat framgångsrikt!');
      form.reset();
      formSection.hidden = true;
      toggleBtn.textContent = 'Visa/skapa eventformulär';
      window.dispatchEvent(new Event('eventCreated'));
    } catch (error) {
      console.error('Fel vid skapande av event:', error);
      showStatus('Ett fel uppstod: ' + error.message, true);
    }
  });
};

window.addEventListener('DOMContentLoaded', initCreateEvent);
