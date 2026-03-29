import React from 'react'
import { motion } from 'framer-motion'

export default function Transition({ children }) {
  return (
    <>
      <motion.div
        className="slide-in"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.86, 0, 0.07, 1] }}
      />
      
      {children}
      
      <motion.div
        className="slide-out"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1] }}
      />
    </>
  )
}
