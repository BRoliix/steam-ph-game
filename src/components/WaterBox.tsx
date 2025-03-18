'use client'

import { useEffect, useRef } from 'react'
import { getPhColor } from '../ utils/phUtils'

type WaterBoxProps = {
  ph: number
  gameStatus: 'playing' | 'correct' | 'incorrect'
}

export function WaterBox({ ph, gameStatus }: WaterBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waterColor = getPhColor(ph)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions with higher resolution for crisp rendering
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    
    let animationFrameId: number
    let offset = 0
    
    // Water fill percentage based on pH (0-14 scale)
    const fillPercent = (ph / 14) * 100
    const waterHeight = (canvas.offsetHeight * fillPercent) / 100
    
    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      // Create gradient background for water
      const gradient = ctx.createLinearGradient(0, 0, 0, waterHeight)
      gradient.addColorStop(0, waterColor)
      gradient.addColorStop(1, adjustColor(waterColor, 30)) // Slightly darker at bottom
      
      ctx.fillStyle = gradient
      
      // Draw wave path
      ctx.beginPath()
      
      // Starting position at left edge
      ctx.moveTo(0, canvas.offsetHeight)
      
      // Draw waves
      for (let x = 0; x <= canvas.offsetWidth; x += 10) {
        // Generate multiple overlapping sine waves with different amplitudes and frequencies
        const wave1 = Math.sin(x * 0.02 + offset) * 5
        const wave2 = Math.sin(x * 0.04 + offset * 1.3) * 3
        const y = canvas.offsetHeight - waterHeight + wave1 + wave2
        
        ctx.lineTo(x, y)
      }
      
      // Complete the path down and across the bottom
      ctx.lineTo(canvas.offsetWidth, canvas.offsetHeight)
      ctx.closePath()
      ctx.fill()
      
      // Add highlight/shine effect at top of water
      ctx.beginPath()
      ctx.moveTo(0, canvas.offsetHeight - waterHeight + 2)
      for (let x = 0; x <= canvas.offsetWidth; x += 10) {
        const wave = Math.sin(x * 0.03 + offset * 1.5) * 2
        const y = canvas.offsetHeight - waterHeight + wave
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      
      // Only animate if game is playing
      if (gameStatus === 'playing') {
        offset += 0.05
        animationFrameId = requestAnimationFrame(renderWave)
      }
    }
    
    renderWave()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [ph, waterColor, gameStatus])
  
  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1)
      const r = Math.max(0, Math.min(255, parseInt(hex.slice(0, 2), 16) + amount))
      const g = Math.max(0, Math.min(255, parseInt(hex.slice(2, 4), 16) + amount))
      const b = Math.max(0, Math.min(255, parseInt(hex.slice(4, 6), 16) + amount))
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    }
    return color
  }
  
  return (
    <div className="relative w-32 h-64 border-4 border-gray-300 rounded-lg overflow-hidden bg-white">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Glass reflection effect */}
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-white/10 pointer-events-none" />
      
      {/* Add bubbles when playing */}
      {gameStatus === 'playing' && (
        <>
          <div className="absolute bottom-2 left-3 w-2 h-2 bg-white/30 rounded-full animate-bubble-1" />
          <div className="absolute bottom-4 left-10 w-1.5 h-1.5 bg-white/30 rounded-full animate-bubble-2" />
          <div className="absolute bottom-8 left-6 w-2.5 h-2.5 bg-white/30 rounded-full animate-bubble-3" />
        </>
      )}
    </div>
  )
}
