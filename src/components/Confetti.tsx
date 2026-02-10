import { useMemo } from "react";

const COLORS = [
  "hsl(346, 77%, 55%)",
  "hsl(350, 80%, 72%)",
  "hsl(38, 70%, 60%)",
  "hsl(340, 80%, 62%)",
  "hsl(350, 60%, 90%)",
  "hsl(0, 0%, 100%)",
];

const SHAPES = ["❤️", "💖", "💕", "✨", "🌹", "💗"];

const Confetti = () => {
  const pieces = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1.5,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: 14 + Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            color: p.color,
          } as React.CSSProperties}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
};

export default Confetti;
