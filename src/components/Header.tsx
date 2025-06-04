
import { Heart } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border-b border-gradient-to-r from-red-500/20 via-pink-500/20 to-red-500/20 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="w-9 h-9 text-red-400 animate-pulse" />
              <div className="absolute inset-0 w-9 h-9 text-red-400/30 animate-ping" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent tracking-tight">
              RizzGPT
            </span>
          </div>
          <div className="text-sm text-gray-300 font-medium bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
            Seu Coach de Relacionamentos com IA
          </div>
        </div>
      </div>
    </header>
  );
};
