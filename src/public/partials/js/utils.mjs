// Fetches the HTML template file and returns it as text
export async function loadTemplate(path) {
  const response = await fetch(path)
  return await response.text()
}

// Renders a single template into a parent element
export function renderWithTemplate(template, parentElement, data = {}, callback) {
  parentElement.innerHTML = template

  if (callback) {
    callback(parentElement, data)
  }
}

// Loads both header and footer templates and injects them into placeholders
export async function loadHeaderFooter() {
  // Load template files
  const headerTemplate = await loadTemplate("/partials/header.html")
  const footerTemplate = await loadTemplate("/partials/footer.html")

  // Find the placeholder elements in the DOM
  const headerElement = document.getElementById("header-placeholder")
  const footerElement = document.getElementById("footer-placeholder")

  // Render templates
  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)
}
