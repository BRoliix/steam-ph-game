'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhScale } from './PhScale'
import { ResultDisplay } from './ResultDisplay'
import { ScenicElement, ScenicElements } from './ScenicElements'
import { WaterBox } from './WaterBox'
import { calculateNewPh, getAcidityStatus } from '../ utils/phUtils'
import { EducationalScreen } from './EducationalScreen'

export function PhGame() {
  const [elements, setElements] = useState<ScenicElement[]>([])
  const [selectedPh, setSelectedPh] = useState<number>(7)
  const [actualPh, setActualPh] = useState<number>(7)
  const [initialPh, setInitialPh] = useState<number>(7)
  const [gameStatus, setGameStatus] = useState<'playing' | 'correct' | 'incorrect'>('playing')
  const [attempts, setAttempts] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showEducation, setShowEducation] = useState(false)
  const [lastAddedElement, setLastAddedElement] = useState<ScenicElement | null>(null)
  const [showPhChange, setShowPhChange] = useState(false)

  useEffect(() => {
    if (gameStatus === 'playing' && !showEducation) {
      const randomPh = parseFloat((Math.random() * 8 + 4).toFixed(1))
      setActualPh(randomPh)
      setInitialPh(randomPh)
      setElements([])
      setLastAddedElement(null)
    }
  }, [attempts, gameStatus, showEducation])

  const handleAddElement = (element: ScenicElement) => {
    setElements(prev => [...prev, element])
    const newPh = Math.max(0, Math.min(14, actualPh + element.effect))
    setActualPh(newPh)
    setLastAddedElement(element)
  }
  
  const handlePhChange = (value: number) => {
    setSelectedPh(value)
  }

  const handleSubmit = () => {
    const isCorrect = Math.abs(selectedPh - actualPh) <= 0.5
    setGameStatus(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    setShowPhChange(true)
  }

  const handleContinueFromEducation = () => {
    setShowEducation(false)
    setGameStatus('playing')
    setAttempts(prev => prev + 1)
    setShowPhChange(false)
  }

  const handleRestart = () => {
    setScore(0)
    setAttempts(0)
    setGameStatus('playing')
    setElements([])
    setShowPhChange(false)
  }

  if (showEducation) {
    return (
      <EducationalScreen
        initialPh={initialPh}
        actualPh={actualPh}
        userGuess={selectedPh}
        onContinue={handleContinueFromEducation}
      />
    )
  }

  return (
    <motion.div 
      className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div 
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <p className="text-lg text-black">
            Score: <span className="font-bold">{score}</span> / {attempts}
          </p>
        </motion.div>
        
        <WaterBox ph={actualPh} gameStatus={gameStatus} />
        
        {gameStatus === 'playing' && (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">Add climate factors:</h3>
            <ScenicElements onAdd={handleAddElement} />
          </motion.div>
        )}
        
        <div className="w-full space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-red-600">Acidic</span>
            <span className="text-gray-600">Neutral</span>
            <span className="text-blue-600">Basic</span>
          </div>
          
          <PhScale 
            value={selectedPh} 
            onChange={handlePhChange} 
            disabled={gameStatus !== 'playing'} 
          />
          
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-3xl font-bold">{selectedPh.toFixed(1)}</p>
            <p className="text-sm text-gray-500">Your pH Guess</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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
        </motion.div>
        
        <AnimatePresence>
          {showPhChange && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center text-black p-4 bg-blue-100 rounded-lg"
            >
              <p>Initial pH: {initialPh.toFixed(1)}</p>
              <p>Final pH: {actualPh.toFixed(1)}</p>
              <button
                onClick={() => setShowEducation(true)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Learn More
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {gameStatus !== 'playing' && !showPhChange && (
          <ResultDisplay 
            gameStatus={gameStatus} 
            selectedPh={selectedPh} 
            actualPh={actualPh} 
          />
        )}
        
        {attempts > 0 && (
          <motion.button
            onClick={handleRestart}
            className="text-blue-600 hover:underline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Restart Game
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
