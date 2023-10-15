'use client'
import { useEffect, useRef } from "react";
import Lenis from '@studio-freight/lenis'
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect"



export function Anatomy(props) {
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
        <div ref={wrapper} {...props}>
           <div ref={content} >

           <div class=" w-full px-5 py-24 mx-auto lg:px-32">
    <div class="flex flex-col w-full mx-auto mb-2 prose text-left prose-md">
        <div class="mb-5 border-b border-gray-200">
            <div class="flex flex-wrap items-baseline -mt-2">
                <h5>12-03-2021</h5>
                <p class="mt-1 ml-2">Transitions</p>
            </div>
        </div>
        <h1>Page transitions are a fundamental part of website navigation and user experience.</h1>
        <p>Through the lens of a set of certitudes based on deductions founded on false premise.</p>
        <p>Turd polishing put a record on and see who dances, dog and pony show, nor one-sheet. Ensure to follow requirements when developing solutions three-martini lunch, that jerk from finance really threw me under the bus. Bob called an all-hands this afternoon.</p>
        <p>We've got kpis for that this is a no-brainer viral engagement pixel pushing. Run it up the flagpole please use "solutionise" instead of solution ideas! :) dunder mifflin form without content style without meaning target rich environment. Three-martini lunch. Get buy-in prioritize these line items, or deliverables yet back to the drawing-board let's put a pin in that, close the loop. Manage expectations product market fit win-win-win. The horse is out of the barn poop, but can you put it on my calendar? but drink from the firehose, but quick-win.</p>
        <h1>"Focus on the customer journey"</h1>
        <p>If you could do that, that would be great this is a no-brainer, or Q1 regroup. Groom the backlog what do you feel you would bring to the table if you were hired for this position. Back of the net. Scope creep can you slack it to me? shotgun approach build on a culture of contribution and inclusion please advise soonest.</p>
        <h3>Is a no-brainer, or Q1 regroup.</h3>
        <p>Gain traction make it more corporate please we need to harvest synergy effects not enough bandwidth, and we want to empower the team with the right tools and guidance to uplevel our craft and build better nor low-hanging fruit the right info at the right time to the right people.</p>
    </div>
</div>

         </div>
     </div>

    )


}

