import Login from '@/pages/auth/login'
import NotAuthorized from '@/pages/auth/not-authorized'
import Dashboard from '@/pages/Dashboard/Dashboard'

import LoginLayout from '@/layout/auth/login-layout'
import OTPAuth from '@/pages/auth/OTP_auth'
import SiteVerification from '@/pages/SiteApprovals/SiteVerification'
import urls from './urls'
import SiteDetail from '@/pages/SiteApprovals/SiteDetail'
import SiteTypeList from '@/pages/SiteType/SiteTypeList.jsx'
import SiteTypeDetail from '@/pages/SiteType/SiteTypeDetail.jsx'
import SiteTypeAdd from '@/pages/SiteType/SiteTypeAdd.jsx'
import SiteServiceGroupList from '@/pages/SiteServiceGroups/SiteServiceGroupList.jsx'
import SiteServiceGroupDetail from '@/pages/SiteServiceGroups/SiteServiceGroupDetail.jsx'
import SiteServiceGroupAdd from '@/pages/SiteServiceGroups/SiteServiceGroupAdd.jsx'
import SiteService from '@/pages/SiteService/SiteService.jsx'
import Logs from '@/pages/Logs/Logs.jsx'
import AdminList from '@/pages/Account/AdminList.jsx'
import AdminAccountDetail from '@/pages/Account/AdminAccountDetail.jsx'
import ReportPageSite from '@/pages/Report/ReportPageSite.jsx'
import ReportedSiteDetail from '@/pages/Report/ReportedSiteDetail.jsx'

const publicRoutes = [
    {path: '/', element: Login, Layout: LoginLayout},
    {path: '/not-authorized', element: NotAuthorized, Layout: LoginLayout},
    {path: '/OTP', element: OTPAuth, Layout: LoginLayout},
]

const privateRoutes = [
    {path: urls.dashboard, element: Dashboard},
    {path: urls.siteApprovals, element: SiteVerification},
    {path: urls.siteApprovalDetail + ':id', element: SiteDetail},
    {path: urls.allSiteTypes, element: SiteTypeList},
    {path: urls.siteTypeDetail + ':id', element: SiteTypeDetail},
    {path: urls.addSiteType, element: SiteTypeAdd},
    {path: urls.allSiteServiceGroups, element: SiteServiceGroupList},
    {path: urls.addSiteServiceGroup, element: SiteServiceGroupAdd},
    {path: urls.siteServiceGroupDetail + ':id', element: SiteServiceGroupDetail},
    {path: urls.siteServices, element: SiteService},
    {path: urls.viewLogs, element: Logs},
    {path: urls.adminDetail + ':id', element: AdminAccountDetail},
    {path: urls.adminList, element: AdminList},
    {path: urls.reportSites, element: ReportPageSite},
    {path: urls.reportSiteDetail + ':id', element: ReportedSiteDetail},
]

export { publicRoutes, privateRoutes }