import { Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  role: 'ai' | 'user';
  text: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: "An autonomous driving company's expansion to the US requires navigating complex state-level DMV rules. California demands strict disengagement reporting, while Texas is more permissive. How can I help map your data privacy (CCPA) needs for cloud training?",
  },
];

export function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'Compare CA vs TX testing rules',
    'Data localization laws',
    'CCPA obligations',
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: input };
    const aiReply: Message = {
      id: Date.now() + 1,
      role: 'ai',
      text: "I'm analysing your query against current US regulatory frameworks. This typically involves reviewing state-specific AV legislation and applicable federal data regulations. Let me prepare a detailed compliance memo for your team.",
    };
    setMessages(prev => [...prev, userMsg, aiReply]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-white"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-5 flex-shrink-0"
        style={{ backgroundColor: '#4B286D', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
      >
        <div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-white text-sm" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
            AI Compliance Assistant
          </h2>
          <p className="text-purple-300 text-xs">Powered by Grant Thornton advisory</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'ai' && (
              <div
                className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: '#4B286D' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div
              className="max-w-[85%] px-4 py-3 text-sm leading-relaxed"
              style={{
                backgroundColor: msg.role === 'ai' ? '#F7F5FA' : '#4B286D',
                color: msg.role === 'ai' ? '#374151' : 'white',
                border: msg.role === 'ai' ? '1px solid #e5e7eb' : 'none',
                borderRadius: '0px',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex-shrink-0 px-5 py-4"
        style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#FAFAFA' }}
      >
        {/* Quick prompts */}
        <div className="flex flex-wrap gap-2 mb-3">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 text-xs transition-colors"
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                color: '#4B5563',
                borderRadius: '0px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#4B286D';
                (e.currentTarget as HTMLButtonElement).style.color = '#4B286D';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
                (e.currentTarget as HTMLButtonElement).style.color = '#4B5563';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a compliance question..."
            className="flex-1 px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition-colors"
            style={{ border: '1px solid #d1d5db', borderRadius: '0px' }}
            onFocus={e => (e.target.style.borderColor = '#4B286D')}
            onBlur={e => (e.target.style.borderColor = '#d1d5db')}
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 flex items-center justify-center text-white flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#4B286D', borderRadius: '0px' }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}