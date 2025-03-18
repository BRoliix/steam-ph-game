'use client'

import { useState, useEffect } from 'react'
import { getAcidityStatus } from '../ utils/phUtils'
import Image from 'next/image'

type EducationalScreenProps = {
  actualPh: number
  userGuess: number
  onContinue: () => void
}

export function EducationalScreen({ actualPh, userGuess, onContinue }: EducationalScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isCorrect = Math.abs(actualPh - userGuess) <= 0.5
  
  // Environmental impact facts based on pH level
  const getEnvironmentalFacts = (ph: number) => {
    if (ph < 4) {
      return {
        title: "Highly Acidic Water: Human Impact",
        facts: [
          "Industrial emissions release sulfur dioxide and nitrogen oxides that create acid rain",
          "Mining operations expose minerals that create acidic runoff",
          "Acid rain can dissolve toxic metals that harm aquatic life",
          "Acidic water below pH 4.5 is lethal to most fish species"
        ],
        humanCauses: [
          "Fossil fuel burning in power plants",
          "Vehicle emissions",
          "Mining waste",
          "Industrial chemical discharge"
        ],
        solutions: [
          "Renewable energy adoption",
          "Emissions control technology",
          "Mine drainage treatment",
          "Industrial waste regulation"
        ],
        image: "/images/acidic-water-impact.jpg"
      }
    } else if (ph < 7) {
      return {
        title: "Moderately Acidic Water: Human Impact",
        facts: [
          "Agricultural runoff can lower water pH through nitrogen-based fertilizers",
          "Urban stormwater carries pollutants that increase acidity",
          "Slightly acidic water affects sensitive species first",
          "Coral reefs and shellfish struggle to form shells in acidic conditions"
        ],
        humanCauses: [
          "Fertilizer overuse",
          "Deforestation",
          "Urban development",
          "Carbon dioxide emissions"
        ],
        solutions: [
          "Sustainable farming practices",
          "Reforestation efforts",
          "Green infrastructure",
          "Carbon capture technologies"
        ],
        image: "/images/moderately-acidic-impact.jpg"
      }
    } else if (ph === 7) {
      return {
        title: "Neutral Water: Maintaining Balance",
        facts: [
          "Neutral pH water supports the greatest biodiversity",
          "Natural buffer systems help maintain neutral pH",
          "Human activities can overwhelm natural buffers",
          "Clean water regulations help protect neutral waterways"
        ],
        humanCauses: [
          "Wastewater discharge",
          "Wetland destruction",
          "Removal of vegetation buffers",
          "Altering natural water flows"
        ],
        solutions: [
          "Wetland restoration",
          "Riparian buffer zones",
          "Wastewater treatment",
          "Water quality monitoring"
        ],
        image: "/images/neutral-water-ecosystem.jpg"
      }
    } else {
      return {
        title: "Basic Water: Human Impact",
        facts: [
          "Agricultural lime and industrial discharge can increase water pH",
          "Algal blooms from nutrient pollution can raise pH in water bodies",
          "Basic water can release ammonia that is toxic to aquatic life",
          "Hard water deposits can damage aquatic habitats"
        ],
        humanCauses: [
          "Industrial alkaline waste",
          "Detergents and cleaning products",
          "Cement and concrete runoff",
          "Excessive algal growth from phosphorus pollution"
        ],
        solutions: [
          "Proper waste disposal",
          "Phosphate-free detergents",
          "Construction runoff controls",
          "Nutrient management plans"
        ],
        image: "/images/basic-water-impact.jpg"
      }
    }
  }
  
  const environmentalInfo = getEnvironmentalFacts(actualPh)
  const slides = [
    { title: "Water pH and Human Impact", content: "environmentalFactsSlide" },
    { title: "How Humans Affect Water pH", content: "humanCausesSlide" },
    { title: "Solutions for Healthier Water", content: "solutionsSlide" }
  ]
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onContinue()
    }
  }
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with result and pH information */}
      <div className={`p-6 ${isCorrect ? 'bg-green-500' : 'bg-blue-600'} text-white`}>
        <h2 className="text-2xl font-bold mb-2">
          {isCorrect ? 'Great job!' : 'Learning opportunity!'}
        </h2>
        <p className="text-lg">
          The water had a pH of <span className="font-bold">{actualPh.toFixed(1)}</span>, 
          making it <span className="font-bold">{getAcidityStatus(actualPh)}</span>.
        </p>
      </div>
      
      {/* Slide content */}
      <div className="p-6">
        <h3 className="text-xl text-black font-bold mb-4">{slides[currentSlide].title}</h3>
        
        {/* Environmental Facts Slide */}
        {currentSlide === 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-black mb-3">{environmentalInfo.title}</h4>
              <ul className="space-y-2 text-black">
                {environmentalInfo.facts.map((fact, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-blue-100 text-blue-800 rounded-full flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="relative w-full h-48 md:h-64 mb-3 rounded-lg overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Water Ecosystem Impact</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                pH {actualPh.toFixed(1)} water affects ecosystems by changing nutrient availability 
                and impacting aquatic life.
              </p>
            </div>
          </div>
        )}
        
        {/* Human Causes Slide */}
        {currentSlide === 1 && (
          <div className="space-y-6">
            <p className="text-black">
              Human activities significantly impact water pH levels. When water becomes 
              too acidic or basic, it disrupts aquatic ecosystems and can harm wildlife.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <h4 className="font-bold text-orange-800 mb-2">Human Activities Affecting Water pH</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                {environmentalInfo.humanCauses.map((cause, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mr-3">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span>{cause}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded">
              <p className="italic text-blue-800">
                "Human activities have released so many different chemicals into the air and water 
                that they have changed the natural balance of ecosystems."
              </p>
            </div>
          </div>
        )}
        
        {/* Solutions Slide */}
        {currentSlide === 2 && (
          <div className="space-y-6">
            <p className="text-black">
              There are many actions we can take to protect water quality and maintain healthy pH levels 
              in our lakes, rivers, and oceans.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {environmentalInfo.solutions.map((solution, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg flex">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-green-800">{solution}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Taking action to implement this solution helps maintain healthy water ecosystems.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-black">
              <h4 className="font-bold mb-2 ">What You Can Do</h4>
              <p>
                Even as a student, you can make a difference by reducing water pollution, 
                conserving water, and educating others about protecting our water resources.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="bg-gray-100 px-6 py-4 flex justify-between">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded ${
            currentSlide === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        
        <button 
          onClick={nextSlide}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {currentSlide === slides.length - 1 ? 'Continue Game' : 'Next'}
        </button>
      </div>
    </div>
  )
}
