import { SITE } from '@/constants'
import { redirect } from 'next/navigation'
const LoginPage = () => {
  redirect(SITE.LOGIN_URL)
}
export default LoginPage
