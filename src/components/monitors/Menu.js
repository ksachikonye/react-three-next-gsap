'use client';
import styles from './style.module.scss'
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';


export default function Menu() {

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrame(animate);
    }
    else{
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null;
    }
  }

  return (
    <main onMouseMove={(e) => {manageMouseMove(e)}} className={styles.main}>
      <div ref={plane1} className={styles.plane}>
          <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ben-johnson.jpg'
            alt='image'
            width={300}
          />
           <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/boldon-oakley-advert.jpg'
            alt='image'
            width={300}
          />
          <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/black-greek-athletes.jpg'
            alt='image'
            width={225}
          />
      </div>
      <div ref={plane2} className={styles.plane}>
          <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/athletes-training.jpg'
            alt='image'
            width={250}
          />
           <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/nike-air-zoom-victory.jpg'
            alt='image'
            width={200}
          />
          <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/dark-pyramids.jpg'
            alt='image'
            width={225}
          />
      </div>
      <div ref={plane3} className={styles.plane}>
          <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/chigure-che-glitch-02.jpg'
            alt='image'
            width={150}
          />
           <Image 
            src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/bowler.jpg'
            alt='image'
            width={200}
          />
      </div>
      <div className={styles.title}>
        <h1>Floating Images Gallery</h1>
        <p>Next.js and GSAP</p>
      </div>
    </main>
  )
}
