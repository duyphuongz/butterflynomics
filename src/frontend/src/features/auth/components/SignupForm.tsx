import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Notice } from '@/components/common'
import { nav } from '@/config/siteContent'
import { signup } from '@/features/auth/content'
import { mockSignup } from '@/features/auth/services/mockAuth'
import { PasswordStrength } from '@/features/auth/components/PasswordStrength'
import { emailError, missingPasswordRules } from '@/features/auth/validation'

type Errors = { email?: string; password?: string; confirm?: string }
type Result = 'success' | 'taken' | null

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Result>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    const next: Errors = { email: emailError(value) }
    const missing = missingPasswordRules(password)
    if (!password) next.password = signup.errors.passwordEmpty
    else if (missing.length) next.password = `${signup.errors.passwordWeak}${missing.join(', ')}.`
    if (!confirm) next.confirm = signup.errors.confirmEmpty
    else if (password && confirm !== password) next.confirm = signup.errors.confirmMismatch
    setErrors(next)
    setResult(null)
    if (next.email) return emailRef.current?.focus()
    if (next.password) return passwordRef.current?.focus()
    if (next.confirm) return confirmRef.current?.focus()

    setBusy(true)
    const ok = await mockSignup(value)
    setBusy(false)
    setResult(ok ? 'success' : 'taken')
  }

  return (
    <form
      aria-label={signup.formLabel}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-ds-4"
    >
      <Input
        label={signup.email}
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        inputRef={emailRef}
      />
      <Input
        label={signup.password}
        type="password"
        name="password"
        autoComplete="new-password"
        required
        maxLength={72}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hint={signup.passwordHint}
        error={errors.password}
        inputRef={passwordRef}
      />
      <PasswordStrength value={password} />
      <Input
        label={signup.confirm}
        type="password"
        name="confirm"
        autoComplete="new-password"
        required
        maxLength={72}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm}
        inputRef={confirmRef}
      />
      <Button type="submit" variant="primary" aria-busy={busy || undefined} disabled={busy}>
        {signup.submit}
      </Button>
      {result === 'success' && (
        <Notice role="status" title={signup.successTitle}>
          {signup.successBody}{' '}
          <Link className="bn-link" to={nav.login.href}>
            {signup.successLink}
          </Link>
          .
        </Notice>
      )}
      {result === 'taken' && (
        <Notice role="status" title={signup.takenTitle}>
          {signup.takenBody}
        </Notice>
      )}
    </form>
  )
}
