import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

function Media() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`,
        );
        const data = await response.json();
        setVideos(data.items || []);
      } catch {
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5D87A1]">
        Watch & Listen
      </p>
      <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Media</h1>

      {loading && <p className="mt-12 text-slate-600">Loading videos...</p>}
      {error && <p className="mt-12 text-red-500">{error}</p>}

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="rounded-3xl overflow-hidden shadow-lg bg-white"
          >
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="p-5">
              <h3 className="font-semibold text-sm leading-6 line-clamp-2">
                {video.snippet.title.replace(/&amp;/g, "&")}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://www.youtube.com/@christtemplegiphcinc.8841"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#FF0000] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
        >
          View All on YouTube
        </a>
      </div>
    </div>
  );
}

export default Media;
