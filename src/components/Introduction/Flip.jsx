'use client'
import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, useCursor } from "@react-three/drei";
import { useRouter } from 'next/navigation'

export function Flip({ route = '/standing', ...props }) {
  const group = useRef();
  const router = useRouter();
  const { nodes, materials, animations } = useGLTF("/run_to_flip.glb");
  const { actions } = useAnimations(animations, group);
  const [hovered, setHovered] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);

  useCursor(hovered);

  const playAnimation = () => {
    if (!animationPlayed) {
      // Play the animation if it hasn't been played yet
      actions["Armature|mixamo.com|Layer0"].reset().fadeIn(0.5).play();
      setAnimationPlayed(true);
    } else {
      // Switch to wireframe mode if animation has been played
      setIsWireframe(!isWireframe);
        // Navigate to the specified route

    router.push(route); // This will navigate to the route provided in the props
    }
  };

  useEffect(() => {
    // Toggle between wireframe and solid mode
    if (isWireframe) {
      materials.Beta_Joints_MAT1.wireframe = true;
      materials.Beta_HighLimbsGeoSG3.wireframe = true;
    } else {
      materials.Beta_Joints_MAT1.wireframe = false;
      materials.Beta_HighLimbsGeoSG3.wireframe = false;
    }
  }, [isWireframe, materials]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group
     
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={playAnimation}
        name="Scene"
      >
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Beta_Joints"
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT1}
            skeleton={nodes.Beta_Joints.skeleton}
          />
          <skinnedMesh
            name="Beta_Surface"
            geometry={nodes.Beta_Surface.geometry}
            material={materials.Beta_HighLimbsGeoSG3}
            skeleton={nodes.Beta_Surface.skeleton}
          />

          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/run_to_flip.glb");
