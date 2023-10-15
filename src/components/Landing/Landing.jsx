'use client'
import { Suspense, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, useGLTF, useCursor } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import Underlay from './Underlay'




function Satellite({ route = '/menu', ...props }) {
    const ref = useRef(null);
    const { nodes, materials, animations } = useGLTF('/communication_satellite.glb')
      const router = useRouter()
    const [hovered, hover] = useState(false)
     useCursor(hovered)
      const { actions } = useAnimations(animations, ref);
      useEffect(() => {
      actions["Satellite|OpenSolarpanels"].play();
    });
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.set(0.1 + Math.cos(t / 4.5) / 10, Math.sin(t / 4) / 4, 0.3 - (1 + Math.sin(t / 4)) / 8)
      ref.current.position.y = (1 + Math.sin(t / 2)) / 10
    })
    return (
          <group   onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)} {...props} dispose={null}>
        <group ref={ref} name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[Math.PI / 2, 0, -Math.PI]}>
            <group
              name="cefc42f0170f497597299ffee31d62c5fbx"
              rotation={[-Math.PI, 0, 0]}
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group
                    name="Satellite_Wing1"
                    position={[-1.289, 0.36, -0.005]}
                  />
                  <group
                    name="Satellite_Wing2"
                    position={[1.289, 0.36, -0.005]}
                  />
                  <group name="Satellite_Attachments" />
                  <group name="Satellite_Body" />
                  <group name="Satellite">
                    <group name="Object_9">
                      <primitive object={nodes._rootJoint} />
                      <skinnedMesh
                        name="Object_12"
                        geometry={nodes.Object_12.geometry}
                        material={materials.Satellite_Wings}
                        skeleton={nodes.Object_12.skeleton}
                      />
                      <skinnedMesh
                        name="Object_14"
                        geometry={nodes.Object_14.geometry}
                        material={materials.Satellite_Wings}
                        skeleton={nodes.Object_14.skeleton}
                      />
                      <skinnedMesh
                        name="Object_16"
                        geometry={nodes.Object_16.geometry}
                        material={materials.Satellite_Attachments}
                        skeleton={nodes.Object_16.skeleton}
                      />
                      <skinnedMesh
                        name="Object_18"
                        geometry={nodes.Object_18.geometry}
                        material={materials.Satellite_Body}
                        skeleton={nodes.Object_18.skeleton}
                      />
                      <group name="Object_11" position={[-1.289, 0.36, -0.005]} />
                      <group name="Object_13" position={[1.289, 0.36, -0.005]} />
                      <group name="Object_15" />
                      <group name="Object_17" />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
  
    )
  }

export default function Landing() {
  return (
    <>
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1.1], fov: 35 }}>
      <ambientLight intensity={2} />
      <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} />
      <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={4} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={4} castShadow={true} shadow-mapSize={[256, 256]} color="#ffffc0" />
      <Suspense fallback={null}>
        <Satellite scale={0.425} position={[0, -0.09, 0]} />
        <ContactShadows frames={1} rotation-x={[Math.PI / 2]} position={[0, -0.33, 0]} far={0.4} width={2} height={2} blur={4} />
      </Suspense>
    </Canvas>
    <Underlay/>
    </>
  )
}
