"use client";
import React, { useEffect, useState } from "react";

const TerminalLoading = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingMessages = [
      "Starting download...",
      "Connecting to server...",
      "Downloading package (1/3)...",
      "Downloading package (2/3)...",
      "Downloading package (3/3)...",
      "Verifying packages...",
      "Installing package (1/3)...",
      "Installing package (2/3)...",
      "Installing package (3/3)...",
      "Cleaning up...",
      "Installation complete!",
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < loadingMessages.length) {
        setMessages((prev) => [...prev, loadingMessages[currentIndex]]);
        currentIndex++;
      } else {
        setLoading(false);
        setTimeout(() => {
          setMessages([]);
          setLoading(true);
          currentIndex = 0;
        }, 2000); // Adjust delay before restarting
      }
    }, 75); // Adjust the speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dark:bg-black dark:text-green-400 bg-white text-black font-mono p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto my-8">
      <div className="terminal-header dark:bg-gray-900 dark:text-gray-300 bg-gray-200 text-gray-800 px-4 py-2 rounded-t-lg flex items-center justify-between">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4">Terminal - user@localhost:~$</div>
      </div>
      <div className="terminal-body p-4 h-64 overflow-y-auto dark:bg-gray-800 bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="dark:text-green-400 text-blue-600">
            {msg}
          </div>
        ))}
        {loading && (
          <div className="dark:text-green-400 text-blue-600 animate-blink">
            |
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalLoading;
