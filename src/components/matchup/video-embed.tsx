interface VideoEmbedProps {
  url: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function VideoEmbed({ url }: VideoEmbedProps) {
  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden border border-[var(--border)]">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Video guide"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors text-sm text-[var(--primary)] underline"
    >
      {url}
    </a>
  );
}
