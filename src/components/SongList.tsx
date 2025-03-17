import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { IoSave } from "react-icons/io5";

interface AudioFile {
  id: string;
  name: string;
  file: File;
}

export default function SongList({
  files,
  setFiles,
  playAudio,
  currentSong,
  view,
}: {
  files: AudioFile[];
  setFiles: React.Dispatch<React.SetStateAction<AudioFile[]>>;
  playAudio: (file: AudioFile) => void;
  currentSong: AudioFile | null;
  view: string;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const renameFile = (id: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, name: newName || file.name } : file
      )
    );
    setEditingId(null);
    setNewName("");
  };

  return (
    <div>
      {view === "list" ? (
        <ul>
          {files.map((file) => (
            <li
              key={file.id}
              onClick={() => playAudio(file)}
              className={`flex justify-between items-center p-2 cursor-pointer ${
                currentSong?.id === file.id ? "text-green-500" : ""
              }`}
            >
              {editingId === file.id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border p-1"
                />
              ) : (
                <span>{file.name}</span>
              )}

              <div>
                {editingId === file.id ? (
                  <Button variant="outline" onClick={() => renameFile(file.id)}>
                    <IoSave />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(file.id)}
                  >
                    <CiEdit />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {files.map((file) => (
            <Card
              key={file.id}
              className={`p-4 cursor-pointer ${
                currentSong?.id === file.id ? "text-green-500" : ""
              }`}
              onClick={() => playAudio(file)}
            >
              {editingId === file.id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border p-1"
                />
              ) : (
                <p>{file.name}</p>
              )}

              <div className="mt-4 flex flex-col items-end">
                {editingId === file.id ? (
                  <Button variant="outline" onClick={() => renameFile(file.id)}>
                    <IoSave />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(file.id)}
                  >
                    <CiEdit />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
