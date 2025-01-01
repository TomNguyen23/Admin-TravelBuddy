import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClipboardList, faClockRotateLeft, faFlag, faHouse, faObjectGroup, faShapes, faUsers } from '@fortawesome/free-solid-svg-icons';
import urls from '@/routes/urls';
import { useSelector, useDispatch } from 'react-redux';

const SideBarItem = ({ token, url, icon, text, permisison = [] }) => {
   const adminPermisison = useSelector((state) => state.permission.permissions);
   const permissionCheck = () => {
      if (permisison.length === 0) return false;
      if (adminPermisison.includes("ROLE_SUPER_ADMIN")) return true; // Exception for ROLE_SUPER_ADMIN
      for (let i = 0; i < permisison.length; i++) {
         if (adminPermisison.includes(permisison[i])) return true;
      }
      return false;
   }

   if (!permissionCheck()) {
      return null;
   }
   return (
      <div>
         {(token) && (
            <div>
               <li className='md:pb-4'>
                  <Link
                     className={(window.location.href.indexOf(url) !== -1)
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-gray-500 hover:text-gray-600"}
                     to={url}>
                     <div className="text-base font-bold uppercase flex items-center">
                        <FontAwesomeIcon icon={icon} size='lg' className='pr-2' style={{ width: '24px' }} />  {text}
                     </div>
                  </Link>
               </li>
            </div>
         )}
      </div>
   )
}

const SideBar = () => {
   const token = useSelector((state) => state.auth.token);
   const permissions = useSelector((state) => state.permission.permissions);

   return (
      <div className="basis-1/6 md:p-4 bg-slate-50">
         <Link to="/">
            <div className="indicator w-fit md:mt-6 md:pb-10">
               <span className="indicator-item text-[#475569] text-xs ">admin</span>
               <div className="text-[#475569] text-xl font-bold ">Travel Buddy</div>
            </div>
         </Link>

         <ul className='md:pt-4'>
            <li className='md:pb-5 text-[#64748B] text-xs font-bold uppercase'>Danh mục</li>
            <SideBarItem token={token} url={urls.dashboard} icon={faHouse} text="Trang chủ" />
            <SideBarItem token={token} url={urls.siteApprovals} icon={faClipboardCheck} text="Duyệt địa điểm mới" permisison={["MANAGE_SITES"]} />
            <SideBarItem token={token} url={urls.allSiteTypes} icon={faShapes} text="Danh sách danh mục" permisison={["MANAGE_SITE_TYPES", "MANAGE_CATEGORIES"]} />
            <SideBarItem token={token} url={urls.allSiteServiceGroups} icon={faObjectGroup} text="Danh sách nhóm dịch vụ" permisison={["MANAGE_SITE_TYPES", "MANAGE_CATEGORIES"]} />
            <SideBarItem token={token} url={urls.siteServices} icon={faClipboardList} text="Danh sách dịch vụ" permisison={["MANAGE_SITE_TYPES", "MANAGE_CATEGORIES"]} />
            <SideBarItem token={token} url={urls.viewLogs} icon={faClockRotateLeft} text="Xem logs" permisison={["ACCESS_LOGS"]} />
            <SideBarItem token={token} url={urls.adminList} icon={faUsers} text="Quản trị viên" permisison={["MANAGE_ADMINS"]} />
            <SideBarItem token={token} url={urls.reportSites} icon={faFlag} text="Báo cáo" permisison={["MANAGE_REPORTS"]} />
         </ul>
      </div>
   );
}

export default SideBar;