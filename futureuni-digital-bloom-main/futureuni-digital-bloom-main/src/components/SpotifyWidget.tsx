import { useState } from 'react';
import { X } from 'lucide-react';

const SpotifyWidget = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const playlistId = '3fbvXzRCr4mHUbLBpaSBvZ';

  return (
    <div className="fixed bottom-6 right-4 z-[9999] sm:bottom-4">
      <div
        onClick={() => window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank')}
        style={{
          width: window.innerWidth < 640 ? 200 : 260,
          height: window.innerWidth < 640 ? 56 : 64,
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--primary) / 0.4)',
          boxShadow: '0 4px 20px rgba(108,99,225,0.3)',
        }}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-1 right-1.5 z-10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>

        <div className="flex items-center h-full px-2 gap-2">
          {/* Pulsing bars */}
          <div className="flex items-end gap-[2px] h-3 shrink-0">
            {[0, 0.2, 0.4].map((d, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-primary"
                style={{
                  animation: `pulse-bar 0.8s ease-in-out ${d}s infinite`,
                  height: '100%',
                }}
              />
            ))}
          </div>

          {/* Text info */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="flex items-center gap-1 text-[9px] font-semibold text-primary leading-none mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              NOW PLAYING
            </span>
            <span className="text-[11px] font-bold text-foreground truncate leading-tight">FutureUni Playlist</span>
            <span className="text-[10px] text-muted-foreground truncate leading-tight">Spotify</span>
          </div>
        </div>

        {/* Hidden iframe for playback */}
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="0"
          height="0"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="absolute opacity-0 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default SpotifyWidget;
