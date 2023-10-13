'use client'

import dynamic from 'next/dynamic'
import React, {Suspense} from 'react'



import Loaders from '@/components/loaders/index'

import Monitors from '@/components/monitors/Monitors'


export default function Page() {
  return (
    <>
   <Suspense fallback={Loaders}>
            <Monitors/>
            </Suspense>
       
    </>
  )
}
