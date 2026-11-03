import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const FRAME_COUNT = 198;

const framePath = (index) => `/frames/f_${String(index).padStart(4, "0")}.webp`;

function ScrollHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length !== FRAME_COUNT) return;
    if (drawnFrameRef.current === index) return;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
    drawnFrameRef.current = index;
  };

  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const images = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();

      img.onload = () => {
        if (cancelled) return;
        count += 1;
        setLoadedCount(count);

        if (count === FRAME_COUNT) {
          imagesRef.current = images;
          drawFrame(currentFrameRef.current);
        }
      };

      img.onerror = () => {
        console.error("FAIL TO OPEN: ", framePath(i));
      };

      img.src = framePath(i);
      images.push(img);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      const state = { frame: 0 };

      const t1 = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      t1.to(
        state,
        {
          frame: FRAME_COUNT - 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const index = Math.round(state.frame);
            currentFrameRef.current = index;
            drawFrame(index);
          },
        },
        0,
      );

      t1.to(line1Ref.current, { text: "Hi, I'm Hayoung Selina Lee.", ease: "none", opacity: 1, duration: 0.25 }, 0.0);
      t1.to(line1Ref.current, { opacity: 0, duration: 0.0 }, 0.3);

      t1.to(line2Ref.current, { text: "4+ years as a Software Engineer.", ease: "none", opacity: 1, duration: 0.25 }, 0.31);
      t1.to(line2Ref.current, { opacity: 0, duration: 0.0 }, 0.61);

      t1.to(line3Ref.current, { text: "Let's get to know each other.", ease: "none", opacity: 1, duration: 0.25 }, 0.62);
      t1.to(line3Ref.current, { opacity: 0, duration: 0.0 }, 0.92);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="h-[500vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} width={1920} height={1080} className="block h-full w-full object-cover"></canvas>
        <p ref={line1Ref} className="font-mono absolute opacity-0 bottom-25 left-10 text-5xl font-bold text-white"></p>
        <p ref={line2Ref} className="font-mono absolute opacity-0 bottom-25 left-10 text-5xl font-bold text-white"></p>
        <p ref={line3Ref} className="font-mono absolute opacity-0 bottom-25 left-10 text-5xl font-bold text-white"></p>
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
          Scroll down to learn more
          <span className="ml-1 inline-block rotate-90"> »</span>
        </p>
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            loadedCount === FRAME_COUNT ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-1 w-60 bg-[#333]">
            <div className="h-full bg-white" style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollHero;
