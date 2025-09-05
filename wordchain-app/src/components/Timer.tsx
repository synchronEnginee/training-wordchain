'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  elapsedTime: number;
  isActive: boolean;
  isFinished: boolean;
}

export function Timer({ elapsedTime, isActive, isFinished }: TimerProps) {
  const [displayTime, setDisplayTime] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive && !isFinished) {
      setDisplayTime(0);
      return;
    }

    if (isFinished) {
      setDisplayTime(elapsedTime);
      return;
    }

    const interval = setInterval(() => {
      setDisplayTime(elapsedTime);
    }, 10);

    return () => clearInterval(interval);
  }, [elapsedTime, isActive, isFinished]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  if (!mounted) {
    return (
      <div className="text-2xl font-mono font-bold text-center p-4">
        <div className="text-gray-600 text-sm">タイム</div>
        <div className="text-blue-600">
          00.00
        </div>
      </div>
    );
  }

  return (
    <div className="text-2xl font-mono font-bold text-center p-4">
      <div className="text-gray-600 text-sm">タイム</div>
      <div className={isFinished ? "text-green-600" : "text-blue-600"}>
        {formatTime(displayTime)}
      </div>
    </div>
  );
}