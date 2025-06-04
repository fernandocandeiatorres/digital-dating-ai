
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
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          message.isUser
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-br-sm"
            : "bg-white border border-red-100 text-gray-800 rounded-bl-sm"
        )}
      >
        <div className="text-sm leading-relaxed">
          {formatMessage(message.text)}
        </div>
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            message.isUser ? "text-red-100" : "text-gray-500"
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
