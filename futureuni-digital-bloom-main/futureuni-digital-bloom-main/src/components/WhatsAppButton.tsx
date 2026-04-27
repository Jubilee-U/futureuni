import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WA_URL = 'https://wa.me/2347056213076?text=Hi%20FutureUni%20I%27m%20interested%20in%20your%20services.%20I%27d%20love%20to%20discuss%20my%20project';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed right-4 z-50 flex items-center gap-2 rounded-full shadow-lg transition-all duration-300 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
      style={{
        backgroundColor: '#25D366',
        padding: hovered ? '12px 20px' : '12px',
        animation: 'wa-bounce 3s ease-in-out infinite',
      }}
    >
      <MessageCircle size={24} className="text-white shrink-0" />
      {hovered && (
        <span className="text-white text-sm font-medium whitespace-nowrap animate-[fade-in_0.2s_ease-out]">
          Chat with us
        </span>
      )}
    </a>
  );
};

export default WhatsAppButton;
