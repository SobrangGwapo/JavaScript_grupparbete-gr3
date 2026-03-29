import { test, expect } from "vitest";
import { loadEvents } from "../scripts/events/loadEvents.js";

// Mocka fetch
global.fetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: "Testevent" }])
  });

test("loadEvents returns an array of events", async () => {
  const events = await loadEvents();

  expect(Array.isArray(events)).toBe(true);
  expect(events.length).toBe(1);
  expect(events[0].title).toBe("Testevent");
});