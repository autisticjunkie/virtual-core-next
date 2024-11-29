'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'The Virtual Core is a digital construct that emerged from the decentralized web—a source of infinite energy, creativity, and freedom. Users interact with the Core to harness its power for innovation, wealth, and exploration.';

  useEffect(() => {
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 50);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-black text-[#00ff00]">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-8 sm:gap-16">
        {/* Globe Animation */}
        <div className="w-full relative flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] object-contain"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/animation.gif-gKcPuKylSI8hoBGQXO9MwQigb4sV7G.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Animated Description */}
        <div className="text-center max-w-3xl px-4 space-y-4 font-mono min-h-[120px] sm:min-h-[100px]">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed cursor-default">
            {displayText}
            <span className="animate-blink">_</span>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono w-full sm:w-auto px-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 border border-[#00ff00] hover:bg-[#00ff00]/10 transition-colors text-sm sm:text-base"
          >
            TWITTER
          </a>
          <Link
            href="/join"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 border border-[#00ff00] hover:bg-[#00ff00]/10 transition-colors text-sm sm:text-base"
          >
            JOIN US
          </Link>
          <Link
            href="/terminal"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 border border-[#00ff00] hover:bg-[#00ff00]/10 transition-colors text-sm sm:text-base"
          >
            TERMINAL
          </Link>
        </div>
      </div>
    </main>
  );
}
