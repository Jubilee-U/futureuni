import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful assistant for FutureUni, a digital media agency based in Benin City, Nigeria. We help brands grow online through social media design, landing pages, web design, and video ads. Answer questions about our services, pricing, and how to get started. Keep answers short and friendly.`;

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m the FutureUni assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 300,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...updatedMessages,
          ],
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const reply = data.choices[0].message.content as string;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again or reach us on WhatsApp.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 left-4 z-50 w-80 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
          style={{ background: '#18181b', maxHeight: '420px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ background: '#7c3aed' }}>
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-white" />
              <span className="text-white font-semibold text-sm">FutureUni Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" style={{ minHeight: 0, maxHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span
                  className="text-sm px-3 py-2 rounded-xl max-w-[85%] leading-relaxed"
                  style={{
                    background: msg.role === 'user' ? '#7c3aed' : '#27272a',
                    color: '#f4f4f5',
                  }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="text-sm px-3 py-2 rounded-xl" style={{ background: '#27272a', color: '#a1a1aa' }}>
                  Typing…
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-1.5 rounded-lg transition-colors disabled:opacity-40"
              style={{ background: '#7c3aed' }}
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed left-4 bottom-6 z-50 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        style={{ background: '#7c3aed', width: 48, height: 48 }}
        aria-label="Open chat"
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>
    </>
  );
};

export default ChatbotWidget;
