'use client'
import React, { useEffect } from 'react';
import Lenis from 'lenis'; // Make sure to import the Lenis library
import { preloadImages } from './utils.js'; // Import your image preloading function
import { Flip } from "gsap/Flip"; // Import the Flip module from GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import the ScrollTrigger module from GSAP

const ScrollBasedAnimations = () => {
  const content = useRef()
  const wrapper = useRef()
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const initSmoothScrolling = () => {
      const lenis = new Lenis({
        lerp: 0.1, // Lower values create a smoother scroll effect
        smoothWheel: true, // Enables smooth scrolling for mouse wheel events
      });

      // Update ScrollTrigger each time the user scrolls
      lenis.on('scroll', () => ScrollTrigger.update());

      // Define a function to run at each animation frame
      const scrollFn = (time) => {
        lenis.raf(time); // Run Lenis' requestAnimationFrame method
        requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
      };

      // Start the animation frame loop
      requestAnimationFrame(scrollFn);
    };

    // Function to trigger Flip animations when scrolling
    const triggerFlipOnScroll = (galleryEl, options) => {
      // Default settings for Flip and ScrollTrigger
      let settings = {
        flip: {
          absoluteOnLeave: false,
          absolute: false,
          scale: true,
          simple: true,
          //...
        },
        scrollTrigger: {
          start: 'center center',
          end: '+=300%',
        },
        stagger: 0,
      };

      // Merge default settings with options provided when calling the function
      settings = { ...settings, ...options };

      // Select elements within the gallery that will be animated
      const galleryCaption = galleryEl.querySelector('.caption');
      const galleryItems = galleryEl.querySelectorAll('.gallery__item');
      const galleryItemsInner = [...galleryItems]
        .map((item) => (item.children.length > 0 ? [...item.children] : []))
        .flat();

      // Temporarily add the final class to capture the final state
      galleryEl.classList.add('gallery--switch');
      const flipstate = Flip.getState([galleryItems, galleryCaption], {
        props: 'filter, opacity',
      });

      // Remove the final class to revert to the initial state
      galleryEl.classList.remove('gallery--switch');

      // Create the Flip animation timeline
      const tl = Flip.to(flipstate, {
        ease: 'none',
        absoluteOnLeave: settings.flip.absoluteOnLeave,
        absolute: settings.flip.absolute,
        scale: settings.flip.scale,
        simple: settings.flip.simple,
        scrollTrigger: {
          trigger: galleryEl,
          start: settings.scrollTrigger.start,
          end: settings.scrollTrigger.end,
          pin: galleryEl.parentNode,
          scrub: true,
        },
        stagger: settings.stagger,
      });

      // If there are inner elements in the gallery items, animate them too
      if (galleryItemsInner.length) {
        tl.fromTo(
          galleryItemsInner,
          {
            scale: 2,
          },
          {
            scale: 1,
            scrollTrigger: {
              trigger: galleryEl,
              start: settings.scrollTrigger.start,
              end: settings.scrollTrigger.end,
              scrub: true,
            },
          },
          0
        );
      }
    };

    // Function to apply scroll-triggered animations to various galleries
    const scroll = () => {
      // Define the gallery IDs and their options
      const galleries = [
        { id: '#gallery-1', options: { flip: { absoluteOnLeave: true, scale: false } } },
        { id: '#gallery-2' },
        { id: '#gallery-3', options: { flip: { absolute: true, scale: false }, scrollTrigger: { start: 'center center', end: '+=900%' }, stagger: 0.05 } },
        { id: '#gallery-4' },
        { id: '#gallery-5' },
        { id: '#gallery-6' },
        { id: '#gallery-7' },
        { id: '#gallery-8', options: { flip: { scale: false } } },
        { id: '#gallery-9' },
      ];

      // Loop through the galleries and apply the scroll-triggered animations
      galleries.forEach((gallery) => {
        const galleryElement = document.querySelector(gallery.id);
        triggerFlipOnScroll(galleryElement, gallery.options);
      });
    };

    // Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
    preloadImages('.gallery__item').then(() => {
      initSmoothScrolling();
      scroll();
      document.body.classList.remove('loading');
    });
  }, []);

  return <div className="App">
    <main className="overflow-hidden relative w-full text-white">
      <div
        className="grid relative gap-2 place-self-start p-4 w-full text-sm opacity-70 pointer-events-none md:content-between md:justify-items-start md:gap-8"
        style={{
          gridTemplateColumns: "100%",
          gridTemplateAreas: '"title" "prev" "sponsor" "demos"',
          placeItems: "center start"
        }}
      >
        <div
          className="flex text-base"
          style={{ gridArea: "title / title / title / title" }}
        >
          <h1 className="m-0">On-Scroll Image Layout Animations</h1>
          <a
            aria-label="Back to the article"
            className="flex relative items-end cursor-pointer pointer-events-auto text-neutral-400 focus:bg-transparent"
            href="https://tympanus.net/codrops/?p=72941"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="hidden">Back to the article</span>
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              className=""
              style={{ fill: "currentcolor" }}
            >
              <path
                vectorEffect="non-scaling-stroke"
                d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                className=""
              />
            </svg>
          </a>
        </div>
        <a
          className="overflow-hidden relative text-base whitespace-nowrap cursor-pointer pointer-events-auto text-neutral-400 focus:bg-transparent"
          href="https://tympanus.net/Development/TextBlockTransitions/"
          style={{
            textDecoration: "none",
            outline: "none",
            gridArea: "prev / prev / prev / prev"
          }}
        >
          Previous demo
        </a>
        <div
          id="cdawrap"
          className="justify-self-start text-base md:justify-self-end"
          style={{ gridArea: "sponsor / sponsor / sponsor / sponsor" }}
        >
          <span className="">Sponsored by</span>
          <a
            href="https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=17972_5_1_16"
            className="overflow-hidden relative whitespace-nowrap cursor-pointer pointer-events-auto text-neutral-400 focus:bg-transparent"
            target="_blank"
            rel="nofollow noopener"
            style={{ textDecoration: "none", outline: "none" }}
          >
            Divi
          </a>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateColumns: "1fr",
          gridTemplateAreas:
            '"label-name" "name" "label-date" "date" "title" "label-mission" "mission"',
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{ gridArea: "label-name / label-name / label-name / label-name" }}
    >
      Project
    </span>
        <span className="" style={{ gridArea: "name / name / name / name" }}>
      AI Art
    </span>
        <span
          className="text-zinc-400 md:text-right"
          style={{ gridArea: "label-date / label-date / label-date / label-date" }}
        >
      Date
    </span>
        <span className="" style={{ gridArea: "date / date / date / date" }}>
      July, 2023
    </span>
        <h2
          className="mx-0 font-normal leading-none"
          style={{
            gridArea: "title / title / title / title",
            marginTop: "10vh",
            marginBottom: "10vh"
          }}
        >
      <span className="" style={{ fontSize: 144, lineHeight: 144 }}>
        Creativity
      </span>
          <span className="" style={{ fontSize: 144, lineHeight: 144 }}>
        Redefined
      </span>
        </h2>
        <span
          className="text-zinc-400 md:text-right"
          style={{
            gridArea:
              "label-mission / label-mission / label-mission / label-mission"
          }}
        >
      Mission
    </span>
        <div
          className="md:grid md:gap-x-8"
          style={{
            gridArea: "mission / mission / mission / mission",
            lineHeight: "1.4"
          }}
        >
          <p
            className="m-0 text-zinc-600"
            style={{ lineHeight: "1.4", gridArea: "p1 / p1 / p1 / p1" }}
          >
            The AI-Art Project is a transformative initiative dedicated to exploring
            the immense impact of AI-generated art on the art world and artists. We
            aim to discover and promote exceptional AI-generated artworks that push
            the boundaries of creativity, redefine traditional practices, and
            provoke thought.
          </p>
          <p className="m-0 text-zinc-600" style={{ lineHeight: "1.4" }}>
            Through collaborations with artists, workshops, and educational
            programs, we empower artists to leverage AI as a tool for exploration,
            expanding their artistic horizons and embracing new forms of expression.
          </p>
        </div>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 mx-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: "372.4px 0px",
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="flex relative flex-none gap-8 justify-center items-center w-full h-full"
            id="gallery-1"
          >
            <div
              className="relative flex-none w-32 h-48 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/6.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(-510px, 0px)",
                width: "124.2px",
                height: "186.2px",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: "124.2px",
                maxHeight: "186.2px",
                minWidth: "124.2px",
                minHeight: "186.2px",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-1"
            />
            <div
              className="relative flex-none w-32 h-48 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/3.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                width: "124.2px",
                height: "186.2px",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: "155.2px",
                maxHeight: "232.8px",
                minWidth: "124.2px",
                minHeight: "186.2px",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-2"
            />
            <div
              className="relative flex-none w-32 h-48 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/4.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                width: "124.2px",
                height: "186.2px",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: "310.4px",
                maxHeight: "465.5px",
                minWidth: "124.2px",
                minHeight: "186.2px",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-3"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/1.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                width: 1920,
                height: 931,
                opacity: 1,
                filter: "brightness(0.5)",
                maxWidth: 1920,
                maxHeight: 931,
                minWidth: "465.5px",
                minHeight: "698.3px",
                backgroundPosition: "50% 50%",
                zIndex: 100
              }}
              data-flip-id="auto-4"
            />
            <div
              className="relative flex-none w-32 h-48 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/5.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                width: "124.2px",
                height: "186.2px",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: "310.4px",
                maxHeight: "465.5px",
                minWidth: "124.2px",
                minHeight: "186.2px",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-5"
            />
            <div
              className="relative flex-none w-32 h-48 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/2.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                width: "124.2px",
                height: "186.2px",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: "155.2px",
                maxHeight: "232.8px",
                minWidth: "124.2px",
                minHeight: "186.2px",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-6"
            />
            <div
              className="relative flex-none w-32 h-48 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/6.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(510px, 0px)",
                width: "124.2px",
                height: "186.2px",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: "124.2px",
                maxHeight: "186.2px",
                minWidth: "124.2px",
                minHeight: "186.2px",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-7"
            />
            <div
              className="absolute left-0 w-64 font-normal opacity-100 filter-none"
              data-flip-id="auto-8"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, -466px)",
                width: 730,
                height: "424.8px",
                opacity: 1,
                filter: "none",
                maxWidth: 730,
                maxHeight: "424.8px",
                minWidth: 730,
                minHeight: "424.8px",
                zIndex: 101,
                bottom: "-50vh",
                padding: "4.5vw"
              }}
            >
              Within this meticulously arranged AI-generated ensemble lies a
              tantalizing facade, captivating our gaze. Yet, as we search for the
              soul of human expression, we question whether algorithms can truly
              embody the essence of authentic art.
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "start",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Ethical Considerations
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          The emergence of AI-generated art raises ethical questions and concerns.
          One of the key challenges is navigating the boundaries of authorship and
          ownership. Determining the role of AI algorithms and their creators in the
          artistic process, as well as addressing issues of attribution and
          intellectual property, requires careful deliberation. Additionally,
          ensuring that AI-generated art does not perpetuate bias, discrimination,
          or harmful content is crucial for fostering a responsible and inclusive
          artistic landscape.
        </p>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 mx-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: "372.4px 0px",
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3817,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: "1024.09px",
            height: "1024.09px",
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none w-full h-auto"
            id="gallery-2"
            style={{
              gridTemplateColumns: "repeat(3, auto)",
              gridTemplateRows: "repeat(3, auto)",
              gap: "2.5vw 3vw"
            }}
          >
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-9"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(-1420.8px, -669px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/8.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-10"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(0.2px, -669px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/7.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-11"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(1421.2px, -669px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/15.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-12"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(-1420.8px, 0px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/9.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-13"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(0.2px, 0px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/12.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-14"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(1421.2px, 0px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/14.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-15"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(-1420.8px, 669px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/10.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-16"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(0.2px, 669px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/13.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid overflow-hidden relative flex-none place-items-center bg-cover rounded-md opacity-100"
              data-flip-id="auto-17"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.65)",
                transform: "translate(1421.2px, 669px) scale(3.3333, 3.3326)",
                backgroundPosition: "50% 50%",
                height: "33vh",
                width: "33vw"
              }}
            >
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: 'url("img/11.jpg")',
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  backgroundPosition: "50% 50%"
                }}
              />
            </div>
            <div
              className="grid absolute top-1/2 left-1/2 place-items-center p-0 w-screen max-w-none h-screen font-normal opacity-100 filter-none"
              data-flip-id="auto-18"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "none",
                transform: "translate(0px, -837.6px)",
                zIndex: 101,
                marginTop: "50vh",
                marginLeft: "-50vw"
              }}
            >
              <p className="text-3xl" style={{ padding: "50vh 30vw 10vh 10vw" }}>
                Devoid of inherent knowledge, the language model relies solely on
                probabilities to craft a peculiar vision. As a result, the earrings
                hang in curious defiance of physics, inviting us to ponder the
                implications of relinquishing human understanding in the pursuit of
                artificial creativity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "end",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Preserving Artistic Identity
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          While AI offers new avenues for artistic exploration, there is a concern
          that it may overshadow or replace human creativity. Balancing the
          integration of AI tools and techniques with preserving the unique
          perspectives, emotional depth, and artistic identity of human artists is a
          significant challenge. Striking the right balance between AI-generated art
          and the irreplaceable human touch requires thoughtful consideration and an
          ongoing dialogue between artists, technologists, and the wider art
          community.
        </p>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 mx-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: "372.4px 0px",
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 9310,
          padding: "0px 0px 8379px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 8379px)"
          }}
        >
          <div
            className="grid relative flex-none w-full h-full"
            id="gallery-3"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "2vw" }}
          >
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/16.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-19"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/17.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-20"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/18.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-21"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/30.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-22"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/20.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-23"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/21.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-24"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/22.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-25"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/23.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-26"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/24.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-27"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/25.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-28"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/26.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-29"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/31.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-30"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/28.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-31"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/29.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-32"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/19.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-33"
            />
            <div
              className="absolute top-0 left-0 flex-none p-0 w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/27.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 300,
                height: "558.6px",
                top: 0,
                left: 0,
                transform: "translate(802px, 186px)",
                opacity: 1,
                filter: "brightness(1)",
                maxWidth: 300,
                maxHeight: "558.6px",
                minWidth: "155.8px",
                minHeight: 204,
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-34"
            />
            <div
              className="grid absolute top-0 left-0 place-items-center p-0 mr-0 mb-0 w-64 font-normal opacity-100 filter-none"
              data-flip-id="auto-35"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                padding: 0,
                gridArea: "1 / 1 / 1 / 1",
                transition: "none 0s ease 0s",
                position: "absolute",
                width: 1920,
                height: 931,
                top: 0,
                left: 0,
                transform: "translate(952px, -931px)",
                opacity: 1,
                filter: "none",
                maxWidth: 1920,
                maxHeight: 931,
                minWidth: 1920,
                minHeight: 931,
                zIndex: 101,
                marginTop: "100vh",
                marginLeft: "-50vw"
              }}
            >
              The Art of Perfection?
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Societal Impact
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          As AI-generated art becomes more prevalent, its long-term impact on the
          art market, art institutions, and the broader societal perception of art
          needs to be carefully examined. Understanding the implications of
          AI-generated art for art sales, copyright laws, and the dynamics of the
          art market is crucial for shaping future policies and practices.
          Additionally, exploring the ways in which AI-generated art can democratize
          artistic expression and challenge traditional hierarchies is an ongoing
          challenge that requires proactive engagement and collaboration.
        </p>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 m-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: 0,
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none gap-8 items-center p-8 w-full h-full"
            id="gallery-4"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              justifyContent: "start"
            }}
          >
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/33.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(0px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 6
              }}
              data-flip-id="auto-36"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/34.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.8)",
                transform: "translate(-498px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 5
              }}
              data-flip-id="auto-37"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/35.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.7)",
                transform: "translate(-996px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 4
              }}
              data-flip-id="auto-38"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/36.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.6)",
                transform: "translate(-1494px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 3
              }}
              data-flip-id="auto-39"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/37.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.5)",
                transform: "translate(-1992px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 2
              }}
              data-flip-id="auto-40"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/38.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.4)",
                transform: "translate(-2490px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-41"
            />
            <div
              className="absolute bottom-0 z-0 w-screen font-normal opacity-100 text-zinc-600 filter-none"
              data-flip-id="auto-42"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "none",
                transform: "translate(-1152px, 0.4px)",
                left: "100vw",
                padding: "5vw"
              }}
            >
              <p className="m-0 text-3xl">
                AI-generated art captivates with varied creations, sometimes
                senseless, yet impressively enigmatic.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 m-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: 0,
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none gap-8 items-center p-8 w-full h-full"
            id="gallery-5"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              justifyContent: "start"
            }}
          >
            <div
              className="relative flex-none bg-cover opacity-70"
              style={{
                backgroundImage: 'url("img/39.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.7",
                filter: "opacity(1)",
                transform: "translate(0px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-43"
            />
            <div
              className="relative flex-none bg-cover opacity-70"
              style={{
                backgroundImage: 'url("img/40.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.7",
                filter: "opacity(1)",
                transform: "translate(-498px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-44"
            />
            <div
              className="relative flex-none bg-cover opacity-70"
              style={{
                backgroundImage: 'url("img/41.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.7",
                filter: "opacity(1)",
                transform: "translate(-996px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-45"
            />
            <div
              className="relative flex-none bg-cover opacity-70"
              style={{
                backgroundImage: 'url("img/42.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.7",
                filter: "opacity(1)",
                transform: "translate(-1494px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-46"
            />
            <div
              className="relative flex-none bg-cover opacity-70"
              style={{
                backgroundImage: 'url("img/43.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.7",
                filter: "opacity(1)",
                transform: "translate(-1992px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-47"
            />
            <div
              className="relative flex-none bg-cover opacity-70"
              style={{
                backgroundImage: 'url("img/44.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.7",
                filter: "opacity(1)",
                transform: "translate(-2490px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-48"
            />
            <div
              className="absolute bottom-0 z-0 w-screen font-normal opacity-100 text-zinc-600 filter-none"
              data-flip-id="auto-49"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "none",
                transform: "translate(-1152px, 0.4px)",
                left: "100vw",
                padding: "5vw"
              }}
            >
              <p className="m-0 text-3xl">
                In the realm of unpredictable algorithms, some variations may appear
                random or without purpose, challenging traditional notions of beauty
                and meaning.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 m-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: 0,
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none gap-8 items-center p-8 w-full h-full"
            id="gallery-6"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              justifyContent: "start"
            }}
          >
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/45.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(0px, 0.5px)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 6
              }}
              data-flip-id="auto-50"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/46.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.8)",
                transform: "translate(-498px, 0px) scale(0.98, 0.98)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 5
              }}
              data-flip-id="auto-51"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/47.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.7)",
                transform: "translate(-996px, 0px) scale(0.96, 0.96)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 4
              }}
              data-flip-id="auto-52"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/48.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.6)",
                transform: "translate(-1494px, 0px) scale(0.94, 0.94)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 3
              }}
              data-flip-id="auto-53"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/49.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.5)",
                transform: "translate(-1992px, 0px) scale(0.92, 0.92)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 2
              }}
              data-flip-id="auto-54"
            />
            <div
              className="relative flex-none bg-cover opacity-100"
              style={{
                backgroundImage: 'url("img/50.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.4)",
                transform: "translate(-2490px, 0px) scale(0.9, 0.9)",
                backgroundPosition: "50% 50%",
                borderRadius: "1.5vw",
                width: "25vw",
                height: "35vw",
                zIndex: 1
              }}
              data-flip-id="auto-55"
            />
            <div
              className="absolute bottom-0 z-0 w-screen font-normal opacity-100 text-zinc-600 filter-none"
              data-flip-id="auto-56"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "none",
                transform: "translate(-1152px, 0.4px)",
                left: "100vw",
                padding: "5vw"
              }}
            >
              <p className="m-0 text-3xl">
                This uncharted territory challenges artists and art enthusiasts
                alike, igniting debates about the role of intention and chance in
                the artistic process.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "end",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Unmasking the Void of Authenticity
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          While AI-generated art showcases impressive technical prowess, it leaves
          behind an unsettling void in the quest for authenticity. As humans, we
          seek the genuine touch of human hands and the depth of emotional
          connection embedded within traditional art forms. The lack of human
          essence in AI-generated creations may leave us yearning for the profound
          human expression that sparks true resonance, evoking a sense of emptiness
          in the face of machine-driven artistry.
        </p>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 mx-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: "372.4px 0px",
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none py-0 h-full"
            id="gallery-7"
            style={{
              width: "256%",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "1vh",
              paddingRight: "2vh",
              paddingLeft: "2vh"
            }}
          >
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, 1328.9px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-57"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-58"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-59"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-60"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-61"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-62"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-63"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-64"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/59.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-65"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/60.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, 1328.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-66"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/61.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, 948.9px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-67"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-68"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-69"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-70"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-71"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-72"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-73"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-74"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-75"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/59.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, 948.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-76"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/60.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, 569.9px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-77"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/61.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-78"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-79"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-80"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-81"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-82"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-83"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-84"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-85"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, 569.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-86"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/59.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, 189.9px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-87"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/60.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-88"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/61.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-89"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-90"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-91"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-92"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-93"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-94"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-95"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, 189.8px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-96"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, -189.1px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-97"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/59.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-98"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/60.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-99"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/61.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-100"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-101"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-102"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-103"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-104"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-105"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, -189.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-106"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, -570.1px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-107"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-108"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/59.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-109"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/60.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-110"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/61.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-111"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-112"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-113"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-114"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-115"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, -570.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-116"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, -949.1px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-117"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-118"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-119"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-120"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-121"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-122"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-123"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-124"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-125"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/59.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, -949.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-126"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/60.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1708.6px, -1329.1px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-127"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/61.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(1328.6px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-128"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/51.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(948.6px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-129"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/52.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(569.6px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-130"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/53.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(189.6px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-131"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/54.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-189.4px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-132"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/55.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-569.4px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-133"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/56.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-948.4px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-134"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/57.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1328.4px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-135"
            />
            <div
              className="relative flex-none w-full h-auto bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/58.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "contrast(1) saturate(1) brightness(0.8) opacity(0.8)",
                transform: "translate(-1708.4px, -1329.2px) scale(0.304, 0.304)",
                backgroundPosition: "50% 50%"
              }}
              data-flip-id="auto-136"
            />
            <div
              className="grid absolute top-1/2 left-1/2 place-items-center mr-0 mb-0 w-screen h-screen font-normal filter-none"
              data-flip-id="auto-137"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0.8503",
                filter: "none",
                transform: "translate3d(0.4252px, 0px, 0px)",
                zIndex: 101,
                marginTop: "-50vh",
                marginLeft: "-50vw"
              }}
            >
              What is creativity?
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "start",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Photographic Flaws in Perfect Harmony
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          In the realm of AI-generated photography, the quest for flawlessness
          inadvertently unveils a striking paradox - the absence of authentic
          imperfections. Even in the most human-like subjects, wrinkles and
          blemishes appear too immaculate, leaving us yearning for the raw,
          unfiltered beauty that only true imperfection can evoke.
        </p>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 mx-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: "372.4px 0px",
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none place-content-center w-full h-full"
            id="gallery-8"
            style={{
              gap: "1vh",
              gridTemplateColumns: "repeat(3, 32.5vw)",
              gridTemplateRows: "repeat(4, 23vh)"
            }}
          >
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/64.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "1061.4px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(-2074px, -689px)",
                maxWidth: 1920,
                maxHeight: "1061.4px",
                minWidth: 624,
                minHeight: "437.6px",
                backgroundPosition: "50% 50%",
                gridArea: "1 / 1 / 3 / 2"
              }}
              data-flip-id="auto-138"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/63.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "460.9px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(-648px, -689px)",
                maxWidth: 1920,
                maxHeight: "460.9px",
                minWidth: 624,
                minHeight: "214.2px",
                backgroundPosition: "50% 50%",
                gridArea: "1 / 2 / 2 / 3"
              }}
              data-flip-id="auto-139"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/62.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "1061.4px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(-648px, -312px)",
                maxWidth: 1920,
                maxHeight: "1061.4px",
                minWidth: 624,
                minHeight: "437.6px",
                backgroundPosition: "50% 50%",
                gridArea: "2 / 2 / 4 / 3"
              }}
              data-flip-id="auto-140"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/69.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "1061.4px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(778px, -689px)",
                maxWidth: 1920,
                maxHeight: "1061.4px",
                minWidth: 624,
                minHeight: "437.6px",
                backgroundPosition: "50% 50%",
                gridArea: "1 / 3 / 3 / 3"
              }}
              data-flip-id="auto-141"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/65.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "460.9px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(-2074px, 65px)",
                maxWidth: 1920,
                maxHeight: "460.9px",
                minWidth: 624,
                minHeight: "214.2px",
                backgroundPosition: "50% 50%",
                gridArea: "3 / 1 / 3 / 2"
              }}
              data-flip-id="auto-142"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/67.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "1061.4px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(778px, 65px)",
                maxWidth: 1920,
                maxHeight: "1061.4px",
                minWidth: 624,
                minHeight: "437.6px",
                backgroundPosition: "50% 50%",
                gridArea: "3 / 3 / 5 / 4"
              }}
              data-flip-id="auto-143"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/68.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "460.9px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(-2074px, 442px)",
                maxWidth: 1920,
                maxHeight: "460.9px",
                minWidth: 624,
                minHeight: "214.2px",
                backgroundPosition: "50% 50%",
                gridArea: "4 / 1 / 5 / 2"
              }}
              data-flip-id="auto-144"
            />
            <div
              className="relative flex-none w-64 bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/66.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: "460.9px",
                opacity: 1,
                filter: "brightness(1)",
                transform: "translate(-648px, 442px)",
                maxWidth: 1920,
                maxHeight: "460.9px",
                minWidth: 624,
                minHeight: "214.2px",
                backgroundPosition: "50% 50%",
                gridArea: "4 / 2 / 5 / 3"
              }}
              data-flip-id="auto-145"
            />
            <div
              className="grid absolute top-1/2 left-1/2 place-items-center mr-0 mb-0 w-64 font-normal opacity-100 filter-none"
              data-flip-id="auto-146"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                width: 1920,
                height: 931,
                opacity: 1,
                filter: "none",
                transform: "translate(0px, -1397px)",
                maxWidth: 1920,
                maxHeight: 931,
                minWidth: 1920,
                minHeight: 931,
                zIndex: 101,
                marginTop: "100vh",
                marginLeft: "-50vw"
              }}
            >
              Perfect Imperfections
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "end",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Moving forward
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          As we conclude this transformative project, we are left with profound
          questions that continue to shape our understanding of AI-generated art and
          its place in the artistic landscape. How do we reconcile the precision of
          algorithms with the intangible spark of human creativity? Can machines
          truly grasp the depth of emotion and meaning that art evokes within us?
          And as AI continues to advance, how do we preserve the authenticity and
          soul that define artistic expression?
        </p>
      </section>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "start",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
    <span
      className="text-zinc-400 md:text-right"
      style={{
        gridArea:
          "label-default / label-default / label-default / label-default"
      }}
    >
      Photo credits
    </span>
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          All images except one were generated with
          <a
            href="https://midjourney.com"
            className="leading-6 cursor-pointer text-neutral-400 focus:bg-transparent"
            style={{ textDecoration: "none", outline: "none" }}
          >
            Midjourney
          </a>
          . The only "real" image was taken by
          <a
            href="https://unsplash.com/@karsten116"
            className="leading-6 cursor-pointer text-neutral-400 focus:bg-transparent"
            style={{ textDecoration: "none", outline: "none" }}
          >
            Karsten Winegeart
          </a>
          .<strong className="font-bold leading-6">Can you spot which one?</strong>{" "}
          Hint: it's one of the portraits in the last image grid. Let us know via
          <a
            href="https://twitter.com/intent/tweet?text=@codrops"
            className="leading-6 cursor-pointer text-neutral-400 focus:bg-transparent"
            style={{ textDecoration: "none", outline: "none" }}
          >
            @codrops
          </a>
          .
        </p>
      </section>
      <div
        className="flex float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto px-0 pt-0 mx-0 w-64 basis-auto"
        style={{
          order: 0,
          placeSelf: "auto",
          gridArea: "auto / auto / auto / auto",
          zIndex: "auto",
          float: "none",
          flexShrink: 1,
          display: "flex",
          margin: "372.4px 0px",
          inset: 0,
          position: "relative",
          flexBasis: "auto",
          overflow: "visible",
          boxSizing: "border-box",
          width: 1903,
          height: 3724,
          padding: "0px 0px 2793px"
        }}
      >
        <div
          className="flex overflow-hidden relative justify-center items-center p-0 m-0 w-64"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            inset: "0px auto auto 0px",
            margin: 0,
            maxWidth: 1903,
            width: 1903,
            maxHeight: 931,
            height: 931,
            padding: 0,
            transform: "translate(0px, 2793px)"
          }}
        >
          <div
            className="grid relative flex-none place-items-center w-full h-full"
            id="gallery-9"
          >
            <div
              className="relative flex-none bg-cover rounded-md opacity-100"
              style={{
                backgroundImage: 'url("img/70.jpg")',
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "brightness(0.7) hue-rotate(0deg)",
                transform: "translate(-0.5px, -0.5px) scale(0.25, 0.25)",
                backgroundPosition: "50% 50%",
                width: "256%",
                height: "400%"
              }}
              data-flip-id="auto-147"
            />
            <div
              className="grid absolute top-1/2 left-1/2 place-items-center mr-0 mb-0 w-screen h-screen font-normal opacity-100 filter-none"
              data-flip-id="auto-148"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 1,
                filter: "none",
                transform: "translate(0.5px, -1396.5px)",
                zIndex: 101,
                marginTop: "100vh",
                marginLeft: "-50vw"
              }}
            >
              Made by @codrops
            </div>
          </div>
        </div>
      </div>
      <section
        className="grid p-4 mx-auto"
        style={{
          maxWidth: 1000,
          gap: "0.5rem 7vw",
          gridTemplateAreas: '"label-default" "paragraph"',
          gridTemplateColumns: "1fr",
          justifyContent: "start",
          marginTop: "20vh",
          marginBottom: "20vh"
        }}
      >
        <p
          className="m-0 text-zinc-600"
          style={{
            gridArea: "paragraph / paragraph / paragraph / paragraph",
            maxWidth: 400,
            lineHeight: "1.4"
          }}
        >
          Like AI-generated art? Get a
          <a
            href="https://tympanus.net/codrops/2023/06/12/free-ai-generated-images-vol-1/"
            className="leading-6 cursor-pointer text-neutral-400 focus:bg-transparent"
            style={{ textDecoration: "none", outline: "none" }}
          >
            free AI Art collection
          </a>
          plus prompts to get inspired.
        </p>
      </section>
    </main>

  </div>;
};

export default MyComponent;



