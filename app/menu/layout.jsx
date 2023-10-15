import { Lenis } from '@studio-freight/lenis'
import {  useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { ThemeUIProvider } from "theme-ui"
import Theme from '@/layout/Theme'


const Layout = ({ children }) => {
	useEffect(() => {
		const lenis = new Lenis()
		lenis.on('scroll', ScrollTrigger.update)

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000)
		})
	}, [])

	return <ThemeUIProvider theme={Theme}> <div className="min-h-screen overscroll-none relative">{children}</div> </ThemeUIProvider>
}

export default Layout