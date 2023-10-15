'use client'

import { useRef, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import { TransitionContext } from '@/context/TransitionContext'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = (props) => {
  const ref = useRef()
  const { setBackground } = useContext(TransitionContext)

  useEffect(() => {
    setBackground(props.background || "black")
  }, [props.background])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
        display: 'flex',
      }}
    >
      {props.children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
  )
}

export { Layout }
