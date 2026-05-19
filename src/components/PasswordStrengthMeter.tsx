import { useState } from 'react'
import { calculatePasswordStrength } from '../utils/passwordStrength'

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = calculatePasswordStrength(password)

  return (
    <div>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{strength}</p>
    </div>
  )
}