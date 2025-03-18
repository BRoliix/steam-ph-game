'use client'

import { useEffect, useState } from 'react'
import { PhScale } from './PhScale'
import { ResultDisplay } from './ResultDisplay'
import { ScenicElement } from './ScenicElements'
import { WaterBox } from './WaterBox'
import { calculateNewPh } from '../ utils/phUtils' 

export function PhGame() {
  const [elements, setElements] = useState<ScenicElement[]>([])
  const [selectedPh, setSelectedPh] = useState<number>(7)
  const [actualPh, setActualPh] = useState<number>(7)
  const [gameStatus, setGameStatus] = useState<'playing' | 'correct' | 'incorrect'>('playing')
  const [attempts, setAttempts] = useState<number>(0)
  const [score, setScore] = useState<number>(0)

  // Generate random pH on component mount and after each round
  useEffect(() => {
    if (gameStatus === 'playing') {
      const randomPh = parseFloat((Math.random() * 14).toFixed(1))
      setActualPh(randomPh)
    }
  }, [attempts, gameStatus])

  // Handle element addition
  const handleAddElement = (element: ScenicElement) => {
    setElements(prev => [...prev, element])
    const newPh = calculateNewPh(actualPh, element)
    setActualPh(newPh)
  }
  
  // Add missing handlePhChange function
  const handlePhChange = (value: number) => {
    setSelectedPh(value)
  }

  const handleSubmit = () => {
    // Consider answers within +/- 0.5 to be correct
    const isCorrect = Math.abs(selectedPh - actualPh) <= 0.5
    
    setGameStatus(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    
    // Reset after 2 seconds
    setTimeout(() => {
      setGameStatus('playing')
      setAttempts(prev => prev + 1)
    }, 2000)
  }

  const handleRestart = () => {
    setScore(0)
    setAttempts(0)
    setGameStatus('playing')
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-lg">
            Score: <span className="font-bold">{score}</span> / {attempts}
          </p>
        </div>
        
        <WaterBox ph={actualPh} gameStatus={gameStatus} />
        
        <PhScale 
          value={selectedPh} 
          onChange={handlePhChange} 
          disabled={gameStatus !== 'playing'} 
        />
        
        <div className="w-full">
          <button
            onClick={handleSubmit}
            disabled={gameStatus !== 'playing'}
            className={`w-full py-3 rounded-lg font-medium transition ${
              gameStatus === 'playing' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        </div>
        
        <ResultDisplay 
          gameStatus={gameStatus} 
          selectedPh={selectedPh} 
          actualPh={actualPh} 
        />
        
        {attempts > 0 && (
          <button
            onClick={handleRestart}
            className="text-blue-600 hover:underline"
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  )
}
