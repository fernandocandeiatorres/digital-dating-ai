
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
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
        "flex w-full",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-lg",
          message.isUser
            ? "bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-br-sm"
            : "bg-gray-800 border border-red-900/30 text-gray-100 rounded-bl-sm"
        )}
      >
        <div className="text-sm leading-relaxed">
          {formatMessage(message.text)}
        </div>
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
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
