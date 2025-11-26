async function loadSpeakers() {
    const response = await fetch("speakers.json"); 
    const data = await response.json();
    renderSpeakers(data.speakers);
}

function renderSpeakers(speakers) {
    const container = document.getElementById("speaker-list");
    container.innerHTML = "";

    speakers.forEach(speaker => {
        const card = document.createElement("div");
        card.className = "speaker-card fade-in";

        card.innerHTML = `
            <h2>${speaker.name}</h2>
            <p><strong>Topic:</strong></p>
            <span class="speaker-topic">${speaker.topic}</span>

            <div class="speaker-details">
                <h3>Biography</h3>
                <p>${speaker.bio}</p>
            </div>
        `;

        // Expand details on click
        card.addEventListener("click", () => {
            const details = card.querySelector(".speaker-details");
            const visible = details.style.display === "block";
            details.style.display = visible ? "none" : "block";
        });

        container.appendChild(card);
    });
}

loadSpeakers();
