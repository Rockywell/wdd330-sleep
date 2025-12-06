const KEY = "YOUR_YOUTUBE_KEY";

export const yt = {
  trailer: async title => {
    const q = encodeURIComponent(`${title} official trailer`);
    const url = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&part=snippet&type=video&q=${q}`;
    const res = await fetch(url).then(r => r.json());
    return res.items?.[0]?.id?.videoId || null;
  }
};
