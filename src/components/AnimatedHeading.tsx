import React, { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  duration?: number;
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
  className = '',
}) => {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1
      className={`font-normal ${className}`}
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => {
        let globalCharIndexInLine = 0;
        const words = line.split(' ');

        return (
          <span key={lineIndex} className="block whitespace-normal">
            {words.map((word, wordIndex) => {
              const wordChars = word.split('');
              const startIndex = globalCharIndexInLine;
              globalCharIndexInLine += word.length + 1; // +1 for the space

              return (
                <React.Fragment key={wordIndex}>
                  <span className="inline-block whitespace-nowrap">
                    {wordChars.map((char, charOffset) => {
                      const charIndex = startIndex + charOffset;
                      const delay =
                        lineIndex * line.length * charDelay +
                        charIndex * charDelay;

                      return (
                        <span
                          key={charOffset}
                          className="inline-block transition-all ease-out"
                          style={{
                            opacity: isStarted ? 1 : 0,
                            transform: isStarted
                              ? 'translateX(0px)'
                              : 'translateX(-18px)',
                            transitionDuration: `${duration}ms`,
                            transitionDelay: `${delay}ms`,
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      );
                    })}
                  </span>
                  {wordIndex < words.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </React.Fragment>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
};