import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { Howl } from "howler";

interface AudioPlayerProps {
  currentSong: { name: string } | null;
  playPrevious: () => void;
  playNext: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  soundRef: React.RefObject<Howl | null>;
}

export default function AudioPlayer({
  currentSong,
  playPrevious,
  playNext,
  isPlaying,
  togglePlay,
  soundRef,
}: AudioPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!soundRef.current) return;

    const updateProgress = () => {
      const seek = soundRef.current?.seek() as number || 0;
      setProgress(seek);
    };

    const interval = setInterval(updateProgress, 500);
    return () => clearInterval(interval);
  }, [soundRef]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.on("load", () => {
        setDuration(soundRef.current?.duration() || 0);
      });

      soundRef.current.on("end", () => {
        playNext();
      });
    }
  }, [soundRef, playNext]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (soundRef.current) {
      soundRef.current.seek(newTime);
      setProgress(newTime);
    }
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex items-center justify-between">
      <span>{currentSong ? currentSong.name : "No song selected"}</span>

      <div className="flex-grow mx-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="text-xs flex justify-between">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div>
        <Button onClick={playPrevious}>
          <SkipBack />
        </Button>
        <Button onClick={togglePlay}>{isPlaying ? <Pause /> : <Play />}</Button>
        <Button onClick={playNext}>
          <SkipForward />
        </Button>
      </div>
    </div>
  );
}


