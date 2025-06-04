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
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
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
          "max-w-[85%] md:max-w-[80%] rounded-2xl px-4 md:px-5 py-3 md:py-4 shadow-xl transition-all duration-300 hover:scale-[1.01] relative",
          message.isUser
            ? "bg-gradient-to-br from-red-600 via-pink-600 to-red-500 text-white rounded-br-md border border-red-400/30 shadow-red-500/20"
            : "bg-gradient-to-br from-gray-800/90 via-gray-800/90 to-gray-900/90 border border-gray-700/50 text-gray-100 rounded-bl-md shadow-black/30 backdrop-blur-sm"
        )}
      >
        {/* Subtle gradient overlay for better visual appeal */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-20 pointer-events-none",
            message.isUser
              ? "bg-gradient-to-br from-white/10 to-transparent rounded-br-md"
              : "bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-md"
          )}
        />

        <div className="relative z-10">
          {message.photo && (
            <div className="mb-3">
              <img
                src={URL.createObjectURL(message.photo)}
                alt="Foto anexada"
                className="max-w-full h-auto rounded-xl shadow-lg border border-white/20"
              />
            </div>
          )}

          <div className="text-sm md:text-base leading-relaxed font-medium">
            {formatMessage(message.text)}
          </div>

          <div
            className={cn(
              "text-xs mt-2 md:mt-3 opacity-70",
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
    </div>
  );
};
