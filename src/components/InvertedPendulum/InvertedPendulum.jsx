'use client'
import { useEffect, useRef, useLayoutEffect } from "react";
import Lenis from '@studio-freight/lenis'
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect"



export function Basic(props) {
  const content = useRef();
  const wrapper = useRef();
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

      lenis.on('scroll', () => ScrollTrigger.update());

      // Define a function to run at each animation frame
      const scrollFn = (time) => {
        lenis.raf(time); // Run Lenis' requestAnimationFrame method
        requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
      };

      // Start the animation frame loop
      requestAnimationFrame(scrollFn);

       gsap.ticker.add(update)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.current.scroll = value
        }
        return lenis.current.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    })
      const resize = (e) => {
        ScrollTrigger.refresh()
      }

     ScrollTrigger.defaults({ scroller: document.body })
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      gsap.ticker.remove(update)
      lenis.current.destroy()
    }

    }, [wrapper] )

   useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {


        ScrollSmoother.create({
          smooth: 5, // seconds it takes to "catch up" to native scroll position
          effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
          normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
          ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
          preventDefault: true
        
        });



        }, wrapper)
        return () => ctx.revert()

    },[])

    return (
        <div ref={wrapper}>
           <div ref={content} >

           <section>
    <div class=" flex flex-col items-center px-5 py-8 mx-auto">
        <div class="flex flex-col w-full mb-8 prose text-left max-w-max lg:max-w-2xl">
            <div class="w-full mx-auto">
                <h1>A small headline to switch your visitors into users.</h1>
                <h2>A small headline to switch your visitors into users.</h2>
                <p>Right. Say that again. No, no, George, look, it's just an act, right? Okay, so 9:00 you're strolling through the parking lot, you see us struggling in the car, you walk up, you open the door and you say, your line, George. Stop it. We're gonna take a little break but we'll be back in a while so, don't nobody go no where.</p>
            </div>
        </div>
    </div>
    <div class=" items-center w-full px-5">
        <div class="flex flex-wrap justify-center w-full mx-auto prose max-w-max lg:max-w-3xl">
            <div class="relative justify-center lg:px-4">
                <div class="lg:grid lg:grid-cols-2">
                    <div class="p-8">
                        <h1 class="">Short length headline.</h1>
                        <p>You're about to launch soon and must be 100% focused on your product. Don't loose precious days designing, coding the landing page and testing .</p>
                        <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more"> Read More » </a>
                    </div>
                    <div class="p-8">
                        <h1 class="">Short length headline.</h1>
                        <p>You're about to launch soon and must be 100% focused on your product. Don't loose precious days designing, coding the landing page and testing .</p>
                        <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more"> Read More » </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

         </div>
     </div>

    )


}

