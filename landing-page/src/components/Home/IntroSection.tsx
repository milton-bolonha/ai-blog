import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/commons/OptimizedImage";
import MagneticButton from "@/components/ui/MagneticButton";
import { WHATSAPP_URL } from "@/lib/contacts";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const MARK_IMAGES = ["/3d-mark.png", "/3d-mark-2.png", "/3d-mark-3.png"];

export const IntroSection = ({
  onNavigate,
}: {
  onNavigate?: (index: number) => void;
}) => {
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
  const smoothProgress = useSpring(animProgress, {
    damping: 30,
    stiffness: 140,
  });

  // 1º: os objetos laterais crescem e são arrastados para fora da câmera
  const bgBScale = useTransform(smoothProgress, [0, 0.55], [0.72, 1.85]);
  const bgBScaleLeft = useTransform(smoothProgress, [0, 0.55], [0.864, 2.22]);
  const bgBExitLeft = useTransform(smoothProgress, [0, 0.55], [0, -42]);
  const bgBExitRight = useTransform(smoothProgress, [0, 0.55], [0, 42]);
  const bgBBlur = useTransform(
    smoothProgress,
    [0, 0.15, 0.52],
    ["blur(0px)", "blur(2px)", "blur(8px)"],
  );
  const bgBOpacity = useTransform(smoothProgress, [0, 0.25, 0.55], [1, 0.9, 0]);

  // 2º: Fundo A (Moldura/Fundo) abre depois (0.30 -> 0.95)
  const bgAScale = useTransform(smoothProgress, [0.3, 0.95], [1, 2.4]);
  const bgABlur = useTransform(
    smoothProgress,
    [0.3, 0.55, 0.92],
    ["blur(0px)", "blur(5px)", "blur(20px)"],
  );
  const bgAOpacity = useTransform(
    smoothProgress,
    [0, 0.45, 0.95],
    [0.8, 0.68, 0],
  );

  // Motion values para o efeito 3D / Parallax do Mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax do Mouse para o Fundo A
  const bgAX = useTransform(smoothX, [-400, 400], [18, -18]);
  const bgAY = useTransform(smoothY, [-400, 400], [12, -12]);

  // Parallax lateral contido para manter os objetos inteiros na viewport
  const bgBXLeftMouse = useTransform(smoothX, [-400, 400], [18, -18]);
  const bgBXRightMouse = useTransform(smoothX, [-400, 400], [-18, 18]);
  const bgBY = useTransform(smoothY, [-400, 400], [-10, 10]);

  const bgBXLeft = useTransform(
    [bgBExitLeft, bgBXLeftMouse],
    ([exit, mouse]) => `calc(${exit}vw + ${mouse}px)`,
  );
  const bgBXRight = useTransform(
    [bgBExitRight, bgBXRightMouse],
    ([exit, mouse]) => `calc(${exit}vw + ${mouse}px)`,
  );

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
      className="relative bg-[#fbfbfb] text-[#1d2d44] min-h-screen h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#fbfbfb" }}
    >
      {/* Pattern de fundo editorial */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,45,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(29,45,68,0.03)_1px,transparent_1px)] bg-size-[80px_80px] pointer-events-none z-0" />

      {/* Camada 1 (Fundo): Frame com Centro Transparente (bg-fundo-a.png) */}
      <motion.div
        className="absolute inset-[-2%] w-[104%] h-[104%] pointer-events-none z-1 origin-center will-change-transform"
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
          unoptimized
          priority
          className="object-cover object-center select-none"
        />
      </motion.div>

      {/* Camada 2: Card Redondo Centralizado com Giro ao Clicar */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 flex items-center justify-center relative">
        <div className="flex justify-center items-center perspective-1000 w-full max-w-90">
          {/* Container de Giro 360° ao Clicar */}
          <motion.div
            onClick={handleCardClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateY: spinY }}
            transition={{ duration: 0.75, ease: [0.4, 0.0, 0.2, 1] }}
            className="w-full aspect-square origin-center will-change-transform"
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
                className="relative w-full h-full aspect-square overflow-hidden bg-transparent"
                style={{
                  transform: "translateZ(30px)",
                  boxShadow: "none",
                  borderRadius: 0,
                  border: 0,
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
                  shape="rect"
                  bgColor="transparent"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-5">
        <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
          <MagneticButton
            href={WHATSAPP_URL}
            target="_blank"
            className="group relative inline-flex items-center justify-center gap-2 bg-[#ffd400] text-black hover:bg-[#ffe566] font-bold py-3.5 px-7 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 uppercase tracking-widest text-[11px]"
          >
            <span className="relative z-10">Peça Já o Seu!</span>
            <svg
              className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </MagneticButton>

          <MagneticButton
            onClick={() => onNavigate && onNavigate(2)}
            className="group inline-flex items-center justify-center gap-2 bg-white/50 hover:bg-white/80 text-[#1d2d44] font-medium py-3.5 px-7 rounded-full border border-white/70 hover:border-white transition-all duration-300 uppercase tracking-widest text-[11px] backdrop-blur-sm"
          >
            <span>Conheça o Manual</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500/90">
          <span className="h-px w-8 bg-zinc-300" />
          <span>Clique acima ou role para baixo</span>
          <span className="h-px w-8 bg-zinc-300" />
        </div>
      </div>

      {/* Camada 3 (Frente): objetos laterais inteiros, sem recorte nas extremidades */}
      <motion.div
        className="absolute left-0 bottom-0 z-20 h-[78vh] w-[55vw] max-w-105 pointer-events-none origin-left will-change-transform"
        style={{
          x: bgBXLeft,
          y: bgBY,
          scale: bgBScaleLeft,
          filter: bgBBlur,
          opacity: bgBOpacity,
        }}
      >
        <Image
          src="/bg-fundo-b-e.png"
          alt="Elemento gráfico lateral esquerdo"
          fill
          className="object-contain object-left select-none"
          priority
        />
      </motion.div>
      <motion.div
        className="absolute right-0 bottom-0 z-20 h-[78vh] w-[55vw] max-w-105 pointer-events-none origin-right will-change-transform"
        style={{
          x: bgBXRight,
          y: bgBY,
          scale: bgBScale,
          filter: bgBBlur,
          opacity: bgBOpacity,
        }}
      >
        <Image
          src="/bg-fundo-b-d.png"
          alt="Elemento gráfico lateral direito"
          fill
          className="object-contain object-right select-none"
          priority
        />
      </motion.div>
    </div>
  );
};
