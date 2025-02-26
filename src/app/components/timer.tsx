"use client";

import { useEffect, useState } from "react";
import { Cover } from "@/components/ui/cover";

const END_TIME = new Date(2025, 2, 27, 12, 0, 0).getTime(); 
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, Math.floor((END_TIME - currentTime) / 1000));
      setTimeLeft(remainingTime);
    };

    const interval = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center bg-black text-white p-4">
      <Cover>
        <h1 className="text-2xl text-white md:text-4xl lg:text-5xl font-bold mb-6 text-center">
          Timer
        </h1>
        <div className={`text-2xl md:text-7xl lg:text-8xl font-mono tracking-wide ${timeLeft <= 30 ? 'text-red-500' : 'text-orange-500'}`}>
          {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}:
          {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      </Cover>
    </div>
  );
}
