import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  it('renders a password input', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows vacía as the initial strength', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('shows débil when typing a short password', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByRole('textbox'), 'abc')
    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('shows media when typing 8+ characters with no numbers or symbols', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByRole('textbox'), 'abcdefgh')
    expect(screen.getByText('media')).toBeInTheDocument()
  })

  it('shows fuerte when typing 8+ characters with a number', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByRole('textbox'), 'abcdefg1')
    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })

  it('shows muy fuerte when typing 8+ characters with a number and a symbol', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByRole('textbox'), 'abcdefg1!')
    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })

  it('returns to vacía when the password is cleared', async () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'abcdefg1')
    await userEvent.clear(input)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('shows media and not débil for exactly 8 characters with no numbers', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByRole('textbox'), 'abcdefgh')
    expect(screen.getByText('media')).toBeInTheDocument()
    expect(screen.queryByText('débil')).not.toBeInTheDocument()
  })

  it('shows débil and not media for exactly 7 characters', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByRole('textbox'), 'abcdefg')
    expect(screen.getByText('débil')).toBeInTheDocument()
    expect(screen.queryByText('media')).not.toBeInTheDocument()
  })
})