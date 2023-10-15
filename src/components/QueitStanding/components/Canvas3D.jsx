'use client'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { softShadows } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

softShadows()
gsap.registerPlugin(ScrollTrigger)
function Thing({ anim, animSphere }) {
  const ref = useRef()
  const sphereRef = useRef()
  useFrame(() => {
    ref.current.position.x = -2 * anim.x
    ref.current.position.y = -1.5 * anim.y
    ref.current.rotation.y = -1.5 * anim.y
    sphereRef.current.position.y = -1.5 * animSphere.y
  })
  return (
    <group>
      <mesh castShadow ref={ref} position={[0, 0, 0]}>
        <torusBufferGeometry attach="geometry" args={[2, 0.5, 32, 128]} />
        <meshPhongMaterial attach="material" specular={['red']} shininess={1000} />
      </mesh>
      <mesh castShadow ref={sphereRef} position={[0, 0, 0]}>
        <sphereBufferGeometry attach="geometry" args={[1, 16, 32]} />
        <meshPhongMaterial attach="material" specular={['yellow']} shininess={1000} />
      </mesh>
      {/* <mesh castShadow position={[0, -4.8, 0]}>
        <sphereBufferGeometry attach="geometry" args={[1, 16, 32]} />
        <meshPhongMaterial attach="material" specular={['yellow']} shininess={1000} />
      </mesh> */}
    </group>
  )
}

function Plane() {
  return (
    <mesh receiveShadow position={[0, -2, -5]}>
      <planeBufferGeometry args={[100, 100]} />
      <shadowMaterial color={['black']} opacity={0.5} />
    </mesh>
  )
}

function Light() {
  const { scene } = useThree()
  const ref = useRef()
  //useHelper(ref, DirectionalLightHelper, 0.5, 'red')
  return (
    <directionalLight
      ref={ref}
      castShadow
      position={[0, 10, 20]}
      intensity={0.9}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
  )
}

function Canvas3D({ mainRef }) {
  let animable = {
    x: -3,
    y: -3
  }
  let animableSphere = {
    y: 0
  }
  useEffect(() => {
    if (mainRef) {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-one',
          start: 'top top',
          endTrigger: '.section-two',
          end: 'bottom bottom',
          snap: 1,
          scrub: 1,
          markers: true
        }
      })
      tl1.to(animable, {
        x: 3,
        y: 3
      })
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-two',
          start: 'top top',
          endTrigger: '.section-three',
          end: 'bottom bottom',
          markers: true,
          scrub: 1
        }
      })
      tl3.to(animableSphere, {
        y: 3.3
      })
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-three',
          start: 'top top',
          endTrigger: '.section-four',
          end: 'bottom bottom',
          markers: true,
          scrub: 1
        }
      })
      tl2.to(animable, {
        x: -3
      })
    }
  }, [mainRef])
  return (
    <Canvas shadowMap camera={{ position: [0, 0, 10] }}>
     
      <Light />
      <Thing anim={animable} animSphere={animableSphere} />
      <Plane />
    </Canvas>
  )
}

export default Canvas3D
