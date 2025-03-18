'use client'

import { getAcidityStatus } from '../ utils/phUtils'

type ResultDisplayProps = {
  gameStatus: 'playing' | 'correct' | 'incorrect'
  selectedPh: number
  actualPh: number
}

export function ResultDisplay({ 
  gameStatus, 
  selectedPh, 
  actualPh 
}: ResultDisplayProps) {
  if (gameStatus === 'playing') {
    return null
  }
  
  return (
    <div className={`w-full p-4 rounded-lg text-center ${
      gameStatus === 'correct' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {gameStatus === 'correct' ? (
        <p className="font-medium">Correct! 🎉</p>
      ) : (
        <p className="font-medium">Not quite right...</p>
      )}
      
      <div className="mt-2">
        <p>The actual pH is <span className="font-bold">{actualPh.toFixed(1)}</span></p>
        <p>This solution is <span className="font-bold">{getAcidityStatus(actualPh)}</span></p>
      </div>
    </div>
  )
}
