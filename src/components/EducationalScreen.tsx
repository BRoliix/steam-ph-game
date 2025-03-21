'use client'

import { useState, useEffect } from 'react'
import { getAcidityStatus } from '../ utils/phUtils'
import Image from 'next/image'

type EducationalScreenProps = {
  initialPh: number
  actualPh: number
  userGuess: number
  onContinue: () => void
}

export function EducationalScreen({ initialPh, actualPh, userGuess, onContinue }: EducationalScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isCorrect = Math.abs(actualPh - userGuess) <= 0.5
  
  const getEnvironmentalFacts = (ph: number) => {
    if (ph < 4) {
      return {
        title: "Highly Acidic Water: Climate Impact",
        facts: [
          "Rising CO₂ levels from fossil fuels cause severe ocean acidification",
          "Climate change increases acid rain through altered precipitation patterns",
          "Acidic water below pH 4.5 is lethal to most fish species",
          "Thawing permafrost releases ancient carbon that acidifies water bodies"
        ],
        climateCauses: [
          "Rising atmospheric CO₂ concentrations",
          "Increased frequency of extreme weather events",
          "Thawing permafrost releasing stored carbon",
          "Ocean warming reducing CO₂ absorption capacity"
        ],
        solutions: [
          "Rapid transition to renewable energy",
          "Carbon capture technologies",
          "Protecting and restoring carbon sinks",
          "International climate agreements to limit emissions"
        ],
        image: "/images/acidic-water-impact.jpg"
      }
    } else if (ph < 7) {
      return {
        title: "Moderately Acidic Water: Climate Impact",
        facts: [
          "Ocean pH has decreased by 0.1 units since pre-industrial times due to CO₂ absorption",
          "Coral reefs and shellfish struggle to form shells in acidifying conditions",
          "Acidification affects the entire marine food web, from plankton to predators",
          "Changes in water chemistry alter nutrient availability for aquatic plants"
        ],
        climateCauses: [
          "Rising ocean temperatures",
          "Increasing atmospheric carbon dioxide",
          "Altered rainfall patterns and runoff",
          "Changes in oceanic circulation patterns"
        ],
        solutions: [
          "Reducing carbon emissions",
          "Ocean conservation and protected areas",
          "Sustainable aquaculture practices",
          "Climate-resilient coastal management"
        ],
        image: "/images/moderately-acidic-impact.jpg"
      }
    } else if (ph === 7) {
      return {
        title: "Neutral Water: Climate Change Pressures",
        facts: [
          "Neutral pH water supports the greatest biodiversity",
          "Climate change threatens water bodies that maintain neutral pH",
          "Natural buffer systems can be overwhelmed by rapid climate change",
          "Freshwater systems are particularly vulnerable to pH shifts"
        ],
        climateCauses: [
          "Changing precipitation patterns",
          "Accelerated weathering of rocks",
          "Altered watershed dynamics",
          "Changes in terrestrial vegetation affecting runoff"
        ],
        solutions: [
          "Watershed protection",
          "Climate monitoring programs",
          "Sustainable land management",
          "Climate adaptation planning"
        ],
        image: "/images/neutral-water-ecosystem.jpg"
      }
    } else {
      return {
        title: "Basic Water: Climate Change Effects",
        facts: [
          "Climate-driven algal blooms can temporarily increase water pH",
          "Drought concentrates minerals and can increase alkalinity",
          "Basic conditions can release ammonia that is toxic to aquatic life",
          "Climate change alters the balance between acidification and alkalization processes"
        ],
        climateCauses: [
          "Increased water temperatures promoting algal growth",
          "Drought and evaporation concentrating minerals",
          "Changes in groundwater recharge patterns",
          "Altered watershed dynamics"
        ],
        solutions: [
          "Climate-smart water management",
          "Ecosystem-based adaptation approaches",
          "Monitoring and early warning systems",
          "Reducing nutrient pollution"
        ],
        image: "/images/basic-water-impact.jpg"
      }
    }
  }
  
  const environmentalInfo = getEnvironmentalFacts(actualPh)
  const slides = [
    { title: "Water pH and Climate Change Impact", content: "environmentalFactsSlide" },
    { title: "How Climate Change Affects Water pH", content: "climateCausesSlide" },
    { title: "Solutions for Climate Resilience", content: "solutionsSlide" }
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
      <div className={`p-6 ${isCorrect ? 'bg-green-500' : 'bg-blue-600'} text-white`}>
        <h2 className="text-2xl font-bold mb-2">
          {isCorrect ? 'Great job!' : 'Learning opportunity!'}
        </h2>
        <p className="text-lg">
          Initial pH: <span className="font-bold">{initialPh.toFixed(1)}</span>
        </p>
        <p className="text-lg">
          Final pH: <span className="font-bold">{actualPh.toFixed(1)}</span>, making it <span className="font-bold">{getAcidityStatus(actualPh)}</span>
        </p>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl text-black font-bold mb-4">{slides[currentSlide].title}</h3>
        
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Climate Impact on Water</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                Climate change is altering water pH levels worldwide, affecting aquatic ecosystems and biodiversity.
              </p>
            </div>
          </div>
        )}
        
        {currentSlide === 1 && (
          <div className="space-y-6">
            <p className="text-black">
              Climate change significantly impacts water pH levels through various mechanisms. 
              As our planet warms, water bodies are experiencing unprecedented pH shifts.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <h4 className="font-bold text-orange-800 mb-2">Climate Factors Affecting Water pH</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                {environmentalInfo.climateCauses.map((cause, index) => (
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
                "Ocean acidity has increased by 30% since the Industrial Revolution due to increasing 
                atmospheric CO₂ levels, representing one of the most dramatic chemical changes in Earth's oceans."
              </p>
            </div>
          </div>
        )}
        
        {currentSlide === 2 && (
          <div className="space-y-6">
            <p className="text-black">
              Addressing climate change is essential to protecting water quality and maintaining healthy pH levels 
              in our oceans, lakes, and rivers.
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
                      Climate action helps maintain healthy water ecosystems for future generations.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-black">
              <h4 className="font-bold mb-2">What You Can Do</h4>
              <p>
                Even as an individual, you can make a difference by reducing your carbon footprint, 
                conserving water, and educating others about climate change impacts on our water resources.
              </p>
            </div>
          </div>
        )}
      </div>
      
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
