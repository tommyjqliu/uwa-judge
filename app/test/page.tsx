"use client"
import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const [codeText, setCodeText] = useState('');
  const codeString = `
    function helloWorld() {
      console.log('Hello, world!');
    }

    helloWorld();
  `;
  const typingSpeed = 100; // Adjust the typing speed here (milliseconds per character)

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCodeText(prev => prev + codeString[index]);
      index++;
      if (index === codeString.length) {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to UWAjudge
        </h1>
        <p className="text-2xl text-gray-200">
          Your ultimate solution for programming contests
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-around items-center pointer-events-none">
        <div className="w-32 h-32 bg-yellow-400 rounded-full opacity-75 animate-ping"></div>
        <div className="w-24 h-24 bg-green-400 rounded-full opacity-75 animate-ping"></div>
        <div className="w-40 h-40 bg-red-400 rounded-full opacity-75 animate-ping"></div>
        <div className="w-28 h-28 bg-blue-400 rounded-full opacity-75 animate-ping"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <pre className="text-green-400 text-xs md:text-sm lg:text-base xl:text-lg bg-black bg-opacity-50 p-4 rounded-lg shadow-lg z-0 whitespace-pre-line">
          {codeText}
        </pre>
      </div>
    </div>
  );
};

export default IndexPage;
