"use client";

import { getClientSession } from "@/components/session-injector";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const codeString = `
      function helloWorld() {
        console.log('Hello, world!');
      }
  
      helloWorld();
    `;

export default function CodeAnimation() {
  const [codeText, setCodeText] = useState("");

  const typingSpeed = 100; // Adjust the typing speed here (milliseconds per character)

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeText((prev) => {
        if (prev.length === codeString.length) {
          clearInterval(interval);
          return prev;
        } else {
          return prev + codeString[prev.length];
        }
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <pre className="text-green-400 text-xs md:text-sm lg:text-base xl:text-lg bg-black bg-opacity-80 p-4 rounded-lg shadow-lg z-0 whitespace-pre-line min-w-[320px] min-h-[180px]">
        {codeText}
      </pre>
    </>
  );
}
