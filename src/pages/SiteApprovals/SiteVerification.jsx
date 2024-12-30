import axiosInstance from '../../services/axios/custom-axios';
import apis from '@/APIs/APIs';
import { useEffect, useState } from 'react';
import SiteApprovalTable from '@/components/tables/siteApprovalTable';
import PageSelector from '@/components/pageSelector/pageSelector';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"


const SiteVerification = () => {
    const [pendings, setPendings] = useState([]);
    const [pagination, setPagination] = useState({});
    const [lastUpdate, setLastUpdate] = useState('N/A');
    const [currentPage, setCurrentPage] = useState(1);
    const { toast } = useToast();

    const fetchPendings = async ({page = 1}) => {
        try {
            console.log('Requesting:', axiosInstance.defaults.baseURL + apis.getPendingApprovals.urls);
            const response = await axiosInstance.get(`${apis.getPendingApprovals.urls}?page=${page}`);
            console.log(response.data);
            setPendings(response.data.data);
            setPagination(response.data.pagination);
            setLastUpdate(Date.now());
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    useEffect(() => {
        fetchPendings();
    }, []);

    useEffect(() => {
        fetchPendings({page: currentPage});
    }, [currentPage]);

    return (
        <div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 h-4/5 mx-12 my-7">
            <div className="px-3 py-5 text-left">
                <h1 className="font-bold">Danh sách bài đăng chờ duyệt</h1>
                <p className="text-sm text-gray-700">Số lượng địa điểm chờ duyệt: {pagination.totalItems}</p>
                {/* // TODO: Implement sort */}
                {/* <p className="text-sm">Sắp xếp theo:</p> */}
            </div>
            <SiteApprovalTable data={pendings} lastUpdate={lastUpdate} />
            <div className="flex flex-row w-full justify-center">
                <PageSelector currentPage={currentPage} maxPage={pagination.totalPages} setFunction={setCurrentPage} />
            </div>
        </div>
    );
}

export default SiteVerification;