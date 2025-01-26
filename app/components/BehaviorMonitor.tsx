'use client'

import { useEffect } from 'react'

export default function BehaviorMonitor({ onBehaviorChange }: { onBehaviorChange: (data: any) => void }) {
  useEffect(() => {
    let mouseMovements: { x: number; y: number; timestamp: number }[] = []
    let keyPresses: { key: string; timestamp: number }[] = []

    const handleMouseMove = (e: MouseEvent) => {
      mouseMovements.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() })
      if (mouseMovements.length > 100) mouseMovements.shift() // Keep last 100 movements
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      keyPresses.push({ key: e.key, timestamp: Date.now() })
      if (keyPresses.length > 50) keyPresses.shift() // Keep last 50 key presses
    }

    const reportBehavior = () => {
      onBehaviorChange({ mouseMovements, keyPresses })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keypress', handleKeyPress)
    const intervalId = setInterval(reportBehavior, 5000) // Report every 5 seconds

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keypress', handleKeyPress)
      clearInterval(intervalId)
    }
  }, [onBehaviorChange])

  return null // This component doesn't render anything
}