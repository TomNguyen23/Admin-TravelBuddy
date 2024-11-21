import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster"

const LoginLayout = ({ children }) => {
    return ( 
        <div className="bg-[#1e293b] min-h-screen">
            <Link className='px-3 py-5 fixed top-0 right-0 left-0' to="/login">
                <div className="indicator w-fit">
                    <span className="indicator-item text-white text-xs pr-7">admin</span>
                    <h1 className=' text-white text-lg font-bold px-4 ml-28'>Travel Buddy</h1>
                </div>
            </Link>
            {children}

            <Toaster />
        </div>
     );
}

LoginLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default LoginLayout;