export function createEventWrapper(event) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("event-wrapper");

  const participantsHtml = event.participants?.length
    ? event.participants
        .map(
          (p, index) => `
        <li class="participant-row">
          <button class="edit-participant-btn material-symbols-outlined"
                  data-event-id="${event.id}"
                  data-participant-index="${index}">
            edit
          </button>

          <span class="participant-text">
            ${p.firstName} ${p.lastName}, ${p.gender}, ${p.weight} kg, 
            ${p.matches} matcher, ${p.club}, ${p.phone}
          </span>

          <button class="delete-participant-btn material-symbols-outlined"
                  data-event-id="${event.id}"
                  data-participant-index="${index}">
            delete
          </button>
        </li>
      `
        )
        .join("")
    : "<li>Inga anmälda ännu.</li>";

  wrapper.innerHTML = `
    <article class="event-card">

      <div class="event-header">
        <button class="edit-event-btn material-symbols-outlined" data-event-id="${event.id}">
          edit
        </button>

        <h3>${event.title}</h3>

        <button class="delete-event-btn material-symbols-outlined" data-event-id="${event.id}">
          delete
        </button>
      </div>

      <p>${event.description}</p>
      <p><strong>Start:</strong> ${event.start}</p>
      <p><strong>Slut:</strong> ${event.end}</p>
      <p><strong>Adress:</strong> ${event.address}</p>
      <p><strong>Kontakt:</strong> ${event.contact}</p>

      <button class="signup-btn" data-event-id="${event.id}">
        Anmäl dig
      </button>

      <h4>Anmälda deltagare</h4>
      <ul class="participants-list">${participantsHtml}</ul>

    </article>

    <section class="register-section" hidden></section>
  `;

  return wrapper;
}