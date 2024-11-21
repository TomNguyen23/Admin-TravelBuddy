import Navbar from "@/components/navbar/navbar";
import SideBar from "@/components/sidebar/sidebar";
import PropTypes from "prop-types";

import { Toaster } from "@/components/ui/toaster"

function HomePage( { children } ) {

    return ( 
    <div className="flex flex-wrap min-h-screen">
        <SideBar />
        <div className="flex-1 basis-5/6 pb-7 relative">
            <Navbar />
            <div className="flex-grow">
                {children}
                <Toaster />
            </div>
        </div>
    </div> 
    );
}

HomePage.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default HomePage;