import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 198;

const framePath = (index) => `/frames/f_${String(index).padStart(4, "0")}.webp`;

function ScrollHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);
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

      gsap.to(state, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          //markers: true,
        },
        onUpdate: () => {
          const index = Math.round(state.frame);
          currentFrameRef.current = index;
          drawFrame(index);
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} style={{ height: "500vh", background: "#000" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></canvas>
        <div
          style={{
            position: "absolute",
            display: "flex",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            opacity: loadedCount === FRAME_COUNT ? 0 : 1,
            transition: "opacity 0.5s",
            pointerEvents: loadedCount === FRAME_COUNT ? "none" : "auto",
          }}
        >
          <div style={{ width: 240, height: 4, background: "#333" }}>
            <div
              style={{
                width: `${(loadedCount / FRAME_COUNT) * 100}%`,
                height: "100%",
                background: "#fff",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollHero;
