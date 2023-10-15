'use client'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { useEffect,  useRef, useContext} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import useIsomorphicLayoutEffect from "@/animations/useIsomorphicLayoutEffect.js";

export function Timeline(props) {
  const content = useRef()
  const wrapper = useRef()
  const fromLeftRef = useRef()
  const loaderRef = useRef()
  const fromLeftTileRef = useRef()
  const contentSectionRef = useRef()
  const sectionTitlesRef = useRef()
  const animatedRef = useRef()
  const bannerRef = useRef();
  const bannerImageRef = useRef();
  const loadingScreenRef = useRef();

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    const lenis = useRef(null)

    const update = (time) => {
        lenis.current.raf(time * 1000)
    }

    const resize = () => {
        ScrollTrigger.refresh()
    }
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
        

        }, main)
        return () => ctx.revert()

    },[])
            

  return (
    <>
<div ref={wrapper}>
           <div ref={content} >

        

         </div>
     </div>


    </>
  )
}