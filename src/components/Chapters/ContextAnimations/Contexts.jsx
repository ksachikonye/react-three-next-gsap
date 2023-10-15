'use client'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { useEffect,  useRef} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from "gsap/SplitText";
import useIsomorphicLayoutEffect from "@/animations/useIsomorphicLayoutEffect.js";
import ShuffleTextInOut from '@/animations/ShuffleTextInOut';
import FadeInOut from '@/animations/FadeInOut';
import Slider from '@/animations/Slider';
import ScaleInOut from '@/animations/ScaleInOut';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export function LoadingPanels( {imageUrl, heading}) {
  const fromLeftRef = useRef()
  const loaderRef = useRef()
  const fromLeftTileRef = useRef()
  const bannerRef = useRef();
  const bannerImageRef = useRef();
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
          duration: 0.9,
          opacity: 0,
          y: 10,
        });
      
        let tl1 = gsap.timeline({ ease: "power4.inOut", paused: "true" });

        tl1.set(fromLeftRef.current, { pointerEvents: "none" });
        tl1.to(fromLeftTileRef.current, {
          duration: 1.9,
          width: "100%",
          left: "0%",

          // stagger: 0.05,
        });
        tl1.to(fromLeftTileRef.current, {
          duration: 1.7,
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
          duration: 1.3,
          y: -2000,
          ease: "Power4.out",
          delay: 0.4,
        });
        welcomeScreen.from(
          bannerImageRef.current,
          {
            y: 500,
            duration: 1.2,
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
            duration: 1.2,
            stagger: {
              amount: 0.2,
            },
          },
          "-=.2"
        );
        }, main)
        return () => ctx.revert()

    },[])

    return (
        <div>
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

                                <div className="fixed w-2 h-2 leading-6 bg-white cursor-none text-neutral-800">
                                    <header className="header js-active-header">
                                      <div className="relative" > 
                                        <div className="relative leading-6 cursor-none text-neutral-800">
                                          <div className="fixed w-2 h-2 leading-6 bg-white cursor-none text-neutral-800">
                                            <div className="flex-shrink-0 px-3 mt-0 w-full max-w-full leading-6 lg:w-1/2 lg:flex-nonecursor-none text-neutral-800">
                                              <div className="absolute top-[20%]">

                                              <ShuffleTextInOut
                                                    delay={0.3}
                                                    target="#animations"
                                                    watch
                                                >
                                                <h2 id="animations" className="mt-0 mb-2 text-9xl font-extrabold text-white xl:text-3xl cursor-none" ref={bannerRef}>{heading} </h2>

                                                </ShuffleTextInOut>
                                                
                                               
                                                <a href="#" className="no-underline leading-[60px] text-white font-extrabold uppercase relative px-0 py-2"><b></b>Reversed Bullet</a>
                                              </div>
                                            </div>
                                            <div className="relative leading-6 cursor-none text-neutral-800">
                                              <Image className="w-full h-full leading-6 align-middle cursor-none text-neutral-800" src={imageUrl}  ref={bannerImageRef}/>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                    </header>
                                    
                                  </div>
                             </section>     
            
             </div>
    )

}

export function SplittingHeader({ title1, title2}){
    const headingRef = useRef();
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
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
        <div>
                <div ref={headingRef} className="leading-[1.35]" aria-hidden="true">
                        <p>{title1}</p>
                        <div className="relative">
                        <p>{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.95">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.9">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.85">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.8">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.75">{title2}</p>
                        <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.7">{title2}</p>
                        </div>
            </div> </div>
    )
}



export function AnimatedTextSections ({heading, subHead, left, right}) {
    const contentSectionRef = useRef()
    const sectionTitlesRef = useRef()
    const animatedRef = useRef()
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
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
        <section className="w-full flex flex-wrap px-0 py-[150px]">
        <div className="container">
          <div className="row">
            <div className="col-12 " ref={animatedRef}>
              <div className="w-full flex flex-wrap mb-[50px]" ref={sectionTitlesRef}>
                <h5 className="text-xs tracking-[3px] inline-block relative">{heading}</h5>
                <h2 className="w-full text-[54px] font-extrabold leading-[1.4] z-[2] mb-0 pr-[10%]">{subHead}</h2>
              </div>
            </div>
          
            <div className="col-lg-7 " ref={animatedRef}>
              <p className="text-[17px] leading-[1.7] font-extrabold mb-5">{left}
              </p>
            
            </div>
      
            <div className="col-lg-5 " ref={animatedRef}>
              <p className="text-[17px] leading-[1.7] font-extrabold mb-5">{right}</p>
            </div>

          </div>
    
        </div>

      </section>
    )

}


export function Comparison({beforeImage, afterImage}) {
    const comparisonSectionRef = useRef()
    const containerLeftRef = useRef()
    const containerRightRef = useRef()
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
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
                  // ...and the image the opposite way (at the same time)
                  tl.fromTo(section.querySelector(containerLeftRef.current), {xPercent: -100, x: 0, duration: 2.5}, {xPercent: 0}, 0);
              });
    
            }, main)
            return () => ctx.revert()
    
        },[])


    return (
        
        <div className='h-[300vh] bg-[#111] text-[white] overflow-x-hidden' >
        <section className="relative pb-[56.25%]" ref={comparisonSectionRef}>
                <div className="w-full h-full">
                    <img className='w-full h-full absolute top-0' src={beforeImage} alt="before"/>
                </div>
                <div className="w-full h-full absolute top-0 absolute overflow-hidden translate-x-full translate-y-0 top-0" ref={containerRightRef}>
                    <img className='-translate-x-full translate-y-0' src={afterImage} alt="after" ref={containerLeftRef}/>
                </div>
        </section>
</div>
    )

}


export function HorizontalParallax( {imageList}) {

}

export function HoriontalAnimation({imageList}) {

}