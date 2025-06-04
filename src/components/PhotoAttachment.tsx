
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Image, Upload } from "lucide-react";

interface PhotoAttachmentProps {
  onPhotoSelect: (file: File) => void;
  onPhotoRemove: () => void;
  selectedPhoto: File | null;
}

export const PhotoAttachment = ({ onPhotoSelect, onPhotoRemove, selectedPhoto }: PhotoAttachmentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  if (selectedPhoto) {
    return (
      <Card className="relative inline-block bg-gray-800/50 border border-red-900/30 rounded-xl overflow-hidden">
        <img 
          src={URL.createObjectURL(selectedPhoto)} 
          alt="Foto anexada" 
          className="w-24 h-24 object-cover"
        />
        <Button
          onClick={onPhotoRemove}
          size="icon"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
        >
          <X className="w-3 h-3" />
        </Button>
      </Card>
    );
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative w-12 h-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300
          ${dragOver 
            ? 'border-red-400 bg-red-400/10 scale-105' 
            : 'border-gray-600 hover:border-red-400/50 hover:bg-red-400/5'
          }
          flex items-center justify-center group
        `}
      >
        <Image className={`w-5 h-5 transition-colors duration-300 ${dragOver ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400'}`} />
        
        {dragOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-400/10 rounded-xl">
            <Upload className="w-4 h-4 text-red-400 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
};
