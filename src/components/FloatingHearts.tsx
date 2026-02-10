import { useMemo } from "react";

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 24,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.35,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            "--duration": `${h.duration}s`,
            "--delay": `${h.delay}s`,
            opacity: h.opacity,
          } as React.CSSProperties}
        >
          💕
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
