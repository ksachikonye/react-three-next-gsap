"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Flipper({ position, scale, rotation, scrollYProgress }) {
  const axesHelper = new THREE.AxesHelper(5);
  const { scene } = useGLTF("/run_to_flip.glb");
  useFrame((state, delta) => {
    //console.log(-2 * (scrollYProgress.current * 0.3));
    scene.add(axesHelper);
    state.scene.rotation.set(
      0,
      Math.atan(scrollYProgress.current * Math.PI * 2) * 4,
      0
    );
    state.scene.position.set(0, -2 * (scrollYProgress.current * 0.3), 0);
    state.camera.position.set(0, 0, 2 - scrollYProgress.current * 1);
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </>
  );
}