import {
  createRegisterForm,
  registerParticipant,
  fillParticipantForm,
  updateParticipant,
} from "../register-person/register.js";

import { EVENTS_URL } from "../config.js";

export function initParticipantActions() {

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("signup-btn")) return;

  const eventId = e.target.dataset.eventId;
  const wrapper = e.target.closest(".event-wrapper");
  const section = wrapper.querySelector(".register-section");

  if (!section.hidden) {
    section.hidden = true;
    e.target.textContent = "Anmäl dig";
    return;
  }

  section.hidden = false;
  section.innerHTML = createRegisterForm(eventId);

  e.target.textContent = "Dölj formulär";

  const form = section.querySelector("#register-form");

  form.addEventListener("submit", async (e2) => {
    e2.preventDefault();

    const participant = Object.fromEntries(new FormData(form));
    await registerParticipant(eventId, participant);

    section.hidden = true;
    e.target.textContent = "Anmäl dig";
  });
});

  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("edit-participant-btn")) return;

    const eventId = e.target.dataset.eventId;
    const index = Number(e.target.dataset.participantIndex);

    const event = await (await fetch(`${EVENTS_URL}/${eventId}`)).json();

    const wrapper = e.target.closest(".event-wrapper");
    const section = wrapper.querySelector(".register-section");

    section.hidden = false;
    section.innerHTML = createRegisterForm(eventId);

    const form = section.querySelector("#register-form");

    fillParticipantForm(form, event.participants[index]);

    form.querySelector("button[type='submit']").innerHTML = `
      <span class="material-symbols-outlined">edit</span>
      Uppdatera deltagare
    `;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updated = Object.fromEntries(new FormData(form));

      await updateParticipant(eventId, index, updated);

      form.reset();
      section.hidden = true;
    });
  });

  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("delete-participant-btn")) return;

    const eventId = e.target.dataset.eventId;
    const index = Number(e.target.dataset.participantIndex);

    const event = await (await fetch(`${EVENTS_URL}/${eventId}`)).json();

    event.participants.splice(index, 1);

    await fetch(`${EVENTS_URL}/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    window.dispatchEvent(new Event("eventCreated"));
  });
}