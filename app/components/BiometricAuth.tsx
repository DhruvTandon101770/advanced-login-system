'use client'

import { useState } from 'react'

export default function BiometricAuth({ onLogin }: { onLogin: (data: any) => void }) {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate facial recognition process
    setTimeout(() => {
      setIsScanning(false)
      onLogin({ method: 'biometric', success: Math.random() > 0.3 }) // 70% success rate for demo
    }, 3000)
  }

  return (
    <div className="text-center">
      <button
        onClick={handleScan}
        disabled={isScanning}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isScanning ? 'Scanning...' : 'Scan Face'}
      </button>
    </div>
  )
}