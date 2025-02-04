'use client'

import { Cover } from "@/components/ui/cover";
import { div } from "framer-motion/client";
import React from "react";
import { useEffect, useState } from "react";

export default function Timer() {
    const [time, setTime] = useState<number>(1000000);
    useEffect(() => {
        let timer = setInterval(() => {
          setTime((time) => {
            if (time === 0 || time === null) {
              clearInterval(timer);
              return 0;
            } else return time - 1;
          });
        }, 1000);
      }, []);
  return (
    <div className="bg-black h-100 w-100">
    <div className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
      <Cover> <p className="text-white">
        Time left: {`${Math.floor(time / 60).toString()}`.padStart(2, '0')}:
        {`${(time % 60).toString()}`.padStart(2, '0')}
      </p></Cover>
    </div>
    </div>
  );
}