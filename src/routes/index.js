import Login from '@/pages/auth/login'
import NotAuthorized from '@/pages/auth/not-authorized'
import Dashboard from '@/pages/Dashboard/Dashboard'

import LoginLayout from '@/layout/auth/login-layout'
import OTPAuth from '@/pages/auth/OTP_auth'
import SiteVerification from '@/pages/SiteApprovals/SiteVerification'
import urls from './urls'
import SiteDetail from '@/pages/SiteApprovals/SiteDetail'

const publicRoutes = [
    {path: '/', element: Login, Layout: LoginLayout},
    {path: '/not-authorized', element: NotAuthorized, Layout: LoginLayout},
    {path: '/OTP', element: OTPAuth, Layout: LoginLayout},
]

const privateRoutes = [
    {path: urls.dashboard, element: Dashboard},
    {path: urls.siteApprovals, element: SiteVerification},
    {path: urls.siteApprovalDetail + ':id', element: SiteDetail},
]

export { publicRoutes, privateRoutes }