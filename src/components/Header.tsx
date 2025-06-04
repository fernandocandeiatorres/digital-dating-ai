
import { Heart } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-red-900/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              RizzGPT
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Seu Coach de Relacionamentos com IA
          </div>
        </div>
      </div>
    </header>
  );
};
