import React, { useState, useEffect } from 'react';
import apis from '@/APIs/APIs';
import axiosInstance from '../../services/axios/custom-axios';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import PageSelector from '@/components/pageSelector/pageSelector';
import RightSearch from '@/components/search/rightSearch';
import { Button } from '@/components/ui/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import urls from '@/routes/urls';
import SiteServiceGroupTable from '@/components/tables/siteServiceGroupTable';
import SiteReportTable from '@/components/tables/SiteReportTable';

const ReportPageSite = () => {
	const [data, setData] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const { toast } = useToast();
	const [lastUpdate, setLastUpdate] = useState("N/A");
	const [pagination, setPagination] = useState({});
	const [text, setText] = useState("");
	const [isSubmit, setIsSubmit] = useState(false);

	// Fetch the data from API
	const fetchData = async () => {
		try {
			const response = await axiosInstance.get(apis.getSiteReport.urls.replace(':page', currentPage));
			if (!response.data) {
				return;
			}
			setLastUpdate(Date.now());
			setPagination(response.data.pagination);
         setData(response.data.data);
			setIsPending(false);
		} catch (error) {
			console.log(error);
			toast({
				variant: "destructive",
				title: "Có vấn đề gì đó với server",
				description: "Chờ chút rồi thử lại sau nhé",
				action: <ToastAction altText="Try again">Thử lại</ToastAction>,
			})
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [currentPage]);

	useEffect(() => {
		if (isSubmit) {
			fetchData();
			setIsSubmit(false);
		}
	}, [isSubmit]);

	const handleAddClick = () => {
		window.location.href = urls.addSiteServiceGroup;
	}

	return (
		<div>
			<div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 mx-12 my-7 p-2 pb-10 min-h-[75%]">
				{
					isPending ? (
						<span className="loading loading-dots loading-md mt-28 ml-2"></span>
					) : (
						<div>
							<div className="px-3 py-5 text-left flex items-center">
								{/* left part */}
								<div>
									<h1 className="font-bold">Danh sách báo cáo - Địa điểm</h1>
									<div className="flex mt-2">
										<p className="text-sm text-gray-700">Tổng số: {pagination.totalItems}</p>
									</div>
								</div>
								<div className="flex mr-0 ml-auto gap-2">
									<Button onClick={handleAddClick} className="bg-blue-c">Địa điểm</Button>
									<Button onClick={handleAddClick} className="bg-gray-500">Người dùng</Button>
									<Button onClick={handleAddClick} className="bg-gray-500">Bình luận</Button>
								</div>
							</div>
							<SiteReportTable data={data} lastUpdate={lastUpdate} />
							<div className="flex flex-row w-full justify-center">
								<PageSelector currentPage={currentPage} maxPage={pagination.totalPages} setFunction={setCurrentPage} />
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
}

export default ReportPageSite;