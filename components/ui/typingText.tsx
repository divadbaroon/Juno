// TypingText.tsx
import React from 'react';
import useTypingEffect from './useTypingEffect';

type TypingTextProps = {
  text: string;
  duration?: number;
  isTypeByLetter?: boolean;
};

const TypingText: React.FC<TypingTextProps> = ({
  text,
  duration = 200,
  isTypeByLetter = false,
}) => {
  const typedText = useTypingEffect(text, duration, isTypeByLetter);

  return <span className="text-black dark:text-white">{typedText}</span>;
};

export default TypingText;