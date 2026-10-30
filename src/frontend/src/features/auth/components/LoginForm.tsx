import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/appConfig'
import { Button, Checkbox, Input, Notice } from '@/components/common'
import { login } from '@/features/auth/content'
import { mockLogin } from '@/features/auth/services/mockAuth'
import { readRememberedEmail, saveRememberedEmail } from '@/features/auth/services/rememberedEmail'
import { emailError } from '@/features/auth/validation'

type Errors = { email?: string; password?: string }
type Result = 'success' | 'fail' | null

export function LoginForm() {
  const [remembered] = useState(readRememberedEmail)
  const [email, setEmail] = useState(remembered)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(remembered !== '')
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Result>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    const next: Errors = { email: emailError(value) }
    if (!password) next.password = login.errors.passwordEmpty
    setErrors(next)
    setResult(null)
    if (next.email) return emailRef.current?.focus()
    if (next.password) return passwordRef.current?.focus()

    setBusy(true)
    const ok = await mockLogin(value, password)
    setBusy(false)
    setResult(ok ? 'success' : 'fail')
    if (ok) saveRememberedEmail(remember ? value : null)
  }

  return (
    <form
      aria-label={login.formLabel}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-ds-4"
    >
      <Input
        label={login.email}
        type="email"
        name="email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        inputRef={emailRef}
      />
      <Input
        label={login.password}
        type="password"
        name="password"
        autoComplete="current-password"
        required
        maxLength={72}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        inputRef={passwordRef}
      />
      <Checkbox
        label={login.remember}
        name="remember"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />
      <Button type="submit" variant="primary" aria-busy={busy || undefined} disabled={busy}>
        {login.submit}
      </Button>
      {result === 'success' && (
        <Notice role="status" title={login.successTitle}>
          {login.successBody}{' '}
          <Link className="bn-link" to={ROUTES.home}>
            {login.successLink}
          </Link>
          .
        </Notice>
      )}
      {result === 'fail' && (
        <Notice role="status" title={login.failTitle}>
          {login.failBody}
        </Notice>
      )}
    </form>
  )
}
