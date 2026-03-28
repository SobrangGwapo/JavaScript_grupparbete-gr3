import { EVENTS_URL } from "../config.js";

export async function loadEvents() {
  try {
    const response = await fetch(EVENTS_URL);
    if (!response.ok) throw new Error("Kunde inte hämta events.");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}