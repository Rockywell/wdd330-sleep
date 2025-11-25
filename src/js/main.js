

document.getElementById("menu-btn").addEventListener("click", () => {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("show");
});


// ---- Dark Mode Toggle ---- //
const body = document.body;
const darkBtn = document.getElementById("dark-toggle");

darkBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    darkBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// ---- API-based Event Loading ---- //
const content = document.getElementById("dynamic-content");

// Example public API (placeholder):
const API_URL = "https://api.sampleapis.com/futurama/episodes";

async function loadEvents() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        // Use first 3 items to simulate "Featured Event", etc.
        const mapped = [
            { title: "Featured Event", text: data[0].title },
            { title: "Speakers", text: "Experts involved: " + data[1].writers },
            { title: "Schedule", text: "Air Date: " + data[2].originalAirDate }
        ];

        renderSections(mapped);
    }
    catch (err) {
        console.warn("API failed, loading local JSON...", err);
        loadLocalData();
    }
}

// Load from local JSON file if API fails
function loadLocalData() {
    fetch("data.json")
        .then(res => res.json())
        .then(data => renderSections(data.sections))
        .catch(err => console.error("Could not load local data", err));
}

// Render content with animation
function renderSections(sections) {
    content.innerHTML = "";

    sections.forEach((section, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-section";
        div.style.animationDelay = (index * 0.15) + "s";

        div.innerHTML = `
            <h2>${section.title}</h2>
            <p>${section.text}</p>
        `;

        content.appendChild(div);
    });
}

// Start loading events
loadEvents();
