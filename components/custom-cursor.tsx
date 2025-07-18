"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  color?: string
  glow?: boolean
  size?: number
  duration?: number
}

const CustomCursor: React.FC<CustomCursorProps> = ({ color = "#226fd3", glow = true, size = 20, duration = 0.5 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
        setIsVisible(true)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const cursorVariants = {
    default: {
      x: mousePosition.x - size / 2,
      y: mousePosition.y - size / 2,
      transition: {
        duration: duration,
      },
    },
  }

  return (
    isVisible && (
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate="default"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: glow ? `0 0 20px ${color}, 0 0 60px ${color}` : "none",
        }}
      />
    )
  )
}

export default CustomCursor
