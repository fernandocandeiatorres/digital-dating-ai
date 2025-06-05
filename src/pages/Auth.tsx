import { AuthComponent } from "@/components/Auth";
import { Header } from "@/components/Header";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-gray-900/5 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Header onAuthClick={handleBackToHome} />

      <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12 relative z-10">
        <div className="max-w-md mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Heart className="w-16 h-16 md:w-20 md:h-20 text-red-400 animate-pulse" />
                <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 text-red-400/30 animate-ping"></div>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent tracking-tight">
                RizzGPT
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Seu coach de relacionamentos com IA para criar mensagens
                perfeitas e conversas irresistíveis.
              </p>
            </div>
          </div>

          <AuthComponent />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
