import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { IoSave } from "react-icons/io5";

import image1 from "../../public/namroud.jpg";

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
              className={`flex justify-between items-center border-1 rounded-lg my-2 shadow-lg hover:shadow-xl  p-2 cursor-pointer ${
                currentSong?.id === file.id ? "text-green-500" : ""
              }`}
            >
              <img
                src={image1.src}
                alt={file.name}
                className=" h-15 rounded-lg"
              />
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
        <div className="grid grid-cols-3 gap-4 my-2 ">
          {files.map((file) => (
            <Card
              key={file.id}
              className={`p-4 cursor-pointer shadow-lg hover:shadow-gray-400 ${
                currentSong?.id === file.id ? "text-green-500" : ""
              }`}
              onClick={() => playAudio(file)}
            >
              <img
                src={image1.src}
                alt={file.name}
                className="w-full h-32 object-cover mb-2 rounded-lg "
              />
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

              <div className="mb-2 flex flex-col items-center">
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
