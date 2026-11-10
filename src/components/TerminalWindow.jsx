import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function TerminalWindow(props) {
  const starPointRef = useRef(null);
  const textRef = useRef(null);
  const childrenRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: starPointRef.current, start: "top 70%", once: true },
      });

      tl.to(textRef.current, {
        text: `Hayoung Selina Lee ~/${props.title} % show ${props.title}`,
        duration: 1.5,
        opacity: 1,
        ease: "none",
      });

      tl.to(childrenRef.current, {
        duration: 2,
        opacity: 1,
        ease: "none",
      });
    },
    { scope: starPointRef },
  );

  return (
    <div className="h-[80vh] mx-2 rounded-lg border-2 border-white/20 overflow-hidden">
      <div className="flex gap-2 p-3 bg-white/10 items-center">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-2 font-mono text-sm text-white/60">{props.title}</div>
      </div>
      <div ref={starPointRef} className="px-6 font-mono text-white">
        Hayoung Selina Lee ~ % cd {props.title}
      </div>
      <div ref={textRef} className="px-6  opacity-0 font-mono text-white"></div>
      <div ref={childrenRef} className="pt-10 p-6  opacity-0 font-mono text-white">
        {props.children}
      </div>
    </div>
  );
}

export default TerminalWindow;
