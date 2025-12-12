import { useEffect, useRef, useState } from "react";
import { X, Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  data: ArrayBuffer;
  onClose: () => void;
}

export function AudioPlayer({ data, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const [duration, setDuration] = useState(0); // total audio length
  const [currentTime, setCurrentTime] = useState(0); // current position
  const [isPlaying, setIsPlaying] = useState(false); // play/pause state

  useEffect(() => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    urlRef.current = url;

    const audio = new Audio(url);
    audioRef.current = audio;

    const updateProgress = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      URL.revokeObjectURL(url);
      audioRef.current = null;
      urlRef.current = null;
    };
  }, [data]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    if (!time || Number.isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="bg-gray-200 rounded-xl p-4 flex flex-col gap-4 my-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">پخش فایل صوتی</p>
        <button onClick={onClose} aria-label="close">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="p-2 rounded-lg hover:bg-white transition"
          aria-label="toggle-play"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="flex flex-col w-full">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-primary-700 cursor-pointer"
          />

          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
