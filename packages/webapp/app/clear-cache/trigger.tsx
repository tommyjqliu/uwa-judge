"use client";

import { useEffect } from "react";

export default function Triggger({ callback }: { callback: () => void }) {
  useEffect(() => {
    callback();
  });
  return null;
}
