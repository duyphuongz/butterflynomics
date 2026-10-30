import { nav } from '@/config/siteContent'
import { AuthLayout, LoginForm, login } from '@/features/auth'

export function Login() {
  return (
    <AuthLayout
      title={login.title}
      switchTo={{ text: login.switchText, label: login.switchLink, href: nav.signup.href }}
    >
      <LoginForm />
    </AuthLayout>
  )
}
