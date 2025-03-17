import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  setFiles: (files: Array<{ id: string; name: string; file: File }>) => void;
  files: Array<{ id: string; name: string; file: File }>;
}

export default function FileUploader({ setFiles, files }: FileUploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "audio/*": [] },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: URL.createObjectURL(file),
        name: file.name,
        file,
      }));
      setFiles([...files, ...newFiles]);
    },
  });

  return (
    <div {...getRootProps()} className="border-dashed border-2 p-6 text-center cursor-pointer rounded-lg hover:bg-gray-100">
      <input {...getInputProps()} />
      <p>Drag & drop audio files here, or click to select files</p>
    </div>
  );
}
