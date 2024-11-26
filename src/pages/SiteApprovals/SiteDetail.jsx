import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faUser } from '@fortawesome/free-solid-svg-icons';
import apis from '@/APIs/APIs';
import axiosInstance from '../../services/axios/custom-axios';
import { Button } from '@/components/ui/button';

const PartHeader = ({ icon, title }) => {
    return (
        <div className="flex text-md text-blue-900">
            <div className="text-xs font-bold uppercase flex items-center">
                <FontAwesomeIcon icon={icon} size='lg' className='pr-2' style={{ width: '24px' }} />
            </div>
            <h2 className="font-bold text-lg">{title}</h2>
        </div>
    )
}

const SiteDetail = () => {
    const [data, setData] = useState({});
    const [currentID, setCurrentID] = useState(null);

    const fetchInformations = async (id) => {
        try {
            const response = await axiosInstance.get(`${apis.forceGetSiteVersionDetails.urls}${id}`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        let currentID = window.location.pathname.split("/").pop();
        setCurrentID(currentID);
        if (currentID) {
            fetchInformations(currentID);
        }
    }, []);

    return (
        <div className="bg-white border shadow-lg rounded-md text-2xl text-center absolute right-0 top-28 left-0 h-3/4 mx-12 my-7">
            <div className='flex'>
                <div className="px-3 py-5 text-left">
                    {/* left part */}
                    <h1 className="font-bold">Kiểm duyệt bài đăng</h1>
                    <div className="flex mt-2">
                        <text className="text-sm text-gray-700">ID phiên bản: {data.siteVersionId}</text>
                        <text className="ml-10 text-sm text-gray-700">ID địa điểm: {data.siteId}</text>
                    </div>
                    {/* // TODO: Implement sort */}
                    {/* <p className="text-sm">Sắp xếp theo:</p> */}
                </div>
                <div className='px-3 py-5 text-left flex flex-row-reverse mr-0 ml-auto'>
                    {/* right part */}
                    <Button className="mr-1">Thoát</Button>
                    <Button className="mr-1">Từ chối</Button>
                    <Button className="mr-1">Chấp nhận</Button>
                </div>
            </div>

            <div className="flex h-full">
                <div className="w-1/2 px-4 border-r">
                    {/* Left part content */}
                    <div className="mb-3">
                        <PartHeader icon={faUser} title="Thông tin chủ sở hữu" />
                        <p className="text-base text-left ml-8">Chủ sở hữu: {data.ownerUsername}</p>
                    </div>

                    <div>
                        <PartHeader icon={faFileLines} title="Nội dung địa điểm" />
                        <p className="text-base text-left ml-8">Chủ sở hữu: {data.ownerUsername}</p>
                    </div>
                </div>
                <div className="w-1/2 p-4">
                    {/* Right part content */}
                </div>
            </div>
        </div>
    );
}

export default SiteDetail;