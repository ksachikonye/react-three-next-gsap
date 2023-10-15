'use client'
import { useState, Suspense, useEffect } from "react";
import { motion, MotionConfig, AnimatePresence  } from "framer-motion";
import { Scene } from "@/components/Introduction/Scene";
import { transition } from "@/components/Introduction/settings";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    // Simulate loading process (e.g., fetching data, loading assets)
    // Replace the setTimeout with your actual loading logic
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed (in milliseconds)

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <MotionConfig transition={transition}>
      <div
        data-is-fullscreen={isFullscreen}
        onClick={() => setFullscreen(!isFullscreen)}
      >
        <motion.div className="min-h-screen overscroll-none relative" layout>
          <Suspense fallback={null}>
            <Scene isFullscreen={isFullscreen} />
          </Suspense>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
