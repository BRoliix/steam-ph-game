'use client'

import { PhGame } from '@/components/PhGame'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">pH Scale Game</h1>
      <p className="text-gray-600 max-w-md text-center mb-8">
        Adjust the pH scale to match the water color. Identify if the solution is acidic, basic, or neutral.
      </p>
      <PhGame />
    </main>
  )
}
