import { useState, useCallback, useRef, useEffect } from "react";
import valentineBg from "@/assets/valentine-bg.jpg";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

// Progressive messages when NO is clicked
const NO_MESSAGES = [
  "No 🙃",
  "Are you sure? 🥺",
  "Come on…",
  "I want you 💗",
  "You're breaking my heart 💔",
  "You're not escaping 😏",
  "Nice try 😘",
  "Say yes already! 🥰",
  "Last chance… just say yes 💖",
];

const Index = () => {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noShaking, setNoShaking] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-accept after all NO messages exhausted
  const maxNo = NO_MESSAGES.length;

  const handleYes = useCallback(() => {
    setAccepted(true);
  }, []);

  // Move the NO button to a random position within the container
  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const btnW = 140;
    const btnH = 56;
    const maxX = container.width - btnW;
    const maxY = container.height - btnH;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    setNoPosition({ x, y });
  }, []);

  const handleNo = useCallback(() => {
    const next = noCount + 1;
    if (next >= maxNo) {
      // Auto-accept after too many attempts
      setAccepted(true);
      return;
    }
    setNoCount(next);
    setNoShaking(true);
    moveNoButton();
    setTimeout(() => setNoShaking(false), 600);
  }, [noCount, maxNo, moveNoButton]);

  // Also move button on hover/touch for extra evasion (after first NO)
  const handleNoHover = useCallback(() => {
    if (noCount > 0) {
      moveNoButton();
    }
  }, [noCount, moveNoButton]);

  // YES button grows as NO count increases
  const yesScale = 1 + noCount * 0.12;
  const noButtonText = NO_MESSAGES[Math.min(noCount, maxNo - 1)];

  return (
    <div
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${valentineBg})` }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />

      <FloatingHearts />

      {accepted && <Confetti />}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-12 text-center max-w-md w-full">
        {!accepted ? (
          <>
            {/* Heart icon */}
            <div className="text-6xl sm:text-7xl animate-heartbeat select-none">
              💝
            </div>

            {/* Question */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-card leading-tight drop-shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Will you be my Valentine?
            </h1>

            {/* Subtitle that changes */}
            {noCount > 0 && (
              <p className="text-lg sm:text-xl text-card/90 font-medium italic drop-shadow animate-fade-in"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {noCount >= 3
                  ? "You know you want to say yes… 💕"
                  : "Think about it… 🥰"}
              </p>
            )}
            {noCount > 0 && (
              <p className="text-base sm:text-lg text-card/80 font-semibold drop-shadow animate-fade-in"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {NO_MESSAGES[Math.min(noCount, maxNo - 1)]}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full relative min-h-[140px] justify-center">
              {/* YES button — grows with each NO */}
              <button
                onClick={handleYes}
                className="rounded-full font-bold text-primary-foreground shadow-xl transition-all duration-300 animate-pulse-glow active:scale-95 z-10"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: `${16 + noCount * 2}px`,
                  padding: `${14 + noCount * 3}px ${36 + noCount * 6}px`,
                  background: "linear-gradient(135deg, hsl(346, 77%, 55%), hsl(340, 80%, 62%))",
                  transform: `scale(${yesScale})`,
                }}
              >
                YES 💖
              </button>

              {/* NO button — moves around */}
              <button
                onClick={handleNo}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className={`rounded-full font-semibold text-muted-foreground border-2 border-border bg-card/80 backdrop-blur-sm shadow-md transition-all duration-200 active:scale-95 z-10 ${
                  noShaking ? "animate-shake" : ""
                }`}
                style={{
                  fontFamily: "var(--font-body)",
                  padding: "14px 32px",
                  fontSize: `${Math.max(14 - noCount, 10)}px`,
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  opacity: Math.max(1 - noCount * 0.12, 0.4),
                }}
              >
                {noButtonText}
              </button>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="animate-success flex flex-col items-center gap-6">
            <div className="text-7xl sm:text-8xl animate-heartbeat select-none">
              💖
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-card leading-tight drop-shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              I knew you'd say yes!
            </h1>
            <p
              className="text-xl sm:text-2xl text-card/90 font-medium drop-shadow"
              style={{ fontFamily: "var(--font-body)" }}
            >
              You just made me the happiest person ever 🥰
            </p>
            <div className="mt-4 text-5xl animate-heartbeat">
              🌹💕🌹
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
