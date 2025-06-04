
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  photo?: File;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-4 shadow-2xl transition-all duration-300 hover:scale-[1.02]",
          message.isUser
            ? "bg-gradient-to-br from-red-600 via-pink-600 to-red-500 text-white rounded-br-md border border-red-400/20"
            : "bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-red-900/30 text-gray-100 rounded-bl-md"
        )}
      >
        {message.photo && (
          <div className="mb-3">
            <img 
              src={URL.createObjectURL(message.photo)} 
              alt="Foto anexada" 
              className="max-w-full h-auto rounded-xl shadow-lg border border-white/20"
            />
          </div>
        )}
        
        <div className="text-sm leading-relaxed">
          {formatMessage(message.text)}
        </div>
        
        <div
          className={cn(
            "text-xs mt-3 opacity-75",
            message.isUser ? "text-red-100" : "text-gray-400"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
