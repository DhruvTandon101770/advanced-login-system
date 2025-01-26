'use client'

import { useState, useEffect } from 'react'
import BiometricAuth from './components/BiometricAuth'
import PasswordAuth from './components/PasswordAuth'
import CaptchaTest from './components/CaptchaTest'
import BehaviorMonitor from './components/BehaviorMonitor'

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState<'biometric' | 'password'>('biometric')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [captchaPassed, setCaptchaPassed] = useState(false)
  const [behaviorData, setBehaviorData] = useState<any>(null)

  const handleLogin = async (credentials: any) => {
    // Simulate backend validation
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...credentials, behaviorData }),
    })
    const result = await response.json()
    setIsAuthenticated(result.success)
  }

  useEffect(() => {
    if (isAuthenticated) {
      alert('Login successful!')
    }
  }, [isAuthenticated])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Secure Login</h1>
        {!captchaPassed ? (
          <CaptchaTest onPass={() => setCaptchaPassed(true)} />
        ) : (
          <>
            <div className="mb-4">
              <button
                onClick={() => setAuthMethod('biometric')}
                className={`mr-2 px-4 py-2 rounded ${
                  authMethod === 'biometric' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Biometric
              </button>
              <button
                onClick={() => setAuthMethod('password')}
                className={`px-4 py-2 rounded ${
                  authMethod === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Password
              </button>
            </div>
            {authMethod === 'biometric' ? (
              <BiometricAuth onLogin={handleLogin} />
            ) : (
              <PasswordAuth onLogin={handleLogin} />
            )}
          </>
        )}
        <BehaviorMonitor onBehaviorChange={setBehaviorData} />
      </div>
    </div>
  )
}