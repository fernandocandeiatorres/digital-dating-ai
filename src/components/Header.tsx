
import { Heart } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-red-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              RizzGPT
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Your AI Dating Coach
          </div>
        </div>
      </div>
    </header>
  );
};
