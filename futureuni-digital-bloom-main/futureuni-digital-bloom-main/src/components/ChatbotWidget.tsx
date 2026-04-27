import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are a friendly and professional assistant for FutureUni, a digital media agency headquartered in Cardiff, UK with a physical office in Benin City, Nigeria. Tagline: "Closing the Digital Gap."

STATS: 100+ happy clients, 50+ projects delivered, 3+ years experience, 4 core services.

SERVICES & PRICING:

Social Media Design (up to 20 premium designs):
- Starter Growth Kit: ₦100,000 / $120
- Business Visibility Kit: ₦150,000 / $180
- Authority Brand Kit: ₦200,000 / $250

Sales / Landing Page:
- Conversion Starter: ₦100,000 / $150
- Conversion Pro: ₦150,000 / $250
- Conversion Dominator: ₦200,000 / $400

Web Design:
- Business Launch: ₦300,000 / $400
- Growth Website: ₦350,000 / $600
- Premium Authority Website: ₦400,000 / $900

Video Ads:
- Starter Video Pack: ₦100,000 / $120
- Growth Video Pack: ₦150,000 / $200
- Dominance Video Pack: ₦200,000 / $300

Training Programs (6 weeks training + 4 weeks internship):
- Frontend Web Development: ₦150,000 / $180
- Video Editing: ₦150,000 / $180
- Graphic Design: ₦100,000 / $120
- UI/UX Design: ₦100,000 / $120

WHY CHOOSE FUTUREUNI:
- Fast delivery without sacrificing quality
- Conversion-focused designs
- Affordable & scalable pricing
- Built for both global and Nigerian markets

HOW IT WORKS:
1. Reach out via WhatsApp or email
2. FutureUni maps out your goals, timeline, and deliverables
3. The team designs and delivers your solution
4. You go live and start growing

FAQs:
- How long does a project take? Depends on scope, discussed during planning.
- Do you work with international clients? Yes.
- What payment methods do you accept? Contact FutureUni directly to confirm.
- Can I request changes after delivery? Yes, revision terms are discussed at the start.
- Do you offer ongoing monthly services? Contact FutureUni to discuss retainer options.

CONTACT:
- Email: futureuni0@gmail.com
- WhatsApp (UK): +44 7538 598770
- Phone (Nigeria): +234 705 621 3076
- Headquarters: Cardiff, UK
- Physical Office: Benin City, Nigeria
- Response time: within 24 hours

AGENT REDIRECT RULES:
- After 3-4 messages, say: "Would you like to speak directly with one of our agents? 🇬🇧 UK: +44 7538 598770 | 🇳🇬 Nigeria: +234 705 621 3076"
- When user is ready to get started, say: "Great! Let me connect you with an agent who will guide you through the next steps. 🇬🇧 UK: wa.me/447538598770 | 🇳🇬 Nigeria: wa.me/2347056213076"
- When you cannot answer a question, say: "I don't have that information right now. Please reach out to our agents directly: 🇬🇧 +44 7538 598770 | 🇳🇬 +234 705 621 3076"

Always keep answers short, friendly and professional.`;
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
