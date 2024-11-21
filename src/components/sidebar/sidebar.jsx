import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const SideBar = () => {
    const token = useSelector((state) => state.auth.token);
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
                
                {token && (
                    <div>
                        <li className='md:pb-4'>
                            <Link
                                className={(window.location.href.indexOf("/admin/violation-history") !== -1) 
                                    ? "text-blue-500 hover:text-blue-600" 
                                    : "text-gray-500 hover:text-gray-600"}
                                to="/admin/dashboard">
                                <div className="text-xs font-bold uppercase">
                                <FontAwesomeIcon icon={faClockRotateLeft} size='lg' className='pr-2' />  Lịch sử vi phạm
                                </div>
                            </Link>
                        </li>

                    </div>
                )}
                
            </ul>
            
        </div>
     );
}
 
export default SideBar;