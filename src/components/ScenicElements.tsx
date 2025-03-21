'use client'

import { motion } from 'framer-motion'

export type ScenicElement = {
  id: string
  type: 'co2' | 'warming' | 'acidRain' | 'algalBloom' | 'meltwater'
  name: string
  effect: number
  description: string
}

const elements: ScenicElement[] = [
  {
    id: 'co2',
    type: 'co2',
    name: 'CO₂ Absorption',
    effect: -0.7,
    description: 'Atmospheric CO₂ dissolves in water forming carbonic acid'
  },
  {
    id: 'warming',
    type: 'warming',
    name: 'Water Warming',
    effect: -0.3,
    description: 'Warmer water holds less dissolved oxygen and increases acidity'
  },
  {
    id: 'acidRain',
    type: 'acidRain',
    name: 'Acid Rain',
    effect: -0.8,
    description: 'Precipitation containing elevated levels of sulfuric and nitric acids'
  },
  {
    id: 'meltwater',
    type: 'meltwater',
    name: 'Glacier Meltwater',
    effect: -0.4,
    description: 'Melting ice releases ancient trapped CO₂ and exposes new rock surfaces'
  },
  {
    id: 'algalBloom',
    type: 'algalBloom',
    name: 'Algal Bloom',
    effect: 0.5,
    description: 'Rapid growth of algae can temporarily increase pH during photosynthesis'
  }
]

export function ScenicElements({ onAdd }: { onAdd: (element: ScenicElement) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 text-black">
      {elements.map((element) => (
        <motion.button
          key={element.id}
          onClick={() => onAdd(element)}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg 
            className="w-6 h-6 text-gray-600" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {/* Add appropriate SVG paths for each element type */}
          </motion.svg>
          <span className="text-xs mt-1">{element.name}</span>
          <span className="text-xs text-red-600">{element.effect > 0 ? '+' : ''}{element.effect.toFixed(1)} pH</span>
        </motion.button>
      ))}
    </div>
  )
}
