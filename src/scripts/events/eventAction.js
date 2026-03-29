import { createEventFormHtml, createEvent, fillEventForm, updateEvent } from "../create-event/create.events.js";
import { EVENTS_URL } from "../config.js";

export function initEventActions() {

  const toggleBtn = document.querySelector("#manage-events-btn");
  const formSection = document.querySelector("#create-event-section");

  toggleBtn.addEventListener("click", () => {
    if (formSection.hidden) {
      formSection.hidden = false;
      toggleBtn.textContent = "Dölj eventformulär";

      formSection.innerHTML = createEventFormHtml();

      const form = formSection.querySelector("#create-event-form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const eventData = Object.fromEntries(new FormData(form));

        await createEvent(eventData);

        window.dispatchEvent(new Event("eventCreated"));
        form.reset();
      });

    } else {
      formSection.hidden = true;
      toggleBtn.textContent = "Skapa Event";
      formSection.innerHTML = "";
    }
  });

  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("edit-event-btn")) return;

    const eventId = e.target.dataset.eventId;
    const event = await (await fetch(`${EVENTS_URL}/${eventId}`)).json();

    // Visa formuläret
    formSection.hidden = false;
    toggleBtn.textContent = "Dölj eventformulär";

    formSection.innerHTML = createEventFormHtml();

    const form = formSection.querySelector("#create-event-form");

    fillEventForm(form, event);

    form.dataset.editing = eventId;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedEvent = Object.fromEntries(new FormData(form));

    await updateEvent(eventId, updatedEvent);

    // Uppdatera listan
    window.dispatchEvent(new Event("eventCreated"));

    // Stäng formuläret
    formSection.hidden = true;
    toggleBtn.textContent = "Skapa Event";

    // Rensa formuläret
    form.reset();
    delete form.dataset.editing;
});
  });

  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("delete-event-btn")) return;

    const eventId = e.target.dataset.eventId;

    await fetch(`${EVENTS_URL}/${eventId}`, { method: "DELETE" });

    window.dispatchEvent(new Event("eventCreated"));
  });
}