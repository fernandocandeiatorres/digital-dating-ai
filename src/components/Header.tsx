import { Heart, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onAuthClick?: () => void;
}

export const Header = ({ onAuthClick }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

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

          {/* Authentication section */}
          {user ? (
            // User logged in - show profile dropdown
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-sm text-gray-300 font-medium bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                Seu Coach de Relacionamentos com IA
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-white hover:bg-white/10 rounded-full px-3 py-2 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {user.email?.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-gray-800 border-gray-700 text-white"
                >
                  <DropdownMenuItem
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
                  >
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 focus:bg-gray-700 text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // User not logged in - show login/signup buttons
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block text-sm text-gray-300 font-medium bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                Seu Coach de Relacionamentos com IA
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={onAuthClick}
                  variant="ghost"
                  className="flex items-center space-x-2 text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Entrar</span>
                </Button>

                <Button
                  onClick={onAuthClick}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg px-4 py-2 transition-all duration-300 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Cadastre-se</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
