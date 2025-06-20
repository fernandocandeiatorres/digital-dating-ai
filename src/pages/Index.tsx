import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  MessageSquare,
  Sparkles,
  Target,
  Lightbulb,
  Loader2,
} from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const handleBackToHome = () => {
    setShowChat(false);
  };

  const handleAuthClick = () => {
    navigate("/auth");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto" />
          <p className="text-gray-300 text-lg">Carregando RizzGPT...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: MessageSquare,
      title: "💬 Criação de Mensagens",
      description: "Frases de abertura e respostas perfeitas",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "🎯 Dicas de Conversa",
      description: "Mantenha o papo fluindo naturalmente",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Sparkles,
      title: "✨ Aprimoramento do Carisma",
      description: "Aumente seu charme e carisma",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Lightbulb,
      title: "💡 Estratégia de Relacionamentos",
      description: "Construa conexões significativas",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-gray-900/5 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Header onAuthClick={handleAuthClick} />

      <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12 relative z-10">
        {user ? (
          // User is logged in - show chat or dashboard
          !showChat ? (
            <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12 animate-fade-in">
              <div className="space-y-6 md:space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <Heart className="w-16 h-16 md:w-20 md:h-20 text-red-400 animate-pulse" />
                    <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 text-red-400/30 animate-ping"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent tracking-tight">
                    RizzGPT
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                    Bem-vindo de volta, {user.email?.split("@")[0]}! Seu coach
                    de relacionamentos com IA está pronto para ajudar.
                  </p>
                </div>
              </div>

              <Card className="max-w-4xl mx-auto border-2 border-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl shadow-2xl mx-4">
                <CardContent className="p-6 md:p-10">
                  <div className="space-y-8 md:space-y-10">
                    <div className="text-center space-y-4">
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Receba Conselhos Especializados
                      </h2>
                      <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                          <div
                            key={index}
                            className="group relative p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
                          >
                            <div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            ></div>
                            <div className="relative space-y-3">
                              <div className="flex items-center space-x-3">
                                <Icon className="w-5 h-5 md:w-6 md:h-6 text-red-400 flex-shrink-0" />
                                <h3 className="font-bold text-red-400 text-base md:text-lg">
                                  {feature.title}
                                </h3>
                              </div>
                              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setShowChat(true)}
                      className="w-full bg-gradient-to-r from-red-600 via-pink-600 to-red-500 text-white font-bold py-4 md:py-5 px-6 md:px-10 rounded-2xl hover:from-red-700 hover:via-pink-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl text-base md:text-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative">
                        Comece Sua Jornada Amorosa 💕
                      </span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="animate-slide-up">
              <ChatInterface onBackToHome={handleBackToHome} />
            </div>
          )
        ) : (
          // User is not logged in - show original landing page
          <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12 animate-fade-in">
            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <Heart className="w-16 h-16 md:w-20 md:h-20 text-red-400 animate-pulse" />
                  <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 text-red-400/30 animate-ping"></div>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent tracking-tight">
                  RizzGPT
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  Seu coach de relacionamentos com IA para criar mensagens
                  perfeitas, respostas inteligentes e conversas irresistíveis.
                </p>
              </div>
            </div>

            <Card className="max-w-4xl mx-auto border-2 border-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl shadow-2xl mx-4">
              <CardContent className="p-6 md:p-10">
                <div className="space-y-8 md:space-y-10">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                      Receba Conselhos Especializados
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={index}
                          className="group relative p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
                        >
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          ></div>
                          <div className="relative space-y-3">
                            <div className="flex items-center space-x-3">
                              <Icon className="w-5 h-5 md:w-6 md:h-6 text-red-400 flex-shrink-0" />
                              <h3 className="font-bold text-red-400 text-base md:text-lg">
                                {feature.title}
                              </h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleAuthClick}
                    className="w-full bg-gradient-to-r from-red-600 via-pink-600 to-red-500 text-white font-bold py-4 md:py-5 px-6 md:px-10 rounded-2xl hover:from-red-700 hover:via-pink-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl text-base md:text-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative">
                      Comece Sua Jornada Amorosa 💕
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
