
import { useState } from "react";
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-100">
      <Header />
      
      <div className="container mx-auto px-4 pt-8">
        {!showChat ? (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Heart className="w-16 h-16 text-red-500 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                RizzGPT
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your AI dating coach for crafting the perfect messages, witty responses, and irresistible conversation starters.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto border-2 border-red-200 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Get Expert Dating Advice
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-600">💬 Message Crafting</h3>
                      <p className="text-sm text-gray-600">Perfect opening lines and responses</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-600">🎯 Conversation Tips</h3>
                      <p className="text-sm text-gray-600">Keep the chat flowing naturally</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-600">✨ Rizz Enhancement</h3>
                      <p className="text-sm text-gray-600">Boost your charm and charisma</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-600">💡 Dating Strategy</h3>
                      <p className="text-sm text-gray-600">Build meaningful connections</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(true)}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Start Your Dating Journey 💕
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
