import { nav } from '@/config/siteContent'
import { AuthLayout, SignupForm, signup } from '@/features/auth'

export function Signup() {
  return (
    <AuthLayout
      title={signup.title}
      switchTo={{ text: signup.switchText, label: signup.switchLink, href: nav.login.href }}
    >
      <SignupForm />
    </AuthLayout>
  )
}
