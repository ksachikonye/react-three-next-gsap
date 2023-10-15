import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
/* reusable animations */

gsap.registerPlugin(ScrollTrigger);

export default function skewRevealText (textRef) {
  ScrollTrigger.create({
    trigger: textRef.current,
    start: "center center",
    end: "center center",
    markers: false,
    once: true,
    onEnter: () => {
      gsap.fromTo(
        textRef.current,
        {
          y: 200,
          skewY: 10,
        },
        {
          duration: 0.6,
          y: 0,
          skewY: 0,
          opacity: 1,
        }
      );
    },
  });
};