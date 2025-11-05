"use client";

import { useIsMobile } from '@/hooks/use-mobile';
import React, { useState, useEffect, useRef } from 'react';

type ParallaxWrapperProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children, speed = 0.5, className }) => {
  const [offsetY, setOffsetY] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        // Start effect when the element is in view
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setOffsetY(rect.top);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  const transform = isMobile ? 'none' : `translateY(${offsetY * speed}px)`;

  return (
    <div ref={wrapperRef} className={className}>
      <div style={{ transform, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxWrapper;
