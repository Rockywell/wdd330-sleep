// Load the JSON file
async function loadEventData() {
    const response = await fetch("event.json");
    return await response.json();
}

// Generate event list
function renderEvents(data) {
    const events = data.events;
    const speakers = data.speakers;

    const container = document.getElementById("event-list");
    container.innerHTML = "";

    events.forEach(event => {
        // Get speaker info for each event
        const eventSpeakers = event.speakers.map(id => {
            return speakers.find(s => s.id === id);
        });

        // Create card
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.short}</p>

            <div class="tags">
                ${event.tags.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>

            <div class="event-details">
                <h3>Description</h3>
                <p>${event.description}</p>

                <h3>Speakers</h3>
                ${eventSpeakers
                    .map(s => `
                        <div class="speaker">
                            <strong>${s.name}</strong> — ${s.topic}<br>
                            <small>${s.bio}</small>
                        </div>
                    `)
                    .join("")}
            </div>
        `;

        // Toggle details on click
        card.addEventListener("click", () => {
            const details = card.querySelector(".event-details");
            const visible = details.style.display === "block";
            details.style.display = visible ? "none" : "block";
        });

        container.appendChild(card);
    });
}

// Initialize page
loadEventData().then(renderEvents);
