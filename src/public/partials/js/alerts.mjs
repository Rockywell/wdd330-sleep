export async function loadAlerts() {
  const container = document.querySelector("#alert-container");

  try {
    const response = await fetch("/data/alerts.json");
    const alerts = await response.json();

    alerts.forEach(alert => {
      const div = document.createElement("div");
      div.classList.add("alert-message");
      div.textContent = alert.message;
      div.style.background = alert.backgroundColor;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading alerts:", error);
  }
}
