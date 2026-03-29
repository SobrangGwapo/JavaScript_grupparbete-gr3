import { createEventWrapper } from "./renderEventWrapper.js";

export function displayEvents(events) {
  const container = document.querySelector("#events-container");
  container.innerHTML = "";

  events.forEach((event) => {
    container.appendChild(createEventWrapper(event));
  });
}