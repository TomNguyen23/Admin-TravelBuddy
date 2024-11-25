import axiosInstance from '../../services/axios/custom-axios';
import apis from '@/APIs/APIs';
import { useEffect } from 'react';

const SiteVerification = () => {
    const fetchPendings = async () => {
        try {
            const response = await axiosInstance.get(apis.getPendingApprovals.urls);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendings();
    }, []);

    return (
        <div className="bg-white border shadow-lg rounded-md text-2xl text-center absolute right-0 top-28 left-0 h-3/4 mx-12 my-7">
            Site
        </div>
     );
}

export default SiteVerification;