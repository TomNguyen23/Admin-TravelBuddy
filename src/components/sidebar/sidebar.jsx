import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClockRotateLeft, faHouse, faShapes } from '@fortawesome/free-solid-svg-icons';
import urls from '@/routes/urls';
import { useSelector } from 'react-redux';

const SideBarItem = ({token, url, icon, text}) => {
    return (
        <div>
            {token && (
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
    console.log(token);
    return (
        <div className="basis-1/6 md:p-4 bg-slate-50">
            <Link to="/">
                <div className="indicator w-fit md:mt-6 md:pb-10">
                    <span className="indicator-item text-[#475569] text-xs ">admin</span>
                    <div className=" text-[#475569] text-xl font-bold ">Travel Buddy</div>
                </div>
            </Link>

            <ul className='md:pt-4'>
                <li className='md:pb-5 text-[#64748B] text-xs font-bold uppercase'>Danh mục</li>
                <SideBarItem token={token} url={urls.dashboard} icon={faHouse} text="Trang chủ" />
                <SideBarItem token={token} url={urls.siteApprovals} icon={faClipboardCheck} text="Duyệt địa điểm mới" />
                <SideBarItem token={token} url={urls.allSiteTypes} icon={faShapes} text="Danh sách danh mục" />
            </ul>

        </div>
    );
}

export default SideBar;