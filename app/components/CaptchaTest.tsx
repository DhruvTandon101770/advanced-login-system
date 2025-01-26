'use client'

import { useState, useEffect } from 'react'

export default function CaptchaTest({ onPass }: { onPass: () => void }) {
  const [phrase, setPhrase] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    setPhrase(Math.random().toString(36).substring(2, 8))
    setStartTime(Date.now())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const endTime = Date.now()
    const typingSpeed = (endTime - startTime) / userInput.length // ms per character
    if (userInput === phrase && typingSpeed > 50) { // Ensure it's not too fast (bot prevention)
      onPass()
    } else {
      alert('CAPTCHA failed. Please try again.')
      setPhrase(Math.random().toString(36).substring(2, 8))
      setUserInput('')
      setStartTime(Date.now())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-200 p-4 text-center font-mono text-lg">{phrase}</div>
      <div>
        <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
          Type the phrase above
        </label>
        <input
          type="text"
          id="captcha"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Verify
      </button>
    </form>
  )
}