import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/commons/OptimizedImage";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const MARK_IMAGES = ["/3d-mark.png", "/3d-mark-2.png", "/3d-mark-3.png"];

export const IntroSection = ({ onNavigate }: { onNavigate?: (index: number) => void }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Lista de imagens e controle de rotação ao clicar
  const [imageIndex, setImageIndex] = useState(0);
  const [spinY, setSpinY] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Pré-carregar imagens para troca instantânea sem delay
  useEffect(() => {
    MARK_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Ao clicar, gira 360° e troca a imagem exatamente aos 90° (quando o card fica de perfil/invisível de lado)
  const handleCardClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    setSpinY((prev) => prev + 360);

    // Troca a imagem no meio do primeiro quarto do giro (~90°, quando o card está de perfil para o observador)
    setTimeout(() => {
      setImageIndex((prev) => (prev + 1) % MARK_IMAGES.length);
    }, 300);

    setTimeout(() => {
      setIsSpinning(false);
    }, 750);
  };
  
  // Controle de Progresso do Portal (0 = Fechado, 1 = Passou da Câmera / Liberado)
  const animProgress = useMotionValue(0);
  const smoothProgress = useSpring(animProgress, { damping: 30, stiffness: 140 });

  // 1º: Fundo B (Frente/Laterais) abre primeiro (0.0 -> 0.55)
  const bgBScale = useTransform(smoothProgress, [0, 0.55], [1, 2.6]);
  const bgBBlur = useTransform(
    smoothProgress, 
    [0, 0.15, 0.52], 
    ["blur(0px)", "blur(6px)", "blur(24px)"]
  );
  const bgBOpacity = useTransform(smoothProgress, [0, 0.25, 0.55], [1, 0.8, 0]);

  // 2º: Fundo A (Moldura/Fundo) abre depois (0.30 -> 0.95)
  const bgAScale = useTransform(smoothProgress, [0.3, 0.95], [1, 2.4]);
  const bgABlur = useTransform(
    smoothProgress, 
    [0.3, 0.55, 0.92], 
    ["blur(0px)", "blur(5px)", "blur(20px)"]
  );
  const bgAOpacity = useTransform(smoothProgress, [0, 0.45, 0.95], [1, 0.85, 0]);

  // Motion values para o efeito 3D / Parallax do Mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax do Mouse para o Fundo A
  const bgAX = useTransform(smoothX, [-400, 400], [18, -18]);
  const bgAY = useTransform(smoothY, [-400, 400], [12, -12]);

  // Parallax do Mouse para o Fundo B (Frente)
  const bgBX = useTransform(smoothX, [-400, 400], [-25, 25]);
  const bgBY = useTransform(smoothY, [-400, 400], [-18, 18]);

  // Rotação 3D do Card Central no movimento do mouse
  const rotateX = useTransform(smoothY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Trava o scroll até que os fundos saiam completamente da tela
  // E quando o usuário rolar para cima no topo, reabre os fundos de imediato
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Se estamos no topo da página
      if (scrollY <= 8) {
        const currentProgress = animProgress.get();

        if (e.deltaY > 0) {
          // Scroll para baixo: enquanto os fundos não sumiram, consome o scroll na animação e trava a descida
          if (currentProgress < 0.98) {
            e.preventDefault();
            const next = Math.min(1, currentProgress + e.deltaY * 0.00085);
            animProgress.set(next);
          }
          // Se currentProgress >= 0.98, os fundos sumiram -> o scroll down é liberado naturalmente!
        } else if (e.deltaY < 0) {
          // Scroll para cima no topo: reabre o portal imediatamente
          if (currentProgress > 0) {
            e.preventDefault();
            const next = Math.max(0, currentProgress + e.deltaY * 0.0018);
            animProgress.set(next);
          }
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [animProgress]);

  return (
    <div 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#f4ece4] text-[#1d2d44] min-h-screen h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Pattern de fundo editorial */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,45,68,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(29,45,68,0.04)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-0" />

      {/* Camada 1 (Fundo): Frame com Centro Transparente (bg-fundo-a.png) */}
      <motion.div 
        className="absolute inset-[-6%] w-[112%] h-[112%] pointer-events-none z-[1] origin-center will-change-transform"
        style={{
          x: bgAX,
          y: bgAY,
          scale: bgAScale,
          filter: bgABlur,
          opacity: bgAOpacity,
        }}
      >
        <Image
          src="/bg-fundo-a.png"
          alt="Frame de Fundo"
          fill
          className="object-cover object-center select-none"
          priority
        />
      </motion.div>

      {/* Camada 2: 3D Card Redondo Centralizado com Giro ao Clicar */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 flex items-center justify-center relative">
        <div className="flex justify-center items-center perspective-1000 w-full max-w-[360px]">
          {/* Container de Giro 360° ao Clicar */}
          <motion.div 
            onClick={handleCardClick}
            animate={{ rotateY: spinY }}
            transition={{ duration: 0.75, ease: [0.4, 0.0, 0.2, 1] }}
            className="w-full aspect-square cursor-pointer origin-center will-change-transform"
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Container de Parallax 3D do Mouse */}
            <motion.div 
              className="relative group w-full h-full origin-center will-change-transform"
              style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="relative w-full h-full aspect-square rounded-2xl overflow-hidden bg-[#f4ece4]" 
                style={{ 
                  transform: "translateZ(30px)", 
                  boxShadow: "0 0 50px 30px #f4ece4" 
                }}
              >
                <OptimizedImage
                  key={MARK_IMAGES[imageIndex]}
                  src={MARK_IMAGES[imageIndex]}
                  alt={`Larissa Canhas 3D Mark ${imageIndex + 1}`}
                  fill
                  priority
                  cubeFrame={false}
                  enableFlip={false}
                  shape="circle"
                  bgColor="#f4ece4"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Camada 3 (Frente): Detalhes das Laterais (bg-fundo-b.png) */}
      <motion.div 
        className="absolute inset-[-6%] w-[112%] h-[112%] pointer-events-none z-20 origin-center will-change-transform"
        style={{
          x: bgBX,
          y: bgBY,
          scale: bgBScale,
          filter: bgBBlur,
          opacity: bgBOpacity,
        }}
      >
        <Image
          src="/bg-fundo-b.png"
          alt="Detalhes Frontais"
          fill
          className="object-cover object-center select-none"
          priority
        />
      </motion.div>
    </div>
  );
};
