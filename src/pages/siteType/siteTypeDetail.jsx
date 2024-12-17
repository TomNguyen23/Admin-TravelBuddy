import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import apis from '@/APIs/APIs';
import axiosInstance from '../../services/axios/custom-axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dateTimeFormat from '@/assets/js/formatter';
import { dowShortEnum } from '@/assets/js/formatter';
import numeral from 'numeral';
import urls from '@/routes/urls';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label';

const Header = ({ data }) => {
	return (
		<div className='flex'>
			<div className="py-5 text-left">
				{/* left part */}
				<h1 className="font-bold">Chi tiết danh mục</h1>
				<div className="mt-2">
					<p className="text-sm text-gray-700">ID danh mục: {data.siteType.id}</p>
				</div>
				{/* // TODO: Implement sort */}
				{/* <p className="text-sm">Sắp xếp theo:</p> */}
			</div>
			<div className='py-5 text-left flex flex-row-reverse mr-0 ml-auto'>

			</div>
		</div>
	)
}

const SiteTypeDetail = ({ }) => {
	const [data, setData] = useState('N/A');
	const [loading, setLoading] = useState(true);
	const { toast } = useToast();
	const [typeMode, setTypeMode] = useState(null);

	const fetchData = async () => {
		try {
			const response = await axiosInstance.get(apis.getSiteTypeAndServices.urls.replace(':id', window.location.pathname.split("/").pop()));
			// If 404
			// TODO: Redirect to 404 page
			setData(response.data)
			setTypeMode(response.data.siteType.attraction == response.data.siteType.amenity ? "DUAL" : (response.data.siteType.attraction ? "ATTRACTION" : "AMENITY"))
			setLoading(false)
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

	// Initial state
	useEffect(() => {
		fetchData();
	}, [])

	if (loading) {
		return (
			<div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 mx-12 my-7 p-2 pb-10 min-h-[75%]">
				<span className="loading loading-dots loading-md mt-28 ml-2"></span>
			</div>
		); // Render a loading indicator while data is being fetched
	}
	return (
		<div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 mx-12 my-7 px-5 pb-10 min-h-[75%]">
			<Header data={data} />
			<div className="flex h-full">
			{/* <Label>Tên danh mục</Label>
			<Input value={data.siteType.name} disabled /> */}
				<div className="flex w-1/2 p-4 flex-col items-start gap-2">
					<Label>Tên danh mục</Label>
					<Input value={data.siteType.name} />
				</div>
				<div className=" flex w-1/2 p-4 flex-col items-start gap-2">
					<Label>Mô tả danh mục</Label>
					<div className="gap-2 flex">
						<Button variant="primary" className={typeMode == "ATTRACTION" ? "text-white bg-blue-c" : "text-white bg-gray-400"} onClick={() => setTypeMode("ATTRACTION")}>Địa điểm du lịch</Button>
						<Button variant="primary" className={typeMode == "AMENITY" ? "text-white bg-blue-c" : "text-white bg-gray-400"} onClick={() => setTypeMode("AMENITY")}>Tiện ích</Button>
						<Button variant="primary" className={typeMode == "DUAL" ? "text-white bg-blue-c" : "text-white bg-gray-400"} onClick={() => setTypeMode("DUAL")}>Chung</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SiteTypeDetail;