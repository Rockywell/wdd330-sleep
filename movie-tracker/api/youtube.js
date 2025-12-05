const YT_KEY = "YOUR_YOUTUBE_KEY";

export async function fetchTrailer(title) {
  const query = encodeURIComponent(`${title} official trailer`);
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_KEY}&part=snippet&type=video&q=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items?.[0]?.id?.videoId || null;
}
