"use client";


import React, { useState, useEffect } from 'react';
import localFont from 'next/font/local'

const myFonts = localFont({
    src: '../../../../public/fonts/Virgil.woff2',
    variable: '--excal',
  });

const TypingAnimationS = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const words = "Welcome to the interactive canvas";
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (index <= words.length) {
        setText(words.substring(0, index));
        setIndex(index + 1);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the typing speed by changing this value
    return () => clearInterval(interval);
  }, [index, words]);
  
  return (
    <div className={`flex justify-center pt-36 ${myFonts.className} font-black lg:text-6xl md:text-5xl  text-emerald-600`}>
      <h1>{text}</h1>
    </div>
  );
}

export default TypingAnimationS;