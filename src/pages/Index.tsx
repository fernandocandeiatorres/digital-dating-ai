
import { useState } from "react";
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      
      <div className="container mx-auto px-4 pt-8">
        {!showChat ? (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Heart className="w-16 h-16 text-red-400 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                RizzGPT
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Seu coach de relacionamentos com IA para criar mensagens perfeitas, respostas inteligentes e conversas irresistíveis.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto border-2 border-red-900/30 bg-gray-800/50 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-100">
                    Receba Conselhos Especializados
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-400">💬 Criação de Mensagens</h3>
                      <p className="text-sm text-gray-400">Frases de abertura e respostas perfeitas</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-400">🎯 Dicas de Conversa</h3>
                      <p className="text-sm text-gray-400">Mantenha o papo fluindo naturalmente</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-400">✨ Aprimoramento do Carisma</h3>
                      <p className="text-sm text-gray-400">Aumente seu charme e carisma</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-400">💡 Estratégia de Relacionamentos</h3>
                      <p className="text-sm text-gray-400">Construa conexões significativas</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Comece Sua Jornada Amorosa 💕
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
};

export default Index;
