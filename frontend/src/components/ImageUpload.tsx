import { useRef, useState } from "react";

interface ImageUploadProps {
  onImageSelected: (file: File, previewUrl: string) => void;
}

export function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG or PNG).");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <p className="text-gray-600">
        Click to upload, or drag and drop an image here
      </p>
      <p className="text-sm text-gray-400 mt-1">JPEG or PNG, up to 10MB</p>
    </div>
  );
}
