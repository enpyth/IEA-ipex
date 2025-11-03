import { useEffect, useState } from 'react';

const SMALL_SCREEN_BREAKPOINT = 750;

export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const checkSize = () => {
      setIsSmallScreen(window.innerWidth < SMALL_SCREEN_BREAKPOINT);
    };

    // 初始检查
    checkSize();

    // 监听窗口大小变化
    const mql = window.matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT - 1}px)`);
    const onChange = () => {
      checkSize();
    };
    
    mql.addEventListener('change', onChange);
    window.addEventListener('resize', checkSize);

    return () => {
      mql.removeEventListener('change', onChange);
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return !!isSmallScreen;
}

