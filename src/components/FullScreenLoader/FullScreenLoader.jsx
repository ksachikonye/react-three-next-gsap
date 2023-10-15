'use client'
// components/FullscreenLoader.js
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FullscreenLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

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
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center overflow-hidden"
        >
          {/* Add your loading animation or content here */}
          <div className="spinner"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenLoader;
