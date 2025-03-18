'use client'

import { getPhColor } from '../ utils/phUtils'

type WaterBoxProps = {
  ph: number
  gameStatus: 'playing' | 'correct' | 'incorrect'
}

export function WaterBox({ ph, gameStatus }: WaterBoxProps) {
  const waterColor = getPhColor(ph)
  
  // Calculate fill percentage based on pH (0-14 range maps to 0-100%)
  const fillPercent = (ph / 14) * 100
  
  return (
    <div className="relative w-32 h-64 border-4 border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Water container */}
      <div 
        className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out ${
          gameStatus === 'playing' ? 'animate-water-move' : ''
        }`}
        style={{ 
          height: `${fillPercent}%`,
          backgroundColor: waterColor,
        }}
      />
      
      {/* Bubbles effect */}
      {gameStatus === 'playing' && (
        <>
          <div className="absolute bottom-2 left-3 w-2 h-2 bg-white/30 rounded-full animate-bubble-1" />
          <div className="absolute bottom-4 left-10 w-1.5 h-1.5 bg-white/30 rounded-full animate-bubble-2" />
          <div className="absolute bottom-8 left-6 w-2.5 h-2.5 bg-white/30 rounded-full animate-bubble-3" />
        </>
      )}
      
      {/* Glass reflection effect */}
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-white/10" />
    </div>
  )
}
