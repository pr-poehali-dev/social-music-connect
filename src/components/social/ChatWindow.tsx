import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CHAT_URL = "https://functions.poehali.dev/1c2c9281-8247-48f7-83ef-1bf344b549bc";

interface Message {
  id: number;
  sender_id: string;
  text: string;
  created_at: string;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
}

interface ChatWindowProps {
  contact: ChatContact;
  myId: string;
  onBack: () => void;
}

export function ChatWindow({ contact, myId, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const sinceIdRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Создаём/получаем комнату
  useEffect(() => {
    async function initRoom() {
      const res = await fetch(`${CHAT_URL}?action=room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1_id: myId, user2_id: contact.id }),
      });
      const data = await res.json();
      setRoomId(data.room_id);
    }
    initRoom();
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [myId, contact.id]);

  // Polling сообщений
  useEffect(() => {
    if (!roomId) return;

    async function fetchMessages() {
      const res = await fetch(`${CHAT_URL}?room_id=${roomId}&since_id=${sinceIdRef.current}`);
      const data = await res.json();
      if (data.messages && data.messages.length > 0) {
        sinceIdRef.current = data.messages[data.messages.length - 1].id;
        setMessages(prev => [...prev, ...data.messages]);
      }
    }

    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 2000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [roomId]);

  // Скролл вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!text.trim() || !roomId || sending) return;
    setSending(true);
    const optimistic: Message = {
      id: Date.now(),
      sender_id: myId,
      text: text.trim(),
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);
    setText("");
    await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room_id: roomId, sender_id: myId, text: optimistic.text }),
    });
    setSending(false);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 glass-bright flex-shrink-0">
        <button onClick={onBack} className="text-white/40 hover:text-white transition-colors mr-1">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <img src={contact.avatar} alt={contact.name} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{contact.name}</p>
          <p className="text-[10px] text-neon-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green inline-block" />
            онлайн
          </p>
        </div>
        <button className="text-white/30 hover:text-white/60 transition-colors">
          <Icon name="MoreHorizontal" size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-2">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
            <Icon name="MessageCircle" size={40} className="text-neon-purple" />
            <p className="text-sm text-white/50">Начните переписку</p>
          </div>
        )}
        {messages.map((msg, i) => {
          const isMe = msg.sender_id === myId;
          const prevMsg = messages[i - 1];
          const showAvatar = !isMe && (!prevMsg || prevMsg.sender_id !== msg.sender_id);
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!isMe && (
                <div className="w-6 flex-shrink-0">
                  {showAvatar && (
                    <img src={contact.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                  )}
                </div>
              )}
              <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed
                  ${isMe
                    ? "gradient-bg text-white rounded-br-sm"
                    : "glass-bright text-white/90 rounded-bl-sm"
                  }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-white/25 px-1">{formatTime(msg.created_at)}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/5 glass-bright flex-shrink-0">
        <div className="flex items-end gap-2">
          <button className="text-white/30 hover:text-neon-purple transition-colors flex-shrink-0 mb-2">
            <Icon name="Plus" size={20} />
          </button>
          <div className="flex-1 glass rounded-2xl px-4 py-2.5 flex items-end gap-2">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Сообщение..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none resize-none max-h-32"
              rows={1}
            />
            <button className="text-white/30 hover:text-neon-pink transition-colors flex-shrink-0">
              <Icon name="Smile" size={18} />
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={!text.trim() || sending}
            className="flex-shrink-0 w-10 h-10 gradient-bg rounded-full flex items-center justify-center glow hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
          >
            <Icon name="Send" size={16} className="text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
