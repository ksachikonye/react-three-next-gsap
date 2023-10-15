'use client'
import React, { useEffect, useRef, useState } from 'react'
import Canvas3D from './components/Canvas3D'
import Content from './components/Content'

function Primates() {
  const [main, setMain] = useState()
  const ref = useRef()
  useEffect(() => {
    setMain(ref.current.children[1])
  }, [main])
  return (
    <main ref={ref}>
      <div className="canvas3D">
        <Canvas3D mainRef={main} />
      </div>
      <Content />
    </main>
  )
}

export default Primates
