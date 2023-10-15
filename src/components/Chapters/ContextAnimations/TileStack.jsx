'use client'
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';

gsap.registerPlugin(Flip, ScrollTrigger);

const TileStack = ({ id, classNames, children }) => {
  const stackRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let galleryEl = stackRef.current;
      const galleryItems = galleryEl.querySelectorAll('.gallery__item');
      const galleryCaption = galleryEl.querySelector('.caption');
  
      // Create Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryEl,
          start: 'center center',
          end: '+=925', // This is where you can fine-tune the end point
          pin: galleryEl,
          pinSpacing: 'none',
          scrub: true,
     
        },
      });
  
      // Animate Gallery Items
      tl.add(
        gsap.to(galleryItems, {
          x: (i, target) => {
            const maxLeft = 35; // stopping point, you can adjust this
            const currentLeft = target.getBoundingClientRect().left;
            return `-=${Math.min(currentLeft, currentLeft - maxLeft)}px`;
          },
          ease: "none",
          stagger: {
            amount: 0.2
          }
        })
      );

      // Create ScrollTrigger for caption
    gsap.fromTo(galleryCaption,{
        left: "100vw"
    },{
        scrollTrigger: {
            trigger: galleryItems[galleryItems.length - 1], // last gallery item
            start: '135% 10vw', // Modify as needed
            end: '+=350', // Modify as needed
            scrub: true,
           
        },
        left: '25vw',
        opacity: 1
    });
  
      return () => tl.kill();
    }, stackRef);
  
    return () => ctx.revert();
  }, []);
  

  return (
    <section id={id} className={classNames} ref={stackRef}>
      {children}
    </section>
  );
};

export default TileStack;