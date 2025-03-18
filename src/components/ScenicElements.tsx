// components/ScenicElements.tsx
import { useState } from 'react'

export type ScenicElement = {
  id: string
  type: 'limestone' | 'algae' | 'pollution' | 'plant' | 'oil'
  position: { x: number; y: number }
  effect: number
}

export function ScenicElements({ onAdd }: { onAdd: (element: ScenicElement) => void }) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onAdd({ 
          id: '1', 
          type: 'limestone', 
          position: { x: 0, y: 0 }, 
          effect: 0.5 
        })}
        className="p-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s1.9-2.659 3.065-2.659c1.23 0 2.211.636 2.665 1.59L19 6.91V3a1 1 0 00-1.106-1.106H5a1 1 0 00-1.106 1.106v3.91L8 6h3.06c.4.306.92.659 1.4.659A1.4 1.4 0 0012 6z" />
        </svg>
        <span className="ml-2">Limestone</span>
      </button>

      {/* Add other elements with SVG icons */}
      {/* ... */}
    </div>
  )
}
