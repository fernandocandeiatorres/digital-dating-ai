
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageBubble } from "@/components/MessageBubble";
import { Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou seu coach de relacionamentos com IA. Precisa de ajuda com frases de abertura, manter conversas interessantes, ou quer algumas dicas de carisma? Estou aqui para ajudar! Qual é sua situação amorosa?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("abertura") || lowerMessage.includes("primeira mensagem") || lowerMessage.includes("começar")) {
      return "Ótima pergunta! Aqui estão algumas frases de abertura infalíveis:\n\n💫 'Reparei [algo do perfil dela] - me conta mais sobre isso!'\n💫 'Sua [foto específica/interesse] chamou minha atenção. Qual é a história por trás?'\n💫 'Preciso perguntar - [pergunta genuína sobre os interesses dela]'\n\nO segredo é ser genuíno e mostrar que você realmente olhou o perfil! Que tipo de vibe você quer passar?";
    }
    
    if (lowerMessage.includes("carisma") || lowerMessage.includes("charme") || lowerMessage.includes("rizz")) {
      return "Vamos elevar seu carisma! 🔥\n\n✨ Seja confiante, mas não arrogante\n✨ Faça perguntas envolventes que mostrem interesse genuíno\n✨ Use humor que combine com a energia dela\n✨ Elogie algo específico, não apenas 'você é linda'\n✨ Mostre sua personalidade - seja autenticamente você!\n\nLembre-se: O melhor carisma é demonstrar interesse genuíno em conhecê-la. Como é sua personalidade natural?";
    }
    
    if (lowerMessage.includes("conversa") || lowerMessage.includes("papo") || lowerMessage.includes("manter") || lowerMessage.includes("continuar")) {
      return "Manter conversas fluindo é uma arte! 🎨\n\n🌟 Faça perguntas abertas (evite sim/não)\n🌟 Compartilhe histórias, não apenas fatos\n🌟 Encontre interesses em comum e aprofunde\n🌟 Use a técnica do 'gancho' - aproveite detalhes que ela menciona\n🌟 Seja vulnerável e autêntico\n\nExemplo: Em vez de 'Como foi seu dia?' tente 'Qual foi o momento mais legal do seu dia?'\n\nCom que tipo de conversa você costuma ter dificuldade?";
    }
    
    if (lowerMessage.includes("ajuda") || lowerMessage.includes("conselho") || lowerMessage.includes("dica")) {
      return "Estou aqui para ajudar! 💕 Posso te auxiliar com:\n\n💬 Criação de mensagens perfeitas\n🎯 Tópicos e iniciadores de conversa\n✨ Desenvolvimento de confiança e charme\n💡 Interpretação de sinais e pistas\n🔥 Criação do seu estilo único de relacionamento\n\nSó me conte qual situação específica você está enfrentando, e eu te darei conselhos personalizados!";
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
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
      <Card className="flex-1 flex flex-col border-2 border-red-900/30 bg-gray-800/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-6 h-6" />
            <span>Chat do Coach de Relacionamentos</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <span className="text-sm">Seu coach está digitando...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-red-900/30 p-4 bg-gray-800/80">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Peça conselhos de relacionamento, ajuda com mensagens, ou dicas de carisma..."
                className="flex-1 border-red-900/30 bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:border-red-400"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
