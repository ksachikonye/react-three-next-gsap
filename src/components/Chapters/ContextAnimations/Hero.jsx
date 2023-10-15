'use client'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { useEffect,  useRef} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import useIsomorphicLayoutEffect from "@/animations/useIsomorphicLayoutEffect.js";


export function SplitHeader ( {title1, title2}) {
    const headingRef = useRef();
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollSmoother.create({
              smooth: 5, // seconds it takes to "catch up" to native scroll position
              effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
              normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
              ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
              preventDefault: true
            });
            gsap.set(headingRef.current, {
                yPercent: -150,
                opacity: 1
               });
               tl.current = gsap.timeline();
               let mySplitText = new SplitText( splitRef.current, { type: "words,chars" });
               let chars = mySplitText.chars;
        
               chars.forEach((char, i) => {
               smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
              });
    
             
    
            }, main)
            return () => ctx.revert()
    
        },[])


        return (
            <div ref={headingRef} className="leading-[1.35]" aria-hidden="true">
            <p> {title1}</p>
            <div className="relative">
            <p>{title2}</p>
            <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.95">{title2}</p>
            <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.9">{title2}</p>
            <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.85">{title2}</p>
            <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.8">{title2}</p>
            <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.75">{title2}</p>
            <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.7">{title2}</p>
            </div>
</div> 

        )
                

}

export function Hero({title1, title2, url1, url2, ...props}) {
  const content = useRef()
  const wrapper = useRef()
  const headingRef = useRef();
  const comparisonSectionRef = useRef()
  const containerLeftRef = useRef()
  const containerRightRef = useRef()
  const imageRef = useRef()
  const sectionRef = useRef()
  const sectionImageWrapperRef = useRef()


  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

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
        gsap.set(headingRef.current, {
            yPercent: -150,
            opacity: 1
           });
           tl.current = gsap.timeline();
           let mySplitText = new SplitText( splitRef.current, { type: "words,chars" });
           let chars = mySplitText.chars;
    
           chars.forEach((char, i) => {
           smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
          });

          gsap.utils.toArray(comparisonSectionRef.current).forEach(section => {
            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "center center",
                  // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
                  end: () => "+=" + section.offsetWidth, 
                  scrub: true,
                  pin: true,
                  anticipatePin: 1
                },
                defaults: {ease: "power2.out"}
              });
            // animate the container one way...
            tl.fromTo(section.querySelector(containerRightRef.current), { xPercent: 100, x: 0, duration: 2.5}, {xPercent: 0});
              tl.fromTo(section.querySelector(containerLeftRef.current), {xPercent: -100, x: 0, duration: 2.5}, {xPercent: 0}, 0);
          });
    
    
          gsap.utils.toArray(sectionRef.current).forEach((section, index) => {
            const w = section.querySelector(sectionImageWrapperRef.current);
            const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
            gsap.fromTo(w, { x }, {
              x: xEnd,
              scrollTrigger: {
                trigger: section,
                scrub: 0.5 } });
          });
   

        }, main)
        return () => ctx.revert()

    },[wrapper])
            

  return (
    <>
<div ref={wrapper} {...props}>
           <div ref={content}  >

            
           <div ref={headingRef} className="leading-[1.35]" aria-hidden="true">
                        <p> {title1}</p>
                        <div className="relative">
                        <p>{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.95">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.9">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.85">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.8">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.75">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.7">{title2}</p>
                        </div>
            </div> 

            
            <div className='h-[300vh] bg-[#111] text-[white] overflow-x-hidden' >
                        <section className="relative pb-[56.25%]" ref={comparisonSectionRef}>
                                <div className="w-full h-full">
                                    <img className='w-full h-full absolute top-0' src={url1} alt="before"/>
                                </div>
                                <div className="w-full h-full absolute top-0 absolute overflow-hidden translate-x-full translate-y-0 top-0" ref={containerRightRef}>
                                    <img className='-translate-x-full translate-y-0' src={url2} alt="after" ref={containerLeftRef}/>
                                </div>
                        </section>
                </div>

                    <section className="grid grid-cols-[repeat(2,1fr)] gap-x-4 gap-y-[20vh] items-center justify-items-center mt-[10vh] px-4 py-40 max-w-[1100px] mx-auto my-0">

                                    <div className="col-[2] row-[1]">
                                            <div className="mt-[1em] px-8 py-2 border-l-[solid] border-l-[white]">
                                            <h2>Easy parallax image effects</h2>
                                            <p>Pop your images in a container with overflow hidden, size them a little larger than the container and set data-speed to auto. GSAP does the rest.</p>
                                            </div>
                                    </div>

                                    <div className="image_cont">
                                                <img data-speed="auto" src="https://assets.codepen.io/756881/neon3.jpg" alt=""/>
                                    </div>

                        </section>

                        <section ref={sectionRef} className='text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                                <div className='flex text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                                CHIGURECHINOZIVIKANWANEKUNZICHIGUTIRO
                                </div>
                        </section>
                        <section ref={sectionRef} class='pb-4'>
                                <ul ref={sectionImageWrapperRef} class='flex'>
                                <li>
                                <img  className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=82' width='1240'/>
                                </li>
                                <li>

                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=45' width='1240'/>
                                </li>
                                <li>

                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=193' width='1240'/>
                                </li>
                                <li>
                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=161' width='1240'/>
                                </li>
                                </ul>
                                </section>
                        <section ref={sectionRef} class='pb-4'>
                                    <ul ref={sectionImageWrapperRef}  class='flex'>
                                    <li>
                                    <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=143' width='1240'/>
                                    </li>
                                    <li>
                                    <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=25' width='1240'/>
                                    </li>
                                    <li>
                                    <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=195' width='1240'/>
                                    </li>
                                    </ul>
                        </section>
                        <section ref={sectionRef} class='pb-4'>
                            <ul ref={sectionImageWrapperRef}  class='flex'>
                                <li>
                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=6' width='1240'/>
                                </li>
                                <li>
                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=73' width='1240'/>
                                </li>
                                <li>
                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=23' width='1240'/>
                                </li>
                                <li>
                                <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=110' width='1240'/>
                                </li>
                             </ul>
                            </section>
                            <section ref={sectionRef} class='pb-4'>
                                        <ul ref={sectionImageWrapperRef}  class='flex'>
                                        <li>
                                        <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=205' width='1240'/>
                                        </li>
                                        <li>
                                        <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=194' width='1240'/>
                                        </li>
                                        <li>
                                        <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=139' width='1240'/>
                                        </li>
                                        <li>
                                        <img className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=65' width='1240'/>
                                        </li>
                                        </ul>
                            </section>
                        <section ref={sectionRef} className='text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                                <div className='flex text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                                CHIGURECHEMAPANGAMAOKOMUDENGA
                                </div>
                        </section>

         </div>
     </div>


    </>
  )
}