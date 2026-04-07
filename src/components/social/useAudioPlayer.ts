import { useState, useEffect, useRef, useCallback } from "react";
import { musicRecs } from "./data";

export interface PlayerState {
  trackId: number | null;
  isPlaying: boolean;
  progress: number;      // 0–1
  currentTime: number;   // сек
  duration: number;      // сек
  volume: number;        // 0–1
}

export interface PlayerControls {
  play: (id: number) => void;
  pause: () => void;
  toggle: (id: number) => void;
  next: () => void;
  prev: () => void;
  seek: (ratio: number) => void;
  setVolume: (v: number) => void;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({
    trackId: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
  });

  // Создаём audio-элемент один раз
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setState(s => ({
        ...s,
        currentTime: audio.currentTime,
        progress: audio.duration ? audio.currentTime / audio.duration : 0,
      }));
    };
    const onDurationChange = () => {
      setState(s => ({ ...s, duration: audio.duration || 0 }));
    };
    const onEnded = () => {
      // Автопереключение на следующий
      setState(s => {
        const idx = musicRecs.findIndex(t => t.id === s.trackId);
        const next = musicRecs[(idx + 1) % musicRecs.length];
        audio.src = next.src;
        audio.play().catch(() => {});
        return { ...s, trackId: next.id, isPlaying: true, progress: 0, currentTime: 0 };
      });
    };
    const onPlay = () => setState(s => ({ ...s, isPlaying: true }));
    const onPause = () => setState(s => ({ ...s, isPlaying: false }));

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const play = useCallback((id: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = musicRecs.find(t => t.id === id);
    if (!track) return;

    setState(s => {
      if (s.trackId !== id) {
        audio.src = track.src;
        audio.currentTime = 0;
      }
      audio.play().catch(() => {});
      return { ...s, trackId: id, isPlaying: true };
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback((id: number) => {
    setState(s => {
      if (s.trackId === id && s.isPlaying) {
        audioRef.current?.pause();
      } else {
        play(id);
      }
      return s;
    });
  }, [play]);

  const next = useCallback(() => {
    setState(s => {
      const idx = musicRecs.findIndex(t => t.id === s.trackId);
      const nextTrack = musicRecs[(idx + 1) % musicRecs.length];
      play(nextTrack.id);
      return s;
    });
  }, [play]);

  const prev = useCallback(() => {
    setState(s => {
      const audio = audioRef.current;
      // Если больше 3 сек — перемотать в начало, иначе предыдущий трек
      if (audio && audio.currentTime > 3) {
        audio.currentTime = 0;
        return s;
      }
      const idx = musicRecs.findIndex(t => t.id === s.trackId);
      const prevTrack = musicRecs[(idx - 1 + musicRecs.length) % musicRecs.length];
      play(prevTrack.id);
      return s;
    });
  }, [play]);

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = ratio * audio.duration;
  }, []);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
    setState(s => ({ ...s, volume: v }));
  }, []);

  const controls: PlayerControls = { play, pause, toggle, next, prev, seek, setVolume };

  return { state, controls };
}

export function formatTime(sec: number): string {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
