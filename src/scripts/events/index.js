import { loadEvents } from "./loadEvents.js";
import { displayEvents } from "./renderEvents.js";
import { initEventActions } from "./eventAction.js";
import { initParticipantActions } from "./participantActions.js";

window.addEventListener("DOMContentLoaded", async () => {
  initEventActions();
  initParticipantActions();

  const events = await loadEvents();
  displayEvents(events);
});

window.addEventListener("eventCreated", async () => {
  const events = await loadEvents();
  displayEvents(events);
});