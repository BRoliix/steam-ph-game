'use client'

type PhScaleProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function PhScale({ value, onChange, disabled = false }: PhScaleProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-red-600">Acidic</span>
        <span className="text-gray-600">Neutral</span>
        <span className="text-blue-600">Basic</span>
      </div>
      
      <input
        type="range"
        min="0"
        max="14"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer disabled:opacity-70"
      />
      
      <div className="flex justify-between text-xs">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
      </div>
      
      <div className="text-center">
        <p className="text-2xl font-bold">{value.toFixed(1)}</p>
        <p className="text-sm text-gray-500">pH Level</p>
      </div>
    </div>
  )
}
