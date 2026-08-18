"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const BoutiqueCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Damping & stiffness para suavidade editorial/boutique
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.classList.contains('cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer';

        setIsHovered(isInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Ponto central */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D47E30]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Anel Boutique em mola */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#D47E30]/70"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(212, 126, 48, 0.12)' : 'rgba(212, 126, 48, 0)',
          borderColor: isHovered ? '#D47E30' : 'rgba(212, 126, 48, 0.6)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </div>
  );
};
