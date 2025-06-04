
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
      text: "Hey there! 👋 I'm your AI dating coach. Whether you need help with opening lines, keeping conversations going, or just want some rizz tips, I'm here to help! What's your dating situation?",
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
    
    if (lowerMessage.includes("opening") || lowerMessage.includes("first message")) {
      return "Great question! Here are some killer opening lines:\n\n💫 'I noticed [something from their profile] - tell me more about that!'\n💫 'Your [specific photo/interest] caught my eye. What's the story behind it?'\n💫 'I have to ask - [genuine question about their interests]'\n\nThe key is being genuine and showing you actually looked at their profile! What kind of vibe are you going for?";
    }
    
    if (lowerMessage.includes("rizz") || lowerMessage.includes("charm")) {
      return "Let's level up your rizz! 🔥\n\n✨ Be confident but not cocky\n✨ Ask engaging questions that show genuine interest\n✨ Use humor that matches their energy\n✨ Compliment something specific, not just 'you're pretty'\n✨ Show your personality - be authentically you!\n\nRemember: The best rizz is being genuinely interested in getting to know them. What's your natural personality like?";
    }
    
    if (lowerMessage.includes("conversation") || lowerMessage.includes("keep talking")) {
      return "Keeping conversations flowing is an art! 🎨\n\n🌟 Ask open-ended questions (avoid yes/no)\n🌟 Share stories, not just facts\n🌟 Find common interests and dive deeper\n🌟 Use the 'thread' technique - pick up on details they mention\n🌟 Be vulnerable and authentic\n\nExample: Instead of 'How was your day?' try 'What was the highlight of your day?'\n\nWhat kind of conversations do you usually struggle with?";
    }
    
    if (lowerMessage.includes("help") || lowerMessage.includes("advice")) {
      return "I'm here to help! 💕 I can assist with:\n\n💬 Crafting perfect messages\n🎯 Conversation starters and topics\n✨ Building confidence and charm\n💡 Reading signs and signals\n🔥 Developing your unique dating style\n\nJust tell me what specific situation you're dealing with, and I'll give you personalized advice!";
    }
    
    // Default responses for general dating advice
    const responses = [
      "That's a great question! The key to dating success is authenticity mixed with confidence. Tell me more about your specific situation so I can give you targeted advice! 💪",
      "I love that you're being proactive about your dating life! 🌟 The best connections happen when you're genuine. What's your biggest challenge right now?",
      "Every dating situation is unique! 💫 To give you the best advice, could you share more details about what you're experiencing?",
      "Dating can be tricky, but you've got this! 🔥 Let me know what specific area you'd like to work on and I'll help you level up your game!",
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
      <Card className="flex-1 flex flex-col border-2 border-red-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-6 h-6" />
            <span>Dating Coach Chat</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-red-50 to-pink-50">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <span className="text-sm">Your coach is typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-red-100 p-4 bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for dating advice, message help, or rizz tips..."
                className="flex-1 border-red-200 focus:border-red-400"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
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
