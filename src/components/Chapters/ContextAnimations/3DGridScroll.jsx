'use client'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { useEffect,  useRef, useContext} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import useIsomorphicLayoutEffect from "@/animations/useIsomorphicLayoutEffect.js";

export function GridScroll(props) {
  const content = useRef()
  const wrapper = useRef()
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


      

        }, main)
        return () => ctx.revert()

    },[])
            

  return (
    <>
<div ref={wrapper}>
           <div ref={content} >

           <main classname="overflow-hidden relative w-full text-white">
  <div classname="grid relative gap-2 place-self-start p-4 w-full text-sm uppercase pointer-events-none md:content-between md:justify-items-start md:gap-8" style={{}} '100%', gridtemplateareas: '"back" "prev" "sponsor"', placeitems: 'center start'}}>
    <a classname="overflow-hidden relative uppercase whitespace-nowrap cursor-pointer pointer-events-auto" href="https://tympanus.net/codrops/?p=73075" style={{}} 'none', outline: 'none'}}>Back to the article</a>
    <a classname="overflow-hidden relative uppercase whitespace-nowrap cursor-pointer pointer-events-auto" href="http://tympanus.net/Development/GridFlowEffect/" style={{}} 'none', outline: gridarea: 'prev prev prev'}}>Previous demo</a>
    <div id="cdawrap" classname="justify-self-start uppercase md:justify-self-end" style={{}} 'sponsor sponsor sponsor'}}>
      <span classname="uppercase">Sponsored by</span>
      <a href="https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=17972_5_1_16" classname="overflow-hidden relative uppercase whitespace-nowrap cursor-pointer pointer-events-auto" target="_blank" rel="nofollow noopener" style={{}} 'none', outline: 'none'}}>Divi</a>
    </div>
  </div>
  <div classname="grid place-items-center text-center" style={{}} '883px', marginbottom: '30vh'}}>
    <h1 classname="grid place-items-center mx-0 mb-0 text-3xl font-normal" style={{}} '0.9', margintop: '15vh'}}>
      <span classname="font-light text-yellow-700 uppercase" style={{}} '72px'}}>On-Scroll</span>
      <span classname="my-0 mx-auto" style={{}} '15ch', lineheight: '115.2px'}}>Perspective Grid Animations</span>
    </h1>
    <span classname="absolute left-1/2 top-full pb-4 mb-16 w-px h-8 bg-white opacity-60" style={{}} '15ch', lineheight: '1.2', alignself: 'end', content: '""'}}>Scroll moderately to fully experience the animations</span>
  </div>
  <section classname="relative" style={{}} '20vh'}}>
    <div classname="grid place-items-center p-8 w-full" style={{}} '1000px', -gridinnerscale: '0.5'}}>
      <div classname="grid gap-10 w-64" style={{}} 'none', rotate: scale: transform: 'rotatey(25deg)', height: '3870.05px', gridtemplatecolumns: '430.953px 430.953px 430.969px'}}>
        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(944.479%, 0%) translate3d(0px, 0px, -565.08px)'}}>
          <div classname="relative w-64 bg-cover" style={{}} 'url("img 1.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
          </div>
          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(834.811%, 0%) translate3d(0px, 0px, -644.352px)'}}>
            <div classname="relative w-64 bg-cover" style={{}} 'url("img 2.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
            </div>
            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(697.351%, 0%) translate3d(0px, 0px, -333.165px)'}}>
              <div classname="relative w-64 bg-cover" style={{}} 'url("img 3.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
              </div>
              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(868.115%, 0%) translate3d(0px, 0px, -329.276px)'}}>
                <div classname="relative w-64 bg-cover" style={{}} 'url("img 4.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                </div>
                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(840.194%, 0%) translate3d(0px, 0px, 109.388px)'}}>
                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 5.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                  </div>
                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(725.53%, 0%) translate3d(0px, 0px, -971.264px)'}}>
                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 6.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                    </div>
                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(644.505%, 0%) translate3d(0px, 0px, -1594.33px)'}}>
                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 7.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                      </div>
                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(676.095%, 0%) translate3d(0px, 0px, -783.933px)'}}>
                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 8.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                        </div>
                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(507.44%, 0%) translate3d(0px, 0px, -1329.53px)'}}>
                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 9.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                          </div>
                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(575.347%, 0%) translate3d(0px, 0px, -390.866px)'}}>
                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 10.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                            </div>
                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(565.998%, 0%) translate3d(0px, 0px, -648.037px)'}}>
                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 11.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                              </div>
                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(812.34%, 0%) translate3d(0px, 0px, -1263.73px)'}}>
                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 12.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                </div>
                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(603.843%, 0%) translate3d(0px, 0px, -1592.48px)'}}>
                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 13.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                  </div>
                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(638.071%, 0%) translate3d(0px, 0px, -1469.08px)'}}>
                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 14.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                    </div>
                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(613.845%, 0%) translate3d(0px, 0px, -1441.21px)'}}>
                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 15.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                      </div>
                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(926.558%, 0%) translate3d(0px, 0px, -1028.81px)'}}>
                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 16.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                        </div>
                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(546.852%, 0%) translate3d(0px, 0px, -1009px)'}}>
                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 17.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                          </div>
                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(972.497%, 0%) translate3d(0px, 0px, -1204.01px)'}}>
                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 18.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                            </div>
                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(870.214%, 0%) translate3d(0px, 0px, -93.3979px)'}}>
                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 19.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                              </div>
                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(566.98%, 0%) translate3d(0px, 0px, -1241.84px)'}}>
                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 20.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                </div>
                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(541.985%, 0%) translate3d(0px, 0px, -1568.45px)'}}>
                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 21.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                  </div>
                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(707.893%, 0%) translate3d(0px, 0px, -513.794px)'}}>
                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 22.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                    </div>
                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(555.45%, 0%) translate3d(0px, 0px, 22.5458px)'}}>
                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 23.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                      </div>
                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(702.634%, 0%) translate3d(0px, 0px, -133.096px)'}}>
                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 24.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                        </div>
                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(526.388%, 0%) translate3d(0px, 0px, -264.048px)'}}>
                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 25.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                          </div>
                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(892.183%, 0%) translate3d(0px, 0px, 94.2529px)'}}>
                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 26.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                            </div>
                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(714.848%, 0%) translate3d(0px, 0px, -793.232px)'}}>
                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 27.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                              </div>
                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(872.691%, 0%) translate3d(0px, 0px, -712.939px)'}}>
                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 28.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                                </div>
                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(989.37%, 0%) translate3d(0px, 0px, -393.34px)'}}>
                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 29.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                  </div>
                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(879.663%, 0%) translate3d(0px, 0px, -1248.41px)'}}>
                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 30.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                    </div>
                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(542.13%, 0%) translate3d(0px, 0px, 162.619px)'}}>
                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 31.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                      </div>
                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(711.427%, 0%) translate3d(0px, 0px, -102.325px)'}}>
                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 32.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                                        </div>
                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(624.388%, 0%) translate3d(0px, 0px, -432.669px)'}}>
                                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 33.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                          </div>
                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(568.327%, 0%) translate3d(0px, 0px, -909.573px)'}}>
                                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 34.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                            </div>
                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(828.699%, 0%) translate3d(0px, 0px, -584.535px)'}}>
                                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 35.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                              </div>
                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(667.716%, 0%) translate3d(0px, 0px, 198.926px)'}}>
                                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 36.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                                                </div>
                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(743.414%, 0%) translate3d(0px, 0px, -932.225px)'}}>
                                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 37.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                  </div>
                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(887.008%, 0%) translate3d(0px, 0px, -365.736px)'}}>
                                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 38.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                    </div>
                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(960.291%, 0%) translate3d(0px, 0px, -233.981px)'}}>
                                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 39.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                      </div>
                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(940.326%, 0%) translate3d(0px, 0px, -1042.03px)'}}>
                                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 40.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                                                        </div>
                                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(842.641%, 0%) translate3d(0px, 0px, -1247.55px)'}}>
                                                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 41.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                          </div>
                                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(632.864%, 0%) translate3d(0px, 0px, -1439.53px)'}}>
                                                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 42.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                            </div>
                                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(973.334%, 0%) translate3d(0px, 0px, -1014.04px)'}}>
                                                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 43.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                              </div>
                                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(816.037%, 0%) translate3d(0px, 0px, -481.697px)'}}>
                                                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 44.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                                                                </div>
                                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(975.754%, 0%) translate3d(0px, 0px, -1185.62px)'}}>
                                                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 45.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                                  </div>
                                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(993.654%, 0%) translate3d(0px, 0px, -308.738px)'}}>
                                                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 46.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                                    </div>
                                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(606.672%, 0%) translate3d(0px, 0px, -581.64px)'}}>
                                                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 47.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.594px', backgroundposition: '50% 50%'}}>
                                                                                                      </div>
                                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transform: 'translate(651.305%, 0%) translate3d(0px, 0px, -620.665px)'}}>
                                                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 48.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '574.625px', backgroundposition: '50% 50%'}}>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                    <h3 classname="grid absolute top-1/2 left-1/2 justify-items-end place-items-center py-0 mr-0 mb-0 w-screen h-screen font-light text-right" style={{}} 'start', margintop: '-50vh', marginleft: '-50vw', paddingright: '10vw', paddingleft: '10vw'}}>
                                                                                                      Fleeting moments, <br classname="text-9xl" />existence's dance.
                                                                                                    </h3>
                                                                                                  </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></section>
  <section classname="relative" style={{}} '20vh'}}>
    <div classname="grid place-items-center p-8 w-full" style={{}} '160%', -perspective: '2000px', -gridinnerscale: '0.5', -griditemratio: '0.8', -gridcolumns: 6, -gridgap: '14vw'}}>
      <div classname="grid w-64" style={{}} 'none', rotate: scale: transform: 'rotate(10deg) rotatex(-20deg) scale(1.2, 1.2)', height: '4545.58px', gridtemplatecolumns: '266.391px 266.406px 266.391px 266.406px', gap: '268.8px'}}>
        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -661.339%) translate3d(0px, 0px, -1437.87px) rotatey(45deg)'}}>
          <div classname="relative w-64 bg-cover" style={{}} 'url("img 1.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
          </div>
          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -194.942%) translate3d(0px, 0px, -2009.67px) rotatey(45deg)'}}>
            <div classname="relative w-64 bg-cover" style={{}} 'url("img 2.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
            </div>
            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -474.123%) translate3d(0px, 0px, -2944.57px) rotatey(45deg)'}}>
              <div classname="relative w-64 bg-cover" style={{}} 'url("img 3.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
              </div>
              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -949.94%) translate3d(0px, 0px, -2765.1px) rotatey(45deg)'}}>
                <div classname="relative w-64 bg-cover" style={{}} 'url("img 4.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                </div>
                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -878.95%) translate3d(0px, 0px, -2230.3px) rotatey(45deg)'}}>
                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 5.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                  </div>
                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -245.749%) translate3d(0px, 0px, -2306.93px) rotatey(45deg)'}}>
                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 6.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                    </div>
                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -432.298%) translate3d(0px, 0px, -2440.48px) rotatey(45deg)'}}>
                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 7.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                      </div>
                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -418.29%) translate3d(0px, 0px, -1144.44px) rotatey(45deg)'}}>
                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 8.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                        </div>
                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -458.339%) translate3d(0px, 0px, -2848.03px) rotatey(45deg)'}}>
                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 9.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                          </div>
                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -925.147%) translate3d(0px, 0px, -2009.61px) rotatey(45deg)'}}>
                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 10.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                            </div>
                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -471.216%) translate3d(0px, 0px, -1076.31px) rotatey(45deg)'}}>
                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 11.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                              </div>
                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -769.652%) translate3d(0px, 0px, -2439.13px) rotatey(45deg)'}}>
                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 12.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                </div>
                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -998.775%) translate3d(0px, 0px, -2313.86px) rotatey(45deg)'}}>
                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 13.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                  </div>
                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -334.332%) translate3d(0px, 0px, -2604.36px) rotatey(45deg)'}}>
                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 14.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                    </div>
                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -306.429%) translate3d(0px, 0px, -2762.53px) rotatey(45deg)'}}>
                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 15.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                      </div>
                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -676.934%) translate3d(0px, 0px, -1248.68px) rotatey(45deg)'}}>
                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 16.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                        </div>
                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -915.8%) translate3d(0px, 0px, -1442.5px) rotatey(45deg)'}}>
                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 17.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                          </div>
                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -728.491%) translate3d(0px, 0px, -1189.38px) rotatey(45deg)'}}>
                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 18.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                            </div>
                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -372.802%) translate3d(0px, 0px, -2755.26px) rotatey(45deg)'}}>
                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 19.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                              </div>
                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -179.071%) translate3d(0px, 0px, -2873.3px) rotatey(45deg)'}}>
                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 20.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                </div>
                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -780.425%) translate3d(0px, 0px, -2375.82px) rotatey(45deg)'}}>
                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 21.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                  </div>
                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -151.366%) translate3d(0px, 0px, -2706.73px) rotatey(45deg)'}}>
                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 22.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                    </div>
                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -190.098%) translate3d(0px, 0px, -2064.75px) rotatey(45deg)'}}>
                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 23.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                      </div>
                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -191.914%) translate3d(0px, 0px, -1973.45px) rotatey(45deg)'}}>
                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 24.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                        </div>
                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -953.052%) translate3d(0px, 0px, -1184.43px) rotatey(45deg)'}}>
                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 25.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                          </div>
                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -325.021%) translate3d(0px, 0px, -2078.77px) rotatey(45deg)'}}>
                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 26.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                            </div>
                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -783.039%) translate3d(0px, 0px, -2713.08px) rotatey(45deg)'}}>
                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 27.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                              </div>
                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -498.872%) translate3d(0px, 0px, -2697.53px) rotatey(45deg)'}}>
                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 28.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                </div>
                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -153.269%) translate3d(0px, 0px, -1920.56px) rotatey(45deg)'}}>
                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 29.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                  </div>
                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -324.611%) translate3d(0px, 0px, -1177.22px) rotatey(45deg)'}}>
                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 30.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                    </div>
                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -126.563%) translate3d(0px, 0px, -1102.06px) rotatey(45deg)'}}>
                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 31.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                      </div>
                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -896.527%) translate3d(0px, 0px, -1051.82px) rotatey(45deg)'}}>
                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 32.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                        </div>
                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -178.76%) translate3d(0px, 0px, -2513.75px) rotatey(45deg)'}}>
                                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 33.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                          </div>
                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -115.664%) translate3d(0px, 0px, -2507.88px) rotatey(45deg)'}}>
                                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 34.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                            </div>
                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -579.839%) translate3d(0px, 0px, -2751.71px) rotatey(45deg)'}}>
                                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 35.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                              </div>
                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -593.168%) translate3d(0px, 0px, -1762.82px) rotatey(45deg)'}}>
                                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 36.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                </div>
                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -524.648%) translate3d(0px, 0px, -1726.52px) rotatey(45deg)'}}>
                                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 37.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                                  </div>
                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -974.655%) translate3d(0px, 0px, -2668.03px) rotatey(45deg)'}}>
                                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 38.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                    </div>
                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -702.982%) translate3d(0px, 0px, -2079.8px) rotatey(45deg)'}}>
                                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 39.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                      </div>
                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -214.27%) translate3d(0px, 0px, -2638.75px) rotatey(45deg)'}}>
                                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 40.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                                        </div>
                                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -170.478%) translate3d(0px, 0px, -1829.13px) rotatey(45deg)'}}>
                                                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 41.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                          </div>
                                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -680.152%) translate3d(0px, 0px, -1878.67px) rotatey(45deg)'}}>
                                                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 42.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                            </div>
                                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -379.691%) translate3d(0px, 0px, -2951.44px) rotatey(45deg)'}}>
                                                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 43.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                                              </div>
                                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -608.606%) translate3d(0px, 0px, -1842.78px) rotatey(45deg)'}}>
                                                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 44.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                                </div>
                                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -681.035%) translate3d(0px, 0px, -1376.46px) rotatey(45deg)'}}>
                                                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 45.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                                  </div>
                                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -852.941%) translate3d(0px, 0px, -1337.08px) rotatey(45deg)'}}>
                                                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 46.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '665.969px', backgroundposition: '50% 50%'}}>
                                                                                                    </div>
                                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -437.484%) translate3d(0px, 0px, -2081.7px) rotatey(45deg)'}}>
                                                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 47.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                                      </div>
                                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(0%)', transform: 'translate(0%, -967.754%) translate3d(0px, 0px, -2521.54px) rotatey(45deg)'}}>
                                                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 48.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '666px', backgroundposition: '50% 50%'}}>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                    <h3 classname="grid absolute top-1/2 left-1/2 place-items-center py-0 mr-0 mb-0 w-screen h-screen font-light text-center" style={{}} '-50vh', marginleft: '-50vw', paddingright: '10vw', paddingleft: '10vw'}}>
                                                                                                      Impermanence <br classname="text-9xl" />guides life's river.
                                                                                                    </h3>
                                                                                                  </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></section>
  <section classname="relative" style={{}} '100vh'}}>
    <div classname="grid place-items-center p-8 w-full" style={{}} '105%', -gridcolumns: 8, -perspective: '1500px', -gridinnerscale: '0.5'}}>
      <div classname="grid gap-10 w-64" style={{}} 'none', rotate: scale: transform: 'translate3d(0px, 0px, 6500px)', height: '1023.05px', gridtemplatecolumns: '207.766px 207.781px 207.766px 207.781px'}}>
        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-3.6077%, -1.0178%) translate3d(0px, 0px, -2683.53px)'}}>
          <div classname="relative w-64 bg-cover" style={{}} 'url("img 18.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
          </div>
          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(149.28%, 162.667%) translate3d(0px, 0px, -4638.43px)'}}>
            <div classname="relative w-64 bg-cover" style={{}} 'url("img 29.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
            </div>
            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(125.191%, -118.016%) translate3d(0px, 0px, -2950.34px)'}}>
              <div classname="relative w-64 bg-cover" style={{}} 'url("img 6.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
              </div>
              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(96.7259%, -78.0048%) translate3d(0px, 0px, -3417.62px)'}}>
                <div classname="relative w-64 bg-cover" style={{}} 'url("img 37.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                </div>
                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(44.45%, 171.09%) translate3d(0px, 0px, -4151.76px)'}}>
                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 15.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                  </div>
                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-27.5367%, 5.1751%) translate3d(0px, 0px, -4017.84px)'}}>
                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 32.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                    </div>
                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(51.9434%, -235.735%) translate3d(0px, 0px, -4073.62px)'}}>
                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 41.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                      </div>
                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(17.237%, 195.533%) translate3d(0px, 0px, -4396.65px)'}}>
                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 23.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                        </div>
                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(143.195%, -277.216%) translate3d(0px, 0px, -2937.24px)'}}>
                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 5.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                          </div>
                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(70.2932%, 65.3437%) translate3d(0px, 0px, -4313.6px)'}}>
                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 12.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                            </div>
                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(104.596%, -139.935%) translate3d(0px, 0px, -2708.93px)'}}>
                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 27.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                              </div>
                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-93.9068%, 122.073%) translate3d(0px, 0px, -4295.31px)'}}>
                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 1.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                </div>
                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-12.546%, -237.362%) translate3d(0px, 0px, -2259.74px)'}}>
                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 46.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                  </div>
                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(15.3659%, -56.1215%) translate3d(0px, 0px, -4697.23px)'}}>
                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 35.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                    </div>
                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(119.064%, -157.432%) translate3d(0px, 0px, -4603.08px)'}}>
                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 20.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                      </div>
                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-71.7166%, 49.225%) translate3d(0px, 0px, -2880.38px)'}}>
                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 39.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                        </div>
                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(145.952%, 163.386%) translate3d(0px, 0px, -4486.41px)'}}>
                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 8.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                          </div>
                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-4.4353%, -52.1979%) translate3d(0px, 0px, -4280.61px)'}}>
                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 25.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                            </div>
                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-20.764%, 76.4603%) translate3d(0px, 0px, -2192.41px)'}}>
                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 2.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                              </div>
                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(11.8046%, -150.281%) translate3d(0px, 0px, -3807.55px)'}}>
                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 44.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                </div>
                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-95.1685%, -69.1296%) translate3d(0px, 0px, -3177.68px)'}}>
                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 43.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                  </div>
                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-13.4344%, -177.855%) translate3d(0px, 0px, -2206.84px)'}}>
                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 17.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                    </div>
                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-99.8464%, -68.6722%) translate3d(0px, 0px, -2320.66px)'}}>
                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 26.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                      </div>
                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-3.7105%, -295.294%) translate3d(0px, 0px, -4455.66px)'}}>
                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 11.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                        </div>
                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(6.7818%, -24.7431%) translate3d(0px, 0px, -3669.78px)'}}>
                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 14.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                          </div>
                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-40.5942%, 286.211%) translate3d(0px, 0px, -2124.19px)'}}>
                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 7.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                            </div>
                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(32.6216%, 16.2435%) translate3d(0px, 0px, -2406.2px)'}}>
                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 33.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                              </div>
                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-42.1431%, -109.802%) translate3d(0px, 0px, -2340.85px)'}}>
                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 30.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                </div>
                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-101.018%, -247.4%) translate3d(0px, 0px, -4168.11px)'}}>
                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 10.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                  </div>
                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-31.4677%, -54.1585%) translate3d(0px, 0px, -3364.75px)'}}>
                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 21.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                    </div>
                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(97.7492%, -94.1022%) translate3d(0px, 0px, -2029.84px)'}}>
                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 16.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                      </div>
                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(40.9734%, -88.0187%) translate3d(0px, 0px, -4321.76px)'}}>
                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 31.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                        </div>
                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(65.9978%, -28.8218%) translate3d(0px, 0px, -3776.98px)'}}>
                                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 24.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                          </div>
                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-37.7051%, 225.181%) translate3d(0px, 0px, -2604.76px)'}}>
                                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 36.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                            </div>
                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(114.677%, -246.896%) translate3d(0px, 0px, -4175.89px)'}}>
                                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 42.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                              </div>
                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-129.098%, -99.0893%) translate3d(0px, 0px, -4143.12px)'}}>
                                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 3.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                </div>
                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-39.6515%, 121.745%) translate3d(0px, 0px, -2090.46px)'}}>
                                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 38.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                  </div>
                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-125.603%, 24.4312%) translate3d(0px, 0px, -4674.13px)'}}>
                                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 9.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                                    </div>
                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-42.5841%, -69.9412%) translate3d(0px, 0px, -4650.13px)'}}>
                                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 4.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                      </div>
                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(122.314%, 9.7135%) translate3d(0px, 0px, -2370.55px)'}}>
                                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 40.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                        </div>
                                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-23.724%, 192.646%) translate3d(0px, 0px, -3580.02px)'}}>
                                                                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 28.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                                          </div>
                                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(92.9945%, 60.0028%) translate3d(0px, 0px, -3533.29px)'}}>
                                                                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 22.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                            </div>
                                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(66.3549%, -176.438%) translate3d(0px, 0px, -4304.76px)'}}>
                                                                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 34.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                                              </div>
                                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(119.97%, 110.956%) translate3d(0px, 0px, -2061.64px)'}}>
                                                                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 13.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                                </div>
                                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(109.677%, -31.4759%) translate3d(0px, 0px, -2421.64px)'}}>
                                                                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 19.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                                  </div>
                                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(-60.4206%, 37.8933%) translate3d(0px, 0px, -4176.51px)'}}>
                                                                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 47.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277px', backgroundposition: '50% 50%'}}>
                                                                                                    </div>
                                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(91.363%, 135.095%) translate3d(0px, 0px, -2465.27px)'}}>
                                                                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 45.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                                      </div>
                                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: filter: 'brightness(200%)', transformorigin: '50% 0%', transform: 'translate(110.16%, -43.5518%) translate3d(0px, 0px, -4200.99px)'}}>
                                                                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 48.jpg")', translate: 'none', rotate: scale: transform: 'scale(0.5, 0.5)', height: '277.031px', backgroundposition: '50% 50%'}}>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                    <h3 classname="grid absolute top-1/2 left-1/2 justify-items-start place-items-center py-0 mr-0 mb-0 w-screen h-screen font-light text-left" style={{}} 'end', margintop: '-50vh', marginleft: '-50vw', paddingright: '10vw', paddingleft: '10vw'}}>
                                                                                                      Embrace now, <br classname="text-9xl" />tomorrow may fade.
                                                                                                    </h3>
                                                                                                  </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></section>
  <section classname="relative" style={{}} '100vh'}}>
    <div classname="grid place-items-center p-8 w-full" style={{}} '50%', -perspective: '3000px', -griditemratio: '0.8', -gridcolumns: 3, -gridgap: '1vw'}}>
      <div classname="grid gap-5 w-64" style={{}} 'none', rotate: scale: transformorigin: '0% 50%', transform: 'translate(-75%, 0%) rotatey(30deg)', height: '3071.44px', gridtemplatecolumns: '293.703px 293.703px 293.719px'}}>
        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
          <div classname="relative w-64 bg-cover" style={{}} 'url("img 3.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
          </div>
          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
            <div classname="relative w-64 bg-cover" style={{}} 'url("img 21.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
            </div>
            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
              <div classname="relative w-64 bg-cover" style={{}} 'url("img 16.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
              </div>
              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                <div classname="relative w-64 bg-cover" style={{}} 'url("img 24.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                </div>
                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 9.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                  </div>
                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 7.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                    </div>
                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 15.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                      </div>
                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 19.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                        </div>
                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 6.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                          </div>
                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 8.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                            </div>
                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 17.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                              </div>
                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 5.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                                </div>
                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 18.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                  </div>
                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 13.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                    </div>
                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 4.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                                      </div>
                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 14.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                        </div>
                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 1.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                          </div>
                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 2.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                                            </div>
                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 11.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                              </div>
                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 20.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                                </div>
                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 23.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                                                  </div>
                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 10.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                                    </div>
                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 22.jpg")', height: '367.125px', backgroundposition: '50% 50%'}}>
                                                      </div>
                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'none', rotate: scale: transformorigin: '50% 0%', filter: 'brightness(0%)', transform: 'rotatex(70deg)'}}>
                                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 12.jpg")', height: '367.141px', backgroundposition: '50% 50%'}}>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <h3 classname="grid absolute top-1/2 left-1/2 justify-items-end place-items-center py-0 mr-0 mb-0 w-screen h-screen font-light text-right" style={{}} '-50vh', marginleft: '-50vw', paddingright: '10vw', paddingleft: '10vw'}}>
                                                      Now unfolds <br classname="text-9xl" />eternity's grace
                                                    </h3>
                                                  </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></section>
  <section classname="relative" style={{}} '100vh'}}>
    <div classname="grid place-items-center p-8 w-full" style={{}} '120%', -gridcolumns: 8, -gridgap: 0}}>
      <div classname="grid gap-0 w-64" style={{}} 'none', rotate: scale: transform: 'rotatex(30deg)', height: '1103.44px', gridtemplatecolumns: '275.844px 275.844px 275.859px 275.859px'}}>
        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 17.7569%)'}}>
          <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 18.jpg")', backgroundposition: '50% 50%'}}>
          </div>
          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 65.8958%)'}}>
            <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 29.jpg")', backgroundposition: '50% 50%'}}>
            </div>
            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 160.989%)'}}>
              <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 6.jpg")', backgroundposition: '50% 50%'}}>
              </div>
              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -8.8905%)'}}>
                <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 37.jpg")', backgroundposition: '50% 50%'}}>
                </div>
                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -14.5154%)'}}>
                  <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 15.jpg")', backgroundposition: '50% 50%'}}>
                  </div>
                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -48.3519%)'}}>
                    <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 32.jpg")', backgroundposition: '50% 50%'}}>
                    </div>
                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 133.063%)'}}>
                      <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 41.jpg")', backgroundposition: '50% 50%'}}>
                      </div>
                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 32.3069%)'}}>
                        <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 23.jpg")', backgroundposition: '50% 50%'}}>
                        </div>
                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -36.9645%)'}}>
                          <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 5.jpg")', backgroundposition: '50% 50%'}}>
                          </div>
                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 107.672%)'}}>
                            <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 12.jpg")', backgroundposition: '50% 50%'}}>
                            </div>
                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -92.3909%)'}}>
                              <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 27.jpg")', backgroundposition: '50% 50%'}}>
                              </div>
                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 133.589%)'}}>
                                <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 1.jpg")', backgroundposition: '50% 50%'}}>
                                </div>
                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 8.2921%)'}}>
                                  <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 46.jpg")', backgroundposition: '50% 50%'}}>
                                  </div>
                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 2.8788%)'}}>
                                    <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 35.jpg")', backgroundposition: '50% 50%'}}>
                                    </div>
                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 131.172%)'}}>
                                      <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 20.jpg")', backgroundposition: '50% 50%'}}>
                                      </div>
                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -16.6352%)'}}>
                                        <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 39.jpg")', backgroundposition: '50% 50%'}}>
                                        </div>
                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 84.538%)'}}>
                                          <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 8.jpg")', backgroundposition: '50% 50%'}}>
                                          </div>
                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 38.2354%)'}}>
                                            <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 25.jpg")', backgroundposition: '50% 50%'}}>
                                            </div>
                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 163.475%)'}}>
                                              <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 2.jpg")', backgroundposition: '50% 50%'}}>
                                              </div>
                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -59.8295%)'}}>
                                                <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 44.jpg")', backgroundposition: '50% 50%'}}>
                                                </div>
                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 170.947%)'}}>
                                                  <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 43.jpg")', backgroundposition: '50% 50%'}}>
                                                  </div>
                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -60.3596%)'}}>
                                                    <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 17.jpg")', backgroundposition: '50% 50%'}}>
                                                    </div>
                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 67.9558%)'}}>
                                                      <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 26.jpg")', backgroundposition: '50% 50%'}}>
                                                      </div>
                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 45.6153%)'}}>
                                                        <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 11.jpg")', backgroundposition: '50% 50%'}}>
                                                        </div>
                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -63.6409%)'}}>
                                                          <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 14.jpg")', backgroundposition: '50% 50%'}}>
                                                          </div>
                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 162.945%)'}}>
                                                            <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 7.jpg")', backgroundposition: '50% 50%'}}>
                                                            </div>
                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -30.5123%)'}}>
                                                              <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 33.jpg")', backgroundposition: '50% 50%'}}>
                                                              </div>
                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 59.0209%)'}}>
                                                                <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 30.jpg")', backgroundposition: '50% 50%'}}>
                                                                </div>
                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -19.861%)'}}>
                                                                  <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 10.jpg")', backgroundposition: '50% 50%'}}>
                                                                  </div>
                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 45.087%)'}}>
                                                                    <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 21.jpg")', backgroundposition: '50% 50%'}}>
                                                                    </div>
                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 73.978%)'}}>
                                                                      <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 16.jpg")', backgroundposition: '50% 50%'}}>
                                                                      </div>
                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 113.007%)'}}>
                                                                        <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 31.jpg")', backgroundposition: '50% 50%'}}>
                                                                        </div>
                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 123.571%)'}}>
                                                                          <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 24.jpg")', backgroundposition: '50% 50%'}}>
                                                                          </div>
                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 164.388%)'}}>
                                                                            <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 36.jpg")', backgroundposition: '50% 50%'}}>
                                                                            </div>
                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -4.2865%)'}}>
                                                                              <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 42.jpg")', backgroundposition: '50% 50%'}}>
                                                                              </div>
                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -8.0137%)'}}>
                                                                                <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 3.jpg")', backgroundposition: '50% 50%'}}>
                                                                                </div>
                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 191.393%)'}}>
                                                                                  <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 38.jpg")', backgroundposition: '50% 50%'}}>
                                                                                  </div>
                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 37.3581%)'}}>
                                                                                    <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 9.jpg")', backgroundposition: '50% 50%'}}>
                                                                                    </div>
                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, 106.511%)'}}>
                                                                                      <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 4.jpg")', backgroundposition: '50% 50%'}}>
                                                                                      </div>
                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(-100%, -48.9688%)'}}>
                                                                                        <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 40.jpg")', backgroundposition: '50% 50%'}}>
                                                                                        </div>
                                                                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 188.888%)'}}>
                                                                                          <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 28.jpg")', backgroundposition: '50% 50%'}}>
                                                                                          </div>
                                                                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -74.5116%)'}}>
                                                                                            <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 22.jpg")', backgroundposition: '50% 50%'}}>
                                                                                            </div>
                                                                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -40.1947%)'}}>
                                                                                              <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 34.jpg")', backgroundposition: '50% 50%'}}>
                                                                                              </div>
                                                                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 72.3727%)'}}>
                                                                                                <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 13.jpg")', backgroundposition: '50% 50%'}}>
                                                                                                </div>
                                                                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -29.6654%)'}}>
                                                                                                  <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 19.jpg")', backgroundposition: '50% 50%'}}>
                                                                                                  </div>
                                                                                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -10.5846%)'}}>
                                                                                                    <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 47.jpg")', backgroundposition: '50% 50%'}}>
                                                                                                    </div>
                                                                                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, -23.5875%)'}}>
                                                                                                      <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 45.jpg")', backgroundposition: '50% 50%'}}>
                                                                                                      </div>
                                                                                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg" style={{}} 'brightness(100%)', translate: 'none', rotate: scale: transform: 'translate(100%, 174.864%)'}}>
                                                                                                        <div classname="relative w-64 h-48 bg-cover" style={{}} 'url("img 48.jpg")', backgroundposition: '50% 50%'}}>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                    <h3 classname="grid absolute top-1/2 left-1/2 place-items-center py-0 mr-0 mb-0 w-screen h-screen font-light text-center" style={{}} '-50vh', marginleft: '-50vw', paddingright: '10vw', paddingleft: '10vw'}}>
                                                                                                      An infinite universe<br classname="text-9xl" />
                                                                                                      of moments unfolding
                                                                                                    </h3>
                                                                                                  </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></section>
  <section classname="relative" style={{}} '100vh'}}>
    <div classname="grid place-items-center p-8 w-full" style={{}} '2500px', -gridwidth: '100%', -gridgap: 6, -gridcolumns: 3, -griditemratio: 1}}>
      <div classname="grid w-64" style={{}} '4291px', gridtemplatecolumns: '613px 613px 613px', gap: 'normal'}}>
        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
          <div classname="relative w-64 bg-cover" style={{}} 'url("img 18.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
          </div>
          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
            <div classname="relative w-64 bg-cover" style={{}} 'url("img 5.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
            </div>
            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
              <div classname="relative w-64 bg-cover" style={{}} 'url("img 8.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
              </div>
              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                <div classname="relative w-64 bg-cover" style={{}} 'url("img 43.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                </div>
                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 34.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                  </div>
                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 21.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                    </div>
                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 39.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                      </div>
                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 6.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                        </div>
                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 13.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                          </div>
                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 47.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                            </div>
                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 10.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                              </div>
                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 45.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                </div>
                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 27.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                  </div>
                                  <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                    <div classname="relative w-64 bg-cover" style={{}} 'url("img 31.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                    </div>
                                    <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                      <div classname="relative w-64 bg-cover" style={{}} 'url("img 28.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                      </div>
                                      <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                        <div classname="relative w-64 bg-cover" style={{}} 'url("img 30.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                        </div>
                                        <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                          <div classname="relative w-64 bg-cover" style={{}} 'url("img 36.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                          </div>
                                          <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                            <div classname="relative w-64 bg-cover" style={{}} 'url("img 14.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                            </div>
                                            <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                              <div classname="relative w-64 bg-cover" style={{}} 'url("img 23.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                              </div>
                                              <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                                <div classname="relative w-64 bg-cover" style={{}} 'url("img 35.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                                </div>
                                                <div classname="grid overflow-hidden relative place-items-center w-full h-auto rounded-lg opacity-20" style={{}} 'none', rotate: scale: transformorigin: '50% 200%', transform: 'rotatey(360deg) scale(0.8, 0.8)', opacity: '0.2'}}>
                                                  <div classname="relative w-64 bg-cover" style={{}} 'url("img 19.jpg")', height: '613px', backgroundposition: '50% 50%'}}>
                                                  </div>
                                                </div>
                                              </div>
                                              <h3 classname="grid absolute top-1/2 left-1/2 place-items-center py-0 mr-0 mb-0 w-screen h-screen font-light text-center" style={{}} '-50vh', marginleft: '-50vw', paddingright: '10vw', paddingleft: '10vw'}}>
                                                Seasons shift, <br classname="text-9xl" />moments flow.
                                              </h3>
                                            </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></section>
  <section classname="grid place-items-center mx-0" style={{}} '40vh', marginbottom: '40vh'}}>
    <h2 classname="text-2xl font-bold">More you might like</h2>
    <div classname="grid grid-flow-row gap-8" style={{}} '5vh', gridtemplatecolumns: '250px'}}>
      <div classname>
        <a href="http://tympanus.net/Development/ScrollBasedLayoutAnimations/" classname="block w-full h-auto bg-cover rounded-md cursor-pointer" style={{}} 'url("https: tympanus.net codrops wp-content uploads 2023 07 scrollbased.jpg")', textdecoration: 'none', outline: backgroundposition: '50% 50%', filter: 'contrast(0.8)'}}>
        </a><h3 classname="text-lg font-bold"><a href="http://tympanus.net/Development/ScrollBasedLayoutAnimations/" classname="block w-full h-auto bg-cover rounded-md cursor-pointer" style={{}} 'url("https: tympanus.net codrops wp-content uploads 2023 07 scrollbased.jpg")', textdecoration: 'none', outline: backgroundposition: '50% 50%', filter: 'contrast(0.8)'}}>
          </a><a href="http://tympanus.net/Development/ScrollBasedLayoutAnimations/" classname="cursor-pointer" style={{}} 'none', outline: 'none'}}>Scroll-Based Layout Animations</a>
        </h3>
      </div>
      <div classname>
        <a href="http://tympanus.net/Development/OnScrollFilter/" classname="block w-full h-auto bg-cover rounded-md cursor-pointer" style={{}} 'url("https: tympanus.net codrops wp-content uploads 2023 07 onscrollfilter_feat-2.jpg")', textdecoration: 'none', outline: backgroundposition: '50% 50%', filter: 'contrast(0.8)'}}>
        </a><h3 classname="text-lg font-bold"><a href="http://tympanus.net/Development/OnScrollFilter/" classname="block w-full h-auto bg-cover rounded-md cursor-pointer" style={{}} 'url("https: tympanus.net codrops wp-content uploads 2023 07 onscrollfilter_feat-2.jpg")', textdecoration: 'none', outline: backgroundposition: '50% 50%', filter: 'contrast(0.8)'}}>
          </a><a href="http://tympanus.net/Development/OnScrollFilter/" classname="cursor-pointer" style={{}} 'none', outline: 'none'}}>On-Scroll SVG Filter Effect</a>
        </h3>
      </div>
      <div classname>
        <a href="http://tympanus.net/Tutorials/OnScrollPathAnimations/" classname="block w-full h-auto bg-cover rounded-md cursor-pointer" style={{}} 'url("https: tympanus.net codrops wp-content uploads 2022 06 onscrollshapeanimation_feat.jpg")', textdecoration: 'none', outline: backgroundposition: '50% 50%', filter: 'contrast(0.8)'}}>
        </a><h3 classname="text-lg font-bold"><a href="http://tympanus.net/Tutorials/OnScrollPathAnimations/" classname="block w-full h-auto bg-cover rounded-md cursor-pointer" style={{}} 'url("https: tympanus.net codrops wp-content uploads 2022 06 onscrollshapeanimation_feat.jpg")', textdecoration: 'none', outline: backgroundposition: '50% 50%', filter: 'contrast(0.8)'}}>
          </a><a href="http://tympanus.net/Tutorials/OnScrollPathAnimations/" classname="cursor-pointer" style={{}} 'none', outline: 'none'}}>How to Animate SVG Shapes on Scroll</a>
        </h3>
      </div>
    </div>
  </section>
  <p classname="mx-auto mb-0 text-2xl text-center" style={{}} '50vh', margintop: '50vh'}}>
    Made by
    <a href="https://twitter.com/codrops" classname="text-white cursor-pointer" style={{}} 'none', outline: 'none'}}>@codrops</a>
  </p>
</main>
             

         </div>
     </div>


    </>
  )
}