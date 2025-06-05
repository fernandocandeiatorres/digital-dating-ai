import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageBubble } from "@/components/MessageBubble";
import { PhotoAttachment } from "@/components/PhotoAttachment";
import { Heart, Send, Sparkles, ArrowLeft, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  photo?: File;
}

interface ChatInterfaceProps {
  onBackToHome: () => void;
}

export const ChatInterface = ({ onBackToHome }: ChatInterfaceProps) => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou seu coach de relacionamentos com IA. Precisa de ajuda com frases de abertura, manter conversas interessantes, ou quer algumas dicas de carisma? Também posso analisar fotos para dar conselhos sobre seu perfil! Estou aqui para ajudar! Qual é sua situação amorosa?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (
    userMessage: string,
    hasPhoto: boolean
  ): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (hasPhoto) {
      return "Ótima foto! 📸 Com base na imagem, posso te dar algumas dicas:\n\n✨ Sua expressão está natural - isso é perfeito!\n✨ O ângulo da foto valoriza bem seu rosto\n✨ Para o perfil, consider adicionar mais uma foto sorrindo\n✨ Boa iluminação sempre ajuda a destacar seus melhores traços\n\nQuer que eu analise mais alguma coisa específica sobre a foto ou tem alguma dúvida sobre como usar ela no seu perfil?";
    }

    if (
      lowerMessage.includes("abertura") ||
      lowerMessage.includes("primeira mensagem") ||
      lowerMessage.includes("começar")
    ) {
      return "Ótima pergunta! Aqui estão algumas frases de abertura infalíveis:\n\n💫 'Reparei [algo do perfil dela] - me conta mais sobre isso!'\n💫 'Sua [foto específica/interesse] chamou minha atenção. Qual é a história por trás?'\n💫 'Preciso perguntar - [pergunta genuína sobre os interesses dela]'\n\nO segredo é ser genuíno e mostrar que você realmente olhou o perfil! Que tipo de vibe você quer passar?";
    }

    if (
      lowerMessage.includes("carisma") ||
      lowerMessage.includes("charme") ||
      lowerMessage.includes("rizz")
    ) {
      return "Vamos elevar seu carisma! 🔥\n\n✨ Seja confiante, mas não arrogante\n✨ Faça perguntas envolventes que mostrem interesse genuíno\n✨ Use humor que combine com a energia dela\n✨ Elogie algo específico, não apenas 'você é linda'\n✨ Mostre sua personalidade - seja autenticamente você!\n\nLembre-se: O melhor carisma é demonstrar interesse genuíno em conhecê-la. Como é sua personalidade natural?";
    }

    if (
      lowerMessage.includes("conversa") ||
      lowerMessage.includes("papo") ||
      lowerMessage.includes("manter") ||
      lowerMessage.includes("continuar")
    ) {
      return "Manter conversas fluindo é uma arte! 🎨\n\n🌟 Faça perguntas abertas (evite sim/não)\n🌟 Compartilhe histórias, não apenas fatos\n🌟 Encontre interesses em comum e aprofunde\n🌟 Use a técnica do 'gancho' - aproveite detalhes que ela menciona\n🌟 Seja vulnerável e autêntico\n\nExemplo: Em vez de 'Como foi seu dia?' tente 'Qual foi o momento mais legal do seu dia?'\n\nCom que tipo de conversa você costuma ter dificuldade?";
    }

    if (
      lowerMessage.includes("ajuda") ||
      lowerMessage.includes("conselho") ||
      lowerMessage.includes("dica")
    ) {
      return "Estou aqui para ajudar! 💕 Posso te auxiliar com:\n\n💬 Criação de mensagens perfeitas\n🎯 Tópicos e iniciadores de conversa\n✨ Desenvolvimento de confiança e charme\n💡 Interpretação de sinais e pistas\n🔥 Criação do seu estilo único de relacionamento\n📸 Análise de fotos para perfis\n\nSó me conte qual situação específica você está enfrentando, e eu te darei conselhos personalizados!";
    }

    // Respostas padrão para conselhos gerais de relacionamento
    const responses = [
      "Essa é uma ótima pergunta! A chave para o sucesso nos relacionamentos é autenticidade misturada com confiança. Me conte mais sobre sua situação específica para eu poder dar conselhos direcionados! 💪",
      "Adorei que você está sendo proativo com sua vida amorosa! 🌟 As melhores conexões acontecem quando você é genuíno. Qual é seu maior desafio no momento?",
      "Cada situação de relacionamento é única! 💫 Para te dar os melhores conselhos, você poderia compartilhar mais detalhes sobre o que está vivenciando?",
      "Relacionamentos podem ser complicados, mas você consegue! 🔥 Me diga em qual área específica você gostaria de trabalhar e eu vou te ajudar a melhorar seu jogo!",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedPhoto) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue || "📸 Foto anexada para análise",
      isUser: true,
      timestamp: new Date(),
      photo: selectedPhoto || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    const hasPhoto = !!selectedPhoto;
    setSelectedPhoto(null);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue, hasPhoto),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePhotoSelect = (file: File) => {
    setSelectedPhoto(file);
    toast({
      title: "Foto anexada!",
      description:
        "Sua foto foi anexada com sucesso. Envie sua mensagem para que eu possa analisá-la.",
    });
  };

  const handlePhotoRemove = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-[85vh]">
      <Card className="flex-1 flex flex-col border-2 border-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-red-600 via-pink-600 to-red-500 text-white rounded-t-xl relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 animate-pulse"></div>
          <CardTitle className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="w-6 h-6 md:w-7 md:h-7" />
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
              <span className="text-lg md:text-xl font-bold">
                Chat do Coach de Relacionamentos
              </span>
            </div>

            {/* Back button */}
            <Button
              onClick={onBackToHome}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
          <div
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-b from-gray-900/50 via-gray-800/30 to-gray-900/50 custom-scrollbar"
            style={{
              minHeight: "400px",
              maxHeight: messages.length > 10 ? "none" : "60vh",
            }}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-center space-x-3 text-gray-400 animate-fade-in">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm">Seu coach está digitando...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-700/50 p-4 md:p-6 bg-gradient-to-r from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-sm flex-shrink-0">
            {selectedPhoto && (
              <div className="mb-4 animate-fade-in">
                <PhotoAttachment
                  onPhotoSelect={handlePhotoSelect}
                  onPhotoRemove={handlePhotoRemove}
                  selectedPhoto={selectedPhoto}
                />
              </div>
            )}

            <div className="flex space-x-2 md:space-x-3 items-end">
              <div className="flex-shrink-0">
                <PhotoAttachment
                  onPhotoSelect={handlePhotoSelect}
                  onPhotoRemove={handlePhotoRemove}
                  selectedPhoto={null}
                />
              </div>

              <div className="flex-1 min-w-0">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Peça conselhos de relacionamento, ajuda com mensagens, dicas de carisma ou anexe uma foto para análise..."
                  className="border-gray-600/50 bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:border-red-400/50 focus:ring-red-400/20 rounded-xl text-sm md:text-base py-3 px-4 transition-all duration-300 w-full"
                  disabled={isTyping}
                />
              </div>

              <div className="flex-shrink-0">
                <Button
                  onClick={handleSendMessage}
                  disabled={(!inputValue.trim() && !selectedPhoto) || isTyping}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl px-4 md:px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
