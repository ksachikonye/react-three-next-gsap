import { Layout } from '@/components/dom/Layout'
import { TransitionProvider } from '@/context/TransitionContext'
import TransitionLayout from '@/animations/TransitionLayout'
import { Box } from "theme-ui"
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TransitionContextProvider } from '@/context/transitionContext';
import { NavigationContextProvider } from '@/context/navigationContext';
import '@/global.css'

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}
gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }) {
  const router = useRouter();

    /* Removes focus from next/link element after page change */
    useEffect(() => {
        document.activeElement && document.activeElement.blur();
    }, [router]);

    /* Temporary fix to avoid flash of unstyled content (FOUC) during route transitions */
    useNextCssRemovalPrevention();

  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <TransitionProvider>
      <TransitionLayout>
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
         <Layout>{children}</Layout>
        </Box>
      </TransitionLayout>
    </TransitionProvider>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
 
      </body>
    </html>
  )
}
