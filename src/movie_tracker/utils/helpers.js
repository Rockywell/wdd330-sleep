export function formatDate(ms) {
  const d = new Date(ms);
  return d.toLocaleDateString();
}

export function truncate(text, length = 120) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}
