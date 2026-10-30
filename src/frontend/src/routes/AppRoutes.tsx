import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/config/appConfig'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'
import { Signup } from '@/pages/Signup'

export const routes = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.login, element: <Login /> },
  { path: ROUTES.signup, element: <Signup /> },
  { path: '*', element: <NotFound /> },
]

export const router = createBrowserRouter(routes)
