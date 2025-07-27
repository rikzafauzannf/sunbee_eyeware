"use client";

import { uploadProductImage } from "@/lib/product_actions";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AspectRatio } from "./ui/aspect-ratio";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));

      setUploading(true);
      try {
        const url = await uploadProductImage(file);
        onUpload(url);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return alert(err.message);
        }
        return alert("An unexpected error occurred");
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <AspectRatio ratio={16 / 9}>
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </AspectRatio>
      ) : (
        <p>
          {uploading
            ? "Uploading..."
            : "Drag & drop an image here or click to select"}
        </p>
      )}
    </div>
  );
}
