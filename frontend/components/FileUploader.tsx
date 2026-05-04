"use client";

import React, { useState } from "react";
import {
  getUploadUrl,
  uploadToS3,
  saveImages,
} from "@/services/imageService";

type FileItem = {
  file: File;
  preview?: string;
  isImage? : boolean;
};

const FileUploader = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: FileItem[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const isImage = file.type.startsWith("image/");

      newFiles.push({
        file,
        preview: isImage ? URL.createObjectURL(file) : undefined,
        isImage : isImage
      });
    });
    console.log("NEW FILES : ", newFiles)
    setFiles((prev) => [...newFiles, ...prev ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };


const uploadHandler = async () => {
  try {
    const uploadedUrls = await Promise.all(
      files.map(async (item) => {
        const { uploadUrl, fileUrl } = await getUploadUrl(item.file);

        console.log("UPLO URL : ", uploadUrl, fileUrl)

        await uploadToS3(uploadUrl, item.file);

        return fileUrl;
      })
    );

    await saveImages(uploadedUrls);

    console.log("All done!");
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="w-full p-4">
      {/* Upload Buttons */}
      <div className="flex gap-4 mb-4">
        {/* Upload Images */}
        <label className="cursor-pointer px-4 py-2 bg-transparent border border-black text-black rounded-lg">
          Upload Files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={uploadHandler}>
          Submit Images
        </label>
      </div>

      {/* Preview Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-2 relative shadow"
          >
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              X
            </button>

            {/* Image Preview */}
            {item.preview ? (
              <img
                src={item.preview}
                alt="preview"
                className="w-full aspect-[1/1] object-cover rounded"
              />
            ) : (
              <div className="h-32 flex items-center justify-center bg-gray-100 text-sm">
                📄 this not a image
              </div>
            )}

            {/* File Name */}
            <p className="text-xs mt-2 truncate">
              {item.file.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;