import React from "react";

type FloatingObj = {
  src: string;
  left: string;
  right?: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rot: number;
};

const OBJECTS: FloatingObj[] = [
  {
    src: "/obj-1.png",
    left: "1%",
    size: 280,
    duration: 46,
    delay: -6,
    drift: 18,
    rot: 8,
  },
  {
    src: "/obj-2.png",
    left: "auto",
    right: "2%",
    size: 220,
    duration: 54,
    delay: -18,
    drift: -16,
    rot: -10,
  },
  {
    src: "/obj-3.png",
    left: "7%",
    size: 360,
    duration: 40,
    delay: -12,
    drift: 22,
    rot: 12,
  },
  {
    src: "/obj-4.png",
    left: "auto",
    right: "6%",
    size: 400,
    duration: 62,
    delay: -30,
    drift: -20,
    rot: -6,
  },
  {
    src: "/obj-5.png",
    left: "-3%",
    size: 200,
    duration: 36,
    delay: -22,
    drift: 10,
    rot: 14,
  },
  {
    src: "/obj-6.png",
    left: "auto",
    right: "-1%",
    size: 320,
    duration: 50,
    delay: -8,
    drift: -24,
    rot: -12,
  },
  {
    src: "/obj-7.png",
    left: "12%",
    size: 240,
    duration: 44,
    delay: -36,
    drift: 14,
    rot: 7,
  },
];

export const FloatingObjects = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-99999 overflow-hidden"
      aria-hidden="true"
    >
      {OBJECTS.map((obj, index) => (
        <span
          key={obj.src}
          className="floating-obj"
          style={
            {
              left: obj.left,
              right: obj.right ?? "auto",
              width: obj.size,
              height: obj.size,
              animationDuration: `${obj.duration}s, ${7 + (index % 4)}s`,
              animationDelay: `${obj.delay}s, ${index * 0.4}s`,
              "--obj-drift": `${obj.drift}px`,
              "--obj-rot": `${obj.rot}deg`,
            } as React.CSSProperties
          }
        >
          <img
            src={obj.src}
            alt=""
            width={obj.size}
            height={obj.size}
            className="h-full w-full max-h-[400px] max-w-[400px] object-contain"
            draggable={false}
          />
        </span>
      ))}
    </div>
  );
};
