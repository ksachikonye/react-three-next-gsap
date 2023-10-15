'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const SimpleTween = () => {
  const boxRef = useRef(null);
  const initialState = {};

  useEffect(() => {
    // Capture initial state
    initialState.current = Flip.getState(boxRef.current);

    // Create ScrollTrigger
    ScrollTrigger.create({
      trigger: boxRef.current,
      start: "top center",
      onEnter: () => {
        // Capture the new state
        const newState = Flip.getState(boxRef.current);
        
        // Animate from the initial state to the new state
        Flip.from(boxRef.current, { state: initialState.current, duration: 1 });

        // Update initial state for the next Flip
        initialState.current = newState;
      },
      onLeave: () => {
        // Capture the new state
        const newState = Flip.getState(boxRef.current);

        // Animate from the initial state to the new state
        Flip.from(boxRef.current, { state: initialState.current, duration: 1 });

        // Update initial state for the next Flip
        initialState.current = newState;
      }
    });
  }, []);

  return (
    <div style={{ height: '300vh' }}> {/* Container to allow scrolling */}
      <div ref={boxRef} style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}>
        {/* Your box content */}
      </div>
    </div>
  );
};

export default SimpleTween;
