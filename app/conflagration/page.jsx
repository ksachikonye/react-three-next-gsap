'use client'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { useEffect,  useRef, useContext} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import useIsomorphicLayoutEffect from "@/animations/useIsomorphicLayoutEffect.js";

export function Conflagaration(props) {
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
        const tl = gsap.timeline();

        const welcomeScreen = gsap.timeline({
          paused: "true",
        });
      
        
        tl.from(loaderRef.current, {
          duration: 0.8,
          opacity: 0,
          y: 10,
        });
      
        let tl1 = gsap.timeline({ ease: "power4.inOut", paused: "true" });

        tl1.set(fromLeftRef.current, { pointerEvents: "none" });
        tl1.to(fromLeftTileRef.current, {
          duration: 1.6,
          width: "100%",
          left: "0%",

          // stagger: 0.05,
        });
        tl1.to(fromLeftTileRef.current, {
          duration: 1,
          width: "100%",
          left: "100%",
          stagger: 0.1,
        });
        tl1.set(fromLeftTileRef.current, { left: "0", width: "0" });
        tl1.set(fromLeftRef.current, { pointerEvents: "all" });

        let id,
          i = 0;
        function loader() {
          id = setInterval(frame, 20);
        }
        function frame() {
          if (i >= 100) {
            clearInterval(id);
            tl1.play();
            welcomeScreen.play();
          } else {
            i++;
            loaderRef.current.innerHTML = i + "%";
          }
        }
        window.onload = function () {
          loader();
        };

        welcomeScreen.to(loadingScreenRef.current, {
          duration: 0.8,
          y: -2000,
          ease: "Power4.out",
          delay: 0.4,
        });
        welcomeScreen.from(
          bannerImageRef.current,
          {
            y: 500,
            duration: 0.9,
            stagger: {
              amount: 0.2,
            },
          },
          "-=.2"
        );
        
        welcomeScreen.from(
          bannerRef.current,
          {
            y: 500,
            duration: 0.9,
            stagger: {
              amount: 0.2,
            },
          },
          "-=.2"
        );
        


        const blocks = gsap.utils.toArray(contentSectionRef.current);

        blocks.forEach((block) => {
          const blockTimeline = gsap
            .timeline({
              scrollTrigger: {
                trigger: block,
                start: "top center",
                end: "bottom center",
                toggleActions: "play",
                markers: false,
              },
            })
            // Animate the header items
            .from(block.querySelectorAll(sectionTitlesRef.current), {
              duration: 1.8,
              y: 100,
              opacity: 0,
              stagger: 0.5,
            });

  // Animate the content items
              const items = block.querySelectorAll(animatedRef.current);
              blockTimeline.from(
                items,
                {
                  duration: 1.8,
                  y: 100,
                  opacity: 0,
                  stagger: 0.5,
                },
                0
              );
            });

        }, main)
        return () => ctx.revert()

    },[])
            

  return (
    <>
<div ref={wrapper}>
           <div ref={content} >

           <div className="absolute z-10 w-full h-screen bg-[#222222] text-[white] overflow-hidden" ref={loadingScreenRef}>
             <div className="absolute flex w-full h-screen items-center justify-center">
               <div className="text-[250px] font-bold" ref={loaderRef}></div>
             </div>
           </div>

           <div className="fixed w-full h-full flex z-[999999] pointer-events-none inset-x-0 flex-col" ref={fromLeftRef}>
             <span className="h-full w-[0%]" ref={fromLeftTileRef}></span>
             <span className="h-full w-[0%]" ref={fromLeftTileRef}></span>
             <span className="h-full w-[0%]" ref={fromLeftTileRef}></span>
           </div>
             <section className="overflow-x-hidden cursor-none m-0 bg-[#222222]">

                       <div className="welcome-screen">
                           <header className="header js-active-header">
                             <div className="relative" > 
                               <div className="container">
                                 <div className="row">
                                   <div className="col-lg-6">
                                     <div className="absolute top-[20%]">
                                       <h2 className="text-white text-[110px] font-extrabold" ref={bannerRef}>Digital
                                         <p>done alright.</p>
                                       </h2>
                                       <a href="#" className="no-underline leading-[60px] text-white font-extrabold uppercase relative px-0 py-2"><b>+</b>our solutions</a>
                                     </div>
                                   </div>
                                   <div className="col-lg-6">
                                     <img className="imag" src="https://www.logochemist.com/assets/Layer_1.png"  ref={bannerImageRef}/>
                                   </div>
                                 </div>
                               </div>
                             </div>

                           </header>
                           
                         </div>


                         <section className="w-full flex flex-wrap px-0 py-[150px]" ref={contentSectionRef}>
                           <div className="container">
                             <div className="row">
                               <div className="col-12" ref={animatedRef}>
                                 <div className="w-full flex flex-wrap mb-[50px]" ref={sectionTitlesRef}>
                                   <h5 className="text-xs tracking-[3px] inline-block relative after:content" >DIGITAL MARKETING & CREATIVE AGENCY</h5>
                                   <h2 className="w-full text-[54px] font-extrabold leading-[1.4] z-[2] mb-0 pr-[10%]">We create & design digital products for our best clients.</h2>
                                 </div>
                               </div>
                       
                               <div className="col-lg-7" ref={animatedRef}>
                                 <p>We are your brand's Wingman. We generate ideas that alter perception. Fueled by the desire to make a
                                   lasting impact, we create <strong>experiences</strong> that change the way people
                                   <strong>interact</strong> with brands – and with each other.
                                 </p>
                             
                               </div>

                               <div className="col-lg-5" ref={animatedRef}>
                                 <p>We are <strong>Core Digital Thinkers</strong> &amp; <strong>Creators</strong>. Whether you are after
                                   eye-catching designs or superbly crafted websites, We does it all – but with that all-important
                                   creative difference.</p>
                               </div>
                       
                             </div>

                           </div>

                         </section>

                       
                         </section>
             

         </div>
     </div>


    </>
  )
}