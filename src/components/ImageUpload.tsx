import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { Wallpaper } from '../types';

interface ImageUploadProps {
  onUpload: (wallpaper: Wallpaper) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setPreview(imageUrl);
        setFileName(file.name);

        const newWallpaper: Wallpaper = {
          id: `upload-${Date.now()}`,
          url: imageUrl,
          title: file.name.split('.').slice(0, -1).join('.') || 'Uploaded Image',
          category: 'User Uploads',
          author: 'You',
          dimensions: 'N/A',
        };
        onUpload(newWallpaper);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  const handleRemovePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-8 md:p-16 border border-ink/10 flex flex-col items-center text-center relative">
        <div
          {...getRootProps()}
          className={`w-full p-12 border-2 border-dashed rounded-3xl transition-all cursor-pointer
            ${isDragActive ? 'border-accent bg-accent/10' : 'border-ink/20 hover:border-ink/40 bg-ink/5'}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative w-full h-64 rounded-2xl overflow-hidden group">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleRemovePreview}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="w-12 h-12 text-ink/40 mb-4" />
              <p className="text-lg font-medium mb-2">Drag & drop your image here, or click to select</p>
              <p className="text-sm text-ink/60">Supports JPEG, PNG, GIF, WEBP (Max 10MB)</p>
            </div>
          )}
        </div>
        {fileName && <p className="mt-4 text-ink/70 font-medium">Uploaded: {fileName}</p>}
      </div>
    </div>
  );
};
