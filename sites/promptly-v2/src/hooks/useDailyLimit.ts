import { useState, useEffect } from 'react';

interface DailyLimitHook {
  count: number;
  isLimited: boolean;
  incrementCount: () => void;
  resetCount: () => void;
}

export function useDailyLimit(limit: number = 5): DailyLimitHook {
  const [count, setCount] = useState(0);
  
  const getTodayKey = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const getStorageKeys = () => ({
    countKey: 'promptly.snippet.dailyCount',
    dateKey: 'promptly.snippet.dailyDate'
  });

  useEffect(() => {
    const { countKey, dateKey } = getStorageKeys();
    const todayKey = getTodayKey();
    
    // Check if we have data for today
    const storedDate = localStorage.getItem(dateKey);
    const storedCount = localStorage.getItem(countKey);
    
    if (storedDate === todayKey && storedCount) {
      setCount(parseInt(storedCount, 10));
    } else {
      // New day, reset count
      setCount(0);
      localStorage.setItem(dateKey, todayKey);
      localStorage.setItem(countKey, '0');
    }
  }, []);

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    const { countKey, dateKey } = getStorageKeys();
    const todayKey = getTodayKey();
    
    localStorage.setItem(countKey, newCount.toString());
    localStorage.setItem(dateKey, todayKey);
  };

  const resetCount = () => {
    setCount(0);
    const { countKey, dateKey } = getStorageKeys();
    const todayKey = getTodayKey();
    
    localStorage.setItem(countKey, '0');
    localStorage.setItem(dateKey, todayKey);
  };

  return {
    count,
    isLimited: count >= limit,
    incrementCount,
    resetCount
  };
}