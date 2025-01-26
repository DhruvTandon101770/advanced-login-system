import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { method, username, password, behaviorData } = body

  // Simulate behavior analysis
  const isBehaviorNormal = Math.random() > 0.1 // 90% chance of normal behavior

  let success = false
  let message = ''

  if (method === 'biometric') {
    success = body.success && isBehaviorNormal
    message = success ? 'Biometric authentication successful' : 'Biometric authentication failed'
  } else if (method === 'password') {
    // In a real app, you'd check against a database here
    success = username === 'demo' && password === 'password' && isBehaviorNormal
    message = success ? 'Password authentication successful' : 'Invalid username or password'
  }

  if (!isBehaviorNormal) {
    message = 'Unusual behavior detected. Additional verification required.'
  }

  return NextResponse.json({ success, message })
}