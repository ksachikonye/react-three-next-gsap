'use client'
import React, { useEffect, useState } from "react";
import { gsap, TweenMax, Quad, Expo, Elastic } from "gsap";
import charming from "charming";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
  const pathname = usePathname()
  const [current, setCurrent] = useState(-1);
  const [scrollPos, setScrollPos] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allowTilt, setAllowTilt] = useState(true);
  const [winsize, setWinsize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const calcWinsize = () => {
    setWinsize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    calcWinsize();
    window.addEventListener("resize", calcWinsize);

    const getOffset = (elem, axis) => {
      let offset = 0;
      const type = axis === "top" ? "offsetTop" : "offsetLeft";
      let currentElem = elem;
      do {
        if (!isNaN(currentElem[type])) {
          offset += currentElem[type];
        }
      } while ((currentElem = currentElem.offsetParent));
      return offset;
    };

    const distance = (p1, p2) =>
      Math.hypot(p2.x - p1.x, p2.y - p1.y);

    const randNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const getMousePos = (e) => {
      let posx = 0;
      let posy = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      return { x: posx, y: posy };
    };

    const getAngle = (el) => {
      const st = window.getComputedStyle(el, null);
      const tr = st.getPropertyValue("transform");
      let values = tr.split("(")[1];
      values = values.split(")")[0];
      values = values.split(",");
      return Math.round(Math.asin(values[1]) * (180 / Math.PI));
    };

    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    const preventDefault = (e) => {
      e = e || window.event;
      if (e.preventDefault) e.preventDefault();
      e.returnValue = false;
    };
    const preventDefaultForScrollKeys = (e) => {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    };
    const disableScroll = () => {
      if (window.addEventListener) window.addEventListener("DOMMouseScroll", preventDefault, false);
      window.onwheel = preventDefault;
      window.onmousewheel = document.onmousewheel = preventDefault;
      window.ontouchmove = preventDefault;
      document.onkeydown = preventDefaultForScrollKeys;
    };
    const enableScroll = () => {
      if (window.removeEventListener) window.removeEventListener("DOMMouseScroll", preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    };

    class GridItem {
      constructor(el) {
        this.DOM = { el: el };
        this.DOM.bg = this.DOM.el.querySelector(".grid__item-bg");
        this.DOM.tilt = {};
        this.DOM.imgWrap = this.DOM.el.querySelector(".grid__item-wrap");
        this.DOM.tilt.img = this.DOM.imgWrap.querySelector("img");
        this.DOM.tilt.title = this.DOM.el.querySelector(".grid__item-title");
        this.DOM.tilt.number = this.DOM.el.querySelector(".grid__item-number");
        charming(this.DOM.tilt.number);
        this.DOM.numberLetters = this.DOM.tilt.number.querySelectorAll("span");
        this.tiltconfig = {
          title: { translation: { x: [-8, 8], y: [4, -4] } },
          number: { translation: { x: [-5, 5], y: [-10, 10] } },
          img: { translation: { x: [-15, 15], y: [-10, 10] } },
        };
        this.angle = getAngle(this.DOM.tilt.img);
        this.initEvents();
      }

      initEvents() {
        this.toggleAnimationOnHover = (type) => {
          TweenMax.to(this.DOM.bg, 1, {
            ease: Expo.easeOut,
            scale: type === "mouseenter" ? 1.15 : 1,
          });
          this.DOM.numberLetters.forEach((letter, pos) => {
            TweenMax.to(letter, 0.2, {
              ease: Quad.easeIn,
              delay: pos * 0.1,
              y: type === "mouseenter" ? "-50%" : "50%",
              opacity: 0,
              onComplete: () => {
                TweenMax.to(letter, type === "mouseenter" ? 0.6 : 1, {
                  ease: type === "mouseenter"
                    ? Expo.easeOut
                    : Elastic.easeOut.config(1, 0.4),
                  startAt: {
                    y: type === "mouseenter" ? "70%" : "-70%",
                    opacity: 0,
                  },
                  y: "0%",
                  opacity: 1,
                });
              },
            });
          });
        };
        this.mouseenterFn = (ev) => {
          if (!allowTilt) return;
          this.toggleAnimationOnHover(ev.type);
        };
        this.mousemoveFn = (ev) =>
          requestAnimationFrame(() => {
            if (!allowTilt) return;
            this.tilt(ev);
          });
        this.mouseleaveFn = (ev) => {
          if (!allowTilt) return;
          this.resetTilt();
          this.toggleAnimationOnHover(ev.type);
        };
        this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
        this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
        this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
      }

      tilt(ev) {
        const mousepos = getMousePos(ev);
        const docScrolls = {
          left: body.scrollLeft + docEl.scrollLeft,
          top: body.scrollTop + docEl.scrollTop,
        };
        const bounds = this.DOM.el.getBoundingClientRect();
        const relmousepos = {
          x: mousepos.x - bounds.left - docScrolls.left,
          y: mousepos.y - bounds.top - docScrolls.top,
        };
        for (let key in this.DOM.tilt) {
          let t = this.tiltconfig[key].translation;
          this.DOM.tilt[key].style.transform = `translateX(${(2 *
            ((relmousepos.x - bounds.width / 2) / bounds.width)) *
            t.x}px) translateY(${(2 *
            ((relmousepos.y - bounds.height / 2) / bounds.height)) *
            t.y}px)`;
        }
        this.DOM.tilt.img.style.transform = `rotate3d(0,1,0,${(this.angle *
          (relmousepos.x - bounds.width / 2)) /
          bounds.width}deg) rotate3d(1,0,0,${(this.angle *
          (relmousepos.y - bounds.height / 2)) /
          bounds.height}deg)`;
      }

      resetTilt() {
        for (let key in this.DOM.tilt) {
          this.DOM.tilt[key].style.transform = "none";
        }
        this.DOM.tilt.img.style.transform = "none";
      }
    }

    class MasonryGrid {
      constructor(el) {
        this.DOM = { el: el };
        this.items = [];
        this.DOM.grid = this.DOM.el.querySelector(".grid");
        this.DOM.content = [...this.DOM.el.querySelectorAll(".grid__item")];
        this.contentTotal = this.DOM.content.length;
        this.DOM.content.forEach((item) => this.items.push(new GridItem(item)));
        imagesLoaded(this.DOM.grid, () => {
          new Masonry(this.DOM.grid, {
            itemSelector: ".grid__item",
            columnWidth: ".grid__sizer",
            percentPosition: true,
            resize: false,
          });
          this.initEvents();
        });
      }

      initEvents() {
        this.mouseenterFn = () => {
          if (!allowTilt) return;
          this.items.forEach((item) => item.DOM.el.style.opacity = 1);
        };
        this.mouseleaveFn = () => {
          if (!allowTilt) return;
          this.items.forEach((item) => (item.DOM.el.style.opacity = 0.5));
        };
        this.DOM.grid.addEventListener("mouseenter", this.mouseenterFn);
        this.DOM.grid.addEventListener("mouseleave", this.mouseleaveFn);
      }
    }

    const tilt = (ev) => {
      if (!allowTilt) return;
      if (!isAnimating) {
        isAnimating = true;
        TweenMax.to(current.DOM.tilt.img, 1.5, {
          ease: Expo.easeInOut,
          rotationX: ev.clientY < winsize.height / 2 ? 3 : -3,
          rotationY: ev.clientX < winsize.width / 2 ? 3 : -3,
        });
        TweenMax.to(current.DOM.tilt.title, 1.5, {
          ease: Expo.easeInOut,
          translationX: ev.clientX < winsize.width / 2 ? 30 : -30,
          translationY: ev.clientY < winsize.height / 2 ? 30 : -30,
        });
        TweenMax.to(current.DOM.tilt.number, 1.5, {
          ease: Expo.easeInOut,
          translationX: ev.clientX < winsize.width / 2 ? 20 : -20,
          translationY: ev.clientY < winsize.height / 2 ? 20 : -20,
        });
        TweenMax.to(current.DOM.bg, 1.5, {
          ease: Expo.easeOut,
          scaleX: 1.15,
          scaleY: 1.15,
        });
        TweenMax.to(current.DOM.numberLetters, 0.2, {
          ease: Quad.easeIn,
          x: "0%",
          opacity: 1,
          onComplete: () => {
            isAnimating = false;
          },
        });
      }
    };

    const mouseenterGridItem = (item) => {
      if (!allowTilt) return;
      current = item;
      // if it's not the current one and isExpanded is true, then close it and open the current one
      if (
        current !== item &&
        current !== -1 &&
        items[current].isExpanded
      ) {
        const delay = Math.abs(current - item) * 50;
        items[current].collapse(delay);
        current = item;
      }
      // expand the current one
      current = item;
      items[current].expand();
    };

    const init = () => {
      body = document.body;
      docEl = document.documentElement;
      items = [...gridItems].map((el) => new Item(el));
      masonry = new MasonryGrid(grid);
      // mousemove event / tilt functionality
      let tiltTimeout;
      window.addEventListener("mousemove", (ev) => {
        if (tiltTimeout) clearTimeout(tiltTimeout);
        setTimeout(() => tilt(ev), 20);
      });

      //   mouseleave event / tilt out
      window.addEventListener("mouseleave", () => {
        if (tiltTimeout) clearTimeout(tiltTimeout);
        if (!allowTilt) return;
        tiltTimeout = setTimeout(() => {
          if (!isAnimating) {
            items.forEach((item) => item.resetTilt());
          }
        }, 200);
      });

      //   preload all the images in the page
      imagesLoaded(grid, () => {
        body.classList.remove("loading");
        //   initialize masonry
        new MasonryGrid(grid);
      });

      //   remove loading class to enable transitions
      //   body.classList.remove("loading");
    };

    let body;
    let docEl;
    let items;
    let gridItems = document.querySelectorAll(".grid__item");
    let grid = document.querySelector(".grid");
    let masonry;

    init();

    // Expose functions or variables you want to access outside this component
    return () => {
      // Cleanup functions or unsubscribe from events, if necessary
      window.removeEventListener("resize", calcWinsize);
      window.removeEventListener("mousemove", (ev) => {
        if (tiltTimeout) clearTimeout(tiltTimeout);
        setTimeout(() => tilt(ev), 20);
      });
      window.removeEventListener("mouseleave", () => {
        if (tiltTimeout) clearTimeout(tiltTimeout);
        if (!allowTilt) return;
        tiltTimeout = setTimeout(() => {
          if (!isAnimating) {
            items.forEach((item) => item.resetTilt());
          }
        }, 200);
      });
    };
  }, []);

  return (
    <main className="block relative text-violet-800">
    <div className="relative py-6 px-10 md:grid md:place-items-start">
      <header
        className="block relative text-base text-center md:flex md:flex-row md:items-center md:justify-self-end md:text-left"
        style={{ zIndex: 100 }}
      >
        {" "}
        <h1 className="p-0 m-0 text-left" style={{ fontWeight: "normal" }}>
          {" "}
          Menu{" "}
        </h1>
        <div className="flex relative justify-center whitespace-nowrap md:my-0 md:mr-0 md:ml-6">
          {" "}
   
  
    
        </div>{" "}
      </header>
      <div className="text-center md:flex md:text-left">
        {" "}
        <h3 className="m-0 text-base text-left" style={{ fontWeight: "normal" }}>
          {" "}
          Merovingian Visconti Picolo{" "}
        </h3>{" "}
        <h4
          className="relative m-0 text-base text-left md:relative md:my-0 md:mr-0 md:ml-4 md:py-0 md:pr-0 md:pl-20"
          style={{ fontWeight: "normal" }}
        >
          {" "}
          2023
          <span className="md:block">Posture</span>{" "}
        </h4>
      </div>
    </div>
    <div
      className="relative px-4 pt-24 pb-0 my-0 mx-auto"
      style={{ maxWidth: 1100 }}
    >
      <div
        className="block relative my-0 mx-auto w-64"
        style={{ position: "relative", width: 980, height: "1656.8px" }}
      >
        {" "}
        <a
          href="#"
          className="absolute top-0 left-0 p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 0,
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              width: 260,
              height: 315,
              left: 0,
              top: 0,
              position: "absolute"
            }}
          ></div>
          <div className="relative">
            {" "}
            <Link to="/centre" className={`link ${pathname === '/' ? 'active' : ''}`} href="/centre">  
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/hermes.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
            </Link>
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Quiet Standing{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              B
            </span>
            <span
              className="inline-block font-bold"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              0
            </span>
            <span
              className="inline-block font-bold"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              5
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute top-0 z-0 p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 360,
            top: 0,
            zIndex: 0,
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-64 opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              width: 260,
              height: 347,
              left: 0,
              top: 0,
              position: "absolute"
            }}
          ></div>
          <div className="relative">
            {" "}
            <Link to="/standing" className={`link ${pathname === '/' ? 'active' : ''}`} href="/standing">  
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/hermes.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
            </Link>
          </div>
           Belief Systems{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0.892308, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            C{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0.557692, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              A
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              2
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              1
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute top-0 z-0 p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 720,
            top: 0,
            zIndex: 0,
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-64 opacity-100"
            style={{
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              width: 260,
              height: 314,
              left: 0,
              top: 0,
              position: "absolute",
              opacity: 1
            }}
          ></div>
          <div className="relative">
            {" "}
            <Link to="/standing" className={`link ${pathname === '/' ? 'active' : ''}`} href="/standing">  
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/hermes.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
            </Link>
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              opacity: 1,
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Cornering Velocity{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              opacity: 1,
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              X
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              B
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              3
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 720,
            top: "393.609px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Link to="/standing" className={`link ${pathname === '/' ? 'active' : ''}`} href="/standing">  
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/hermes.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
            </Link>
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Gestation{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              H
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              K
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              9
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute left-0 p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 0,
            top: "395.016px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/carl-lewis.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Emergence of Rank{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              F
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              W
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              1
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 360,
            top: "426.75px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/brett-lee-01.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, 0.06976, -0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Kin term Mimicry{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              D
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              Z
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              5
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 720,
            top: "720.343px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/badman-beamon.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Desert races{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              M
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              0
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              2
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute left-0 p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 0,
            top: "771.563px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/presentation-party-at-the-olympic-games-athens-greece-1906-king-george-of-greece-plus-other.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, 0.06976, -0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Transcendence{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              K
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              L
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              7
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 360,
            top: "852.594px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/tomas-robertson-Dep3PLy7i04-unsplash.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Loosing my mind{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              U
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              Y
            </span>
            <span
              className="inline-block font-bold opacity-100"
              style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
            >
              6
            </span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 720,
            top: "1124.52px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/the-organisers-of-the-athens-olympics-as-well-as-the-inaugural-games-of-the-modern-era-in-1896.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, 0.06976, -0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Holding your breath{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span className="inline-block font-bold">O</span>
            <span className="inline-block font-bold">P</span>
            <span className="inline-block font-bold">2</span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute left-0 p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 0,
            top: "1182.02px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/the-cover-illustration-from-the-official-report-of-the-first-modern-olympic-games-in-athens.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, -0.06976, 0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Making the best of it{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span className="inline-block font-bold">E</span>
            <span className="inline-block font-bold">C</span>
            <span className="inline-block font-bold">5</span>{" "}
          </h4>{" "}
        </a>{" "}
        <a
          href="#"
          className="absolute p-10 mb-20 w-64 text-rose-600 cursor-pointer"
          style={{
            position: "absolute",
            left: 360,
            top: "1247.95px",
            textDecoration: "none",
            outline: "none"
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-100"
            style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          ></div>
          <div className="relative">
            {" "}
            <Image
              className="block relative my-0 mx-auto max-w-full border-0 opacity-100 pointer-events-none"
              src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/sport-1896-olympic-games-athens-illustration-this-illustration-shows-the-wrestling-contest-in.jpg"
              alt="Some image"
              style={{
                opacity: 1,
                transform: "matrix(0.99756, 0.06976, -0.06976, 0.99756, 0, 0)",
                outline: "transparent solid 1px"
              }}
            />
          </div>{" "}
          <h3
            className="absolute top-0 left-0 my-0 mr-0 ml-4 text-lg opacity-100 md:-ml-1"
            style={{
              opacity: 1,
              transform: "matrix(-1, 0, 0, -1, 0, 0)",
              fontWeight: "normal",
              writingMode: "vertical-rl",
              transformOrigin: "0px 50%"
            }}
          >
            {" "}
            Haunted Blessings{" "}
          </h3>{" "}
          <h4
            className="absolute right-0 bottom-0 mx-0 mt-0 mb-px text-5xl opacity-100"
            style={{
              opacity: 1,
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              fontWeight: "bold"
            }}
          >
            <span className="inline-block font-bold">2</span>
            <span className="inline-block font-bold">V</span>
            <span className="inline-block font-bold">X</span>{" "}
          </h4>{" "}
        </a>
      </div>
    </div>
    {/* /grid-wrap */}
   
  </main>
  
  );
};

export default Page;
