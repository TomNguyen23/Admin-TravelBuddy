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

const SiteServiceGroupList = () => {
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
			const response = await axiosInstance.get(apis.allSiteServiceGroups.urls);
			if (!response.data) {
				return;
			}
			let filtered = response.data.filter((item) => {
				return item.serviceGroup.serviceGroupName.toLowerCase().includes(text.toLowerCase());
			});
			setLastUpdate(Date.now());
			setPagination({"totalItems": filtered.length, "totalPages": Math.ceil(filtered.length / 15)});
         let start = (currentPage - 1) * 15;
         let end = (start + 15) > response.data.length ? response.data.length : (start + 15);
         setData(filtered.slice(start, end));
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
									<h1 className="font-bold">Danh sách nhóm dịch vụ</h1>
									<div className="flex mt-2">
										<p className="text-sm text-gray-700">Tổng số: {pagination.totalItems}</p>
									</div>
								</div>
								<div className="flex mr-0 ml-auto gap-2">
									<RightSearch setValue={setText} setSubmit={setIsSubmit}/>
									<Button onClick={handleAddClick} className="bg-blue-c"><FontAwesomeIcon icon={faPlus} size='lg' style={{ width: '24px' }} />
									Thêm mới</Button>
								</div>
								{/* // TODO: Implement sort */}
								{/* <p className="text-sm">Sắp xếp theo:</p> */}
							</div>
							<SiteServiceGroupTable data={data} lastUpdate={lastUpdate} />
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

export default SiteServiceGroupList;