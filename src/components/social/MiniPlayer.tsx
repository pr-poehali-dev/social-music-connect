import Icon from "@/components/ui/icon";
import { musicRecs } from "./data";
import { PlayerState, PlayerControls, formatTime } from "./useAudioPlayer";

interface MiniPlayerProps {
  state: PlayerState;
  controls: PlayerControls;
}

export function MiniPlayer({ state, controls }: MiniPlayerProps) {
  if (!state.trackId) return null;

  const track = musicRecs.find(t => t.id === state.trackId);
  if (!track) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[420px] max-w-[calc(100vw-2rem)]">
      <div className="glass-bright rounded-2xl border border-neon-purple/20 shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(155,89,240,0.25), 0 8px 32px rgba(0,0,0,0.6)" }}>

        {/* Прогресс-бар сверху */}
        <div
          className="h-0.5 gradient-bg transition-all duration-300"
          style={{ width: `${state.progress * 100}%` }}
        />

        <div className="px-4 py-3 flex items-center gap-3">
          {/* Обложка */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
            {state.isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex gap-0.5 items-end h-3">
                  {[2, 3, 1, 3].map((h, i) => (
                    <div key={i} className="w-0.5 gradient-bg rounded-full animate-pulse"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Название */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{track.title}</p>
            <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
          </div>

          {/* Время */}
          <span className="text-[10px] text-white/30 flex-shrink-0 tabular-nums">
            {formatTime(state.currentTime)}
          </span>

          {/* Управление */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={controls.prev} className="p-1.5 text-white/40 hover:text-white transition-colors">
              <Icon name="SkipBack" size={14} />
            </button>
            <button
              onClick={() => state.isPlaying ? controls.pause() : controls.play(state.trackId!)}
              className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              style={{ boxShadow: "0 0 12px rgba(155,89,240,0.5)" }}
            >
              <Icon name={state.isPlaying ? "Pause" : "Play"} size={14} className="text-white" />
            </button>
            <button onClick={controls.next} className="p-1.5 text-white/40 hover:text-white transition-colors">
              <Icon name="SkipForward" size={14} />
            </button>
          </div>

          {/* Громкость */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => controls.setVolume(state.volume === 0 ? 0.8 : 0)}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <Icon name={state.volume === 0 ? "VolumeX" : "Volume2"} size={13} />
            </button>
            <input
              type="range"
              min={0} max={1} step={0.05}
              value={state.volume}
              onChange={e => controls.setVolume(parseFloat(e.target.value))}
              className="w-14 h-1 accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Кликабельный прогресс */}
        <div
          className="h-1 bg-white/5 cursor-pointer mx-4 mb-2 rounded-full overflow-hidden"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            controls.seek((e.clientX - rect.left) / rect.width);
          }}
        >
          <div
            className="h-full gradient-bg rounded-full transition-none"
            style={{ width: `${state.progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
