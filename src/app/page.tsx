"use client";

import { useState, useRef } from "react";
import { Howl } from "howler";
import FileUploader from "@/components/FileUploader";
import SongList from "@/components/SongList";
import AudioPlayer from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";

interface AudioFile {
  id: string;
  name: string;
  file: File;
}

export default function MusicPlayer() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [currentSong, setCurrentSong] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [view, setView] = useState("list");
  const soundRef = useRef<Howl | null>(null);

  const playAudio = (song: AudioFile) => {
    if (soundRef.current) soundRef.current.stop();

    const audioUrl = URL.createObjectURL(song.file); 
    const sound = new Howl({
      src: [audioUrl],
      html5: true,
      onend: () => {
        playNext(); 
      },
    });

    sound.play();
    setCurrentSong(song);
    setIsPlaying(true);
    soundRef.current = sound;
  };

  const playNext = () => {
    const currentIndex = currentSong ? files.findIndex((file) => file.id === currentSong.id) : -1;
    if (currentIndex < files.length - 1) {
      playAudio(files[currentIndex + 1]); 
    } else {
      setIsPlaying(false); 
    }
  };

  const playPrevious = () => {
    const currentIndex = currentSong ? files.findIndex((file) => file.id === currentSong.id) : -1;
    if (currentIndex > 0) playAudio(files[currentIndex - 1]);
  };

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-6">
      <FileUploader setFiles={setFiles} files={files} />
      <Button className="my-3" variant="outline" onClick={() => setView(view === "list" ? "grid" : "list")}>Toggle View</Button>
      <SongList files={files} setFiles={setFiles} playAudio={playAudio} currentSong={currentSong} view={view} />
      {currentSong && (
        <AudioPlayer
          currentSong={currentSong}
          playPrevious={playPrevious}
          playNext={playNext}
          isPlaying={isPlaying}
          togglePlay={togglePlay} soundRef={soundRef}        />
      )}
    </div>
  );
}
