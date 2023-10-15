'use client'
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';

gsap.registerPlugin(Flip, ScrollTrigger);

const Gallery = ({ id, classNames, children }) => {
  const galleryRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let galleryEl = galleryRef.current;
      const galleryItems = galleryEl.querySelectorAll('.gallery__item:not(.gallery__item--center)');
      const galleryCaption = galleryEl.querySelector('.caption');
      const galleryCenterItem = galleryEl.querySelector('.gallery__item--center');
  
      // Create Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryEl,
          start: 'center center',
          end: '+=525', // This is where you can fine-tune the end point
          pin: galleryEl,
          pinSpacing: 'none',
          scrub: true,
      
        },
      });
  
      // Animate Caption
      tl.to(galleryCaption, { bottom: 0, opacity: 1 });
  
      // Animate Gallery Items - Non-Center
      tl.to(
        galleryItems,
        {
          height: '10vh',
          width: '10vh',
          filter: 'brightness(1)',
        },
        0
      );
  
      // Animate Gallery Item - Center
      tl.to(
        galleryCenterItem,
        {
          height: '100vh',
          width: '100vw',
          filter: 'brightness(0.5)',
        },
        0
      );
  
      return () => tl.kill();
    }, galleryRef);
  
    return () => ctx.revert();
  }, []);
  

  return (
    <section id={id} className={classNames} ref={galleryRef}>
      {children}
    </section>
  );
};

export default Gallery;
