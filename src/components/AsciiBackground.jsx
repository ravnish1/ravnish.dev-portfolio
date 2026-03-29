import React, { useEffect, useRef } from 'react'
import profileImg from '../assets/ravnish-image.jpeg'

const ASCII_CHARS = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' ']
const MATRIX_FALLBACK = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*"

export default function AsciiBackground() {
  const canvasRef = useRef(null)
  const baseTextCanvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height
    
    let chars = []
    const charSize = 8 
    
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = profileImg
    
    img.onload = () => buildAsciiGrid()
    
    const buildAsciiGrid = () => {
      const cols = Math.floor(width / charSize)
      const rows = Math.floor(height / charSize)
      
      const imgRatio = img.width / img.height
      const screenRatio = cols / rows
      
      let drawWidth, drawHeight
      
      // Scale it neatly to fill up to 85% of the screen exactly, keeping face visible
      if (imgRatio > screenRatio) {
        drawWidth = Math.floor(cols * 0.85)
        drawHeight = Math.floor(drawWidth / imgRatio)
      } else {
        drawHeight = Math.floor(rows * 0.85)
        drawWidth = Math.floor(drawHeight * imgRatio)
      }
      
      let offsetX = Math.floor((cols - drawWidth) / 2)
      let offsetY = Math.floor((rows - drawHeight) / 2)

      const offscreen = document.createElement('canvas')
      offscreen.width = cols
      offscreen.height = rows
      const oCtx = offscreen.getContext('2d')
      
      oCtx.fillStyle = 'black'
      oCtx.fillRect(0, 0, cols, rows)
      oCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      
      const imgData = oCtx.getImageData(0, 0, cols, rows).data
      
      chars = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const r = imgData[i]
          const g = imgData[i + 1]
          const b = imgData[i + 2]
          
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b)
          const charIndex = Math.floor((1 - (brightness / 255)) * (ASCII_CHARS.length - 1))
          
          chars.push({
            x: x * charSize,
            y: y * charSize,
            baseChar: ASCII_CHARS[charIndex] || ' ',
            isDense: charIndex < 3 
          })
        }
      }
      
      // OFF-SCREEN CACHING
      const textCanvas = document.createElement('canvas')
      textCanvas.width = width
      textCanvas.height = height
      const tCtx = textCanvas.getContext('2d', { alpha: false })
      
      tCtx.fillStyle = '#020502' 
      tCtx.fillRect(0, 0, width, height)
      tCtx.font = `bold ${charSize}px "JetBrains Mono", monospace`
      tCtx.textBaseline = 'top'
      
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i]
        if (c.baseChar !== ' ') {
          tCtx.fillStyle = c.isDense ? 'rgba(0, 255, 65, 0.4)' : 'rgba(0, 255, 65, 0.15)'
          tCtx.fillText(c.baseChar, c.x, c.y)
        }
      }
      
      baseTextCanvasRef.current = textCanvas
      
      if (!animationFrameId) animate()
    }
    
    let animationFrameId
    const animate = () => {
      // Paint cached base frame iteratively (O(1) operation vs O(N))
      if (baseTextCanvasRef.current) {
         ctx.drawImage(baseTextCanvasRef.current, 0, 0)
      } else {
         ctx.fillStyle = '#020502'
         ctx.fillRect(0, 0, width, height)
      }
      
      ctx.font = `bold ${charSize}px "JetBrains Mono", monospace`
      ctx.textBaseline = 'top'
      
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i]
        const dx = c.x - mx
        const dy = c.y - my
        
        // Fast distance squared (no sqrt) ~120px radius => 14400
        if (dx * dx + dy * dy < 14400) { 
          const dist = Math.sqrt(dx * dx + dy * dy)
          const intensity = 1 - (dist / 120)
          let displayChar = c.baseChar
          
          if (Math.random() > 0.8) displayChar = MATRIX_FALLBACK.charAt(Math.floor(Math.random() * MATRIX_FALLBACK.length))
          
          let color = '#ffffff'
          if (intensity <= 0.8) color = `rgba(180, 255, 180, ${0.4 + intensity * 0.6})`
          
          // Wipe pixel cleanly
          ctx.fillStyle = '#020502'
          ctx.fillRect(c.x, c.y, charSize, charSize + 2) 
          
          if (displayChar !== ' ') {
             ctx.fillStyle = color
             ctx.fillText(displayChar, c.x, c.y)
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
        if (img.complete) buildAsciiGrid()
      }, 200)
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="ascii-canvas-bg"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -5, pointerEvents: 'none' }}
    />
  )
}
