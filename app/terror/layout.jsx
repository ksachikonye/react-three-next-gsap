import { Lenis } from '@studio-freight/lenis'
import {  useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'





const Layout = ({ children }) => {
	useEffect(() => {
		const lenis = new Lenis()
		lenis.on('scroll', ScrollTrigger.update)

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000)
		})
	}, [])

	return <div>{children}</div>
}

export default Layout