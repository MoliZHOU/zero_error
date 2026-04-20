import { Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormData } from '../config/industryConfig';
import { buildGreeting, buildQuickPrompts, MOCK_REPLY } from '../data/mockChat';

interface ChatSidebarProps {
  formData: FormData;
  selectedTopics: string[];
}

interface ChatMessage {
  id: number;
  role: 'ai' | 'user';
  text: string;
}

export function ChatSidebar({ formData, selectedTopics }: ChatSidebarProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const greeting = useMemo(
    () => buildGreeting(formData, selectedTopics),
    [formData, selectedTopics],
  );
  const quickPrompts = useMemo(
    () => buildQuickPrompts(selectedTopics),
    [selectedTopics],
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'ai',
        text: MOCK_REPLY,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 shadow-xl">
      {/* Header */}
      <div
        className="px-6 py-5 border-b border-gray-200"
        style={{ backgroundColor: '#4B286D' }}
      >
        <h2 className="text-white tracking-tight">AI Compliance Assistant</h2>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Greeting */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4B286D' }}
            >
              <span className="text-white">AI</span>
            </div>
            <div className="flex-1">
              <p className="text-slate-700 leading-relaxed">{greeting}</p>
            </div>
          </div>
        </div>

        {/* Message history */}
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div
                className="max-w-[85%] px-4 py-3 rounded-lg text-white"
                style={{ backgroundColor: '#4B286D' }}
              >
                <p className="leading-relaxed">{m.text}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#4B286D' }}
                >
                  <span className="text-white">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 leading-relaxed">{m.text}</p>
                </div>
              </div>
            </div>
          ),
        )}

        {isTyping && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex gap-3 items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#4B286D' }}
              >
                <span className="text-white">AI</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-gray-200 bg-slate-50">
        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-full text-slate-700 hover:border-teal-500 hover:bg-teal-50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a compliance question..."
            className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#4B286D' }}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
