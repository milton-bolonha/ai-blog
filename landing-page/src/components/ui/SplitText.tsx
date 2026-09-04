import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}

export const SplitText = ({
  text,
  delay = 0,
  stagger = 0.03,
  className = "",
}: SplitTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Anima quando chega na seção

  // Allow only explicit line-break tokens; all other content remains plain text.
  const textParts = text.split(/(<br\s*\/?>)/gi);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween" as const,
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {textParts.map((part, partIndex) => {
        if (/^<br\s*\/?>$/i.test(part)) {
          return <br key={`break-${partIndex}`} />;
        }

        return part.split("").map((letter, letterIndex) => (
          <motion.span
            key={`${partIndex}-${letterIndex}`}
            variants={child}
            style={{ display: "inline-block" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ));
      })}
    </motion.span>
  );
};
