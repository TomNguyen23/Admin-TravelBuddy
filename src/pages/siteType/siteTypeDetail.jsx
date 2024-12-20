import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, CommandDialog } from "@/components/ui/command"

const Header = ({ data, handleSubmit }) => {
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
			<div className='py-5 text-left flex flex-row-reverse mr-0 ml-auto gap-2'>
				<Button className="">Hủy</Button>
				<Button className="bg-blue-c" onClick={handleSubmit}>Lưu thay đổi</Button>
			</div>
		</div>
	)
}

const ServiceGroupCommand = ({ items, open, setOpen, onAdd }) => {
	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Tìm kiếm" />
			<CommandList>
				<CommandEmpty>Không có kết quả</CommandEmpty>
				<CommandGroup heading="Danh mục">
					{items.map((serviceGroup, index) => (
						<CommandItem key={index} onSelect={() => onAdd(serviceGroup)}>
							<span>{serviceGroup.serviceGroup.serviceGroupName}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
};

const SiteTypeDetail = ({ }) => {
	const [data, setData] = useState('N/A');
	const [loading, setLoading] = useState(true);
	const { toast } = useToast();
	const [typeMode, setTypeMode] = useState(null);
	const [newServiceGroups, setNewServiceGroups] = useState([]);
	const [serviceGroups, setServiceGroups] = useState([]);
	const [commandOpen, setCommandOpen] = useState(false);
	const [updateStatus, setUpdateStatus] = useState({ "delete": false, "insert": false, "siteType": false });
	const [siteTypeName, setSiteTypeName] = useState("");

	const fetchData = async () => {
		try {
			const response = await axiosInstance.get(apis.getSiteTypeAndServices.urls.replace(':id', window.location.pathname.split("/").pop()));
			// If 404
			// TODO: Redirect to 404 page
			setData(response.data)
			setTypeMode(response.data.siteType.attraction == response.data.siteType.amenity ? "DUAL" : (response.data.siteType.attraction ? "ATTRACTION" : "AMENITY"))
			setLoading(false)
			setNewServiceGroups(response.data.groupedSiteServices)
			setSiteTypeName(response.data.siteType.name)
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

	const fetchServiceGroups = async () => {
		try {
			const response = await axiosInstance.get(apis.getAllServiceGroups.urls);
			setServiceGroups(response.data)
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

	const submitChanges = async () => {
		try {
			await Promise.all([putInsert(), putDelete(), putSiteType()]);
			toast({
				title: "Thành công",
				description: "Dữ liệu đã được cập nhật",
			});
			// Redirect to the list page after 2s
			setTimeout(() => {
				window.location.href = urls.allSiteTypes;
			}, 2000);
		} catch (error) {
			console.log(error);
			toast({
				variant: "destructive",
				title: "Có vấn đề gì đó",
				description: "Chờ chút rồi thử lại sau nhé",
				action: <ToastAction altText="Try again">Thử lại</ToastAction>,
			})
		}
	}

	const putInsert = async () => {
		// Get the id of new service groups, which are not in the old list
		const newServiceGroupIds = newServiceGroups.filter(serviceGroup => !data.groupedSiteServices.some(oldServiceGroup => oldServiceGroup.serviceGroup.id === serviceGroup.serviceGroup.id)).map(serviceGroup => serviceGroup.serviceGroup.id)
		for (const serviceGroupId of newServiceGroupIds) {
			const response = await axiosInstance.put(apis.associateServiceGroupToType.urls.replace(':serviceGroupId', serviceGroupId).replace(':typeId', window.location.pathname.split("/").pop()));
			if (response.status == 200) {
				setUpdateStatus({ ...updateStatus, "insert": true })
			} else {
				toast({
					variant: "destructive",
					title: "Có vấn đề gì đó",
					description: "Chờ chút rồi thử lại sau nhé",
					action: <ToastAction altText="Try again">Thử lại</ToastAction>,
				})
			}
		}
	}

	const putDelete = async () => {
		// Get the id of old service groups, which are not in the new list
		const deletedServiceGroupIds = data.groupedSiteServices.filter(serviceGroup => !newServiceGroups.some(newServiceGroup => newServiceGroup.serviceGroup.id === serviceGroup.serviceGroup.id)).map(serviceGroup => serviceGroup.serviceGroup.id)
		for (const serviceGroupId of deletedServiceGroupIds) {
			const response = await axiosInstance.put(apis.detachServiceGroupFromType.urls.replace(':serviceGroupId', serviceGroupId).replace(':typeId', window.location.pathname.split("/").pop()));
			if (response.status == 200) {
				setUpdateStatus({ ...updateStatus, "delete": true })
			} else {
				toast({
					variant: "destructive",
					title: "Có vấn đề gì đó",
					description: "Chờ chút rồi thử lại sau nhé",
					action: <ToastAction altText="Try again">Thử lại</ToastAction>,
				})
			}
		}
	}

	const putSiteType = async () => {
		if (siteTypeName === data.siteType.name && typeMode === (data.siteType.attraction == data.siteType.amenity ? "DUAL" : (data.siteType.attraction ? "ATTRACTION" : "AMENITY"))) {
			return;
		}
		const response = await axiosInstance.put(apis.putSiteType.urls.replace(':id', window.location.pathname.split("/").pop()), {
			"siteTypeName": siteTypeName,
			"mode": typeMode
		});
		if (response.status == 204) {
			setUpdateStatus({ ...updateStatus, "siteType": true })
		} else {
			toast({
				variant: "destructive",
				title: "Có vấn đề gì đó",
				description: "Chờ chút rồi thử lại sau nhé",
				action: <ToastAction altText="Try again">Thử lại</ToastAction>,
			})
		}
	}

	const handleRemove = (id) => {
		// Remove the service group of id from the list
		const newServiceGroupsCopy = [...newServiceGroups]
		const index = newServiceGroupsCopy.findIndex(serviceGroup => serviceGroup.serviceGroup.id === id)
		newServiceGroupsCopy.splice(index, 1)
		setNewServiceGroups(newServiceGroupsCopy)
	}

	const handleShowGroups = () => {
		setCommandOpen(true);
	}

	const handleAddServiceGroup = (serviceGroup) => {
		setNewServiceGroups([...newServiceGroups, serviceGroup]);
		setCommandOpen(false);
	};

	const handleSubmit = () => {
		submitChanges();
	}

	// Initial state
	useEffect(() => {
		fetchData();
		fetchServiceGroups();
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
			<Header data={data} handleSubmit={handleSubmit} />
			<div className="">
				<div className="flex h-full">
					{/* Basic informations */}
					<div className="flex w-1/2 p-4 flex-col items-start gap-2">
						<Label>Tên danh mục</Label>
						<Input value={data.siteType.name}  />
					</div>
					<div className="flex w-1/2 p-4 flex-col items-start gap-2">
						<Label>Dạng danh mục</Label>
						<div className="gap-2 flex">
							<Button variant="primary" className={typeMode == "ATTRACTION" ? "text-white bg-blue-c" : "text-white bg-gray-400"} onClick={() => setTypeMode("ATTRACTION")}>Địa điểm du lịch</Button>
							<Button variant="primary" className={typeMode == "AMENITY" ? "text-white bg-blue-c" : "text-white bg-gray-400"} onClick={() => setTypeMode("AMENITY")}>Tiện ích</Button>
							<Button variant="primary" className={typeMode == "DUAL" ? "text-white bg-blue-c" : "text-white bg-gray-400"} onClick={() => setTypeMode("DUAL")}>Chung</Button>
						</div>
					</div>
				</div>
				<div>
					{/* Associated service groups */}
					<Accordion type="single" collapsible>
						{newServiceGroups.map((serviceGroup, index) => (
							<div key={index}>
								<AccordionItem value={serviceGroup.serviceGroup.serviceGroupName}>
									<div className="flex justify-between items-center mx-8">
										<AccordionTrigger className="text-base flex justify-between items-center cursor-pointer gap-2">
											{serviceGroup.serviceGroup.serviceGroupName.toString()}
										</AccordionTrigger>
										<FontAwesomeIcon icon={faTrash} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} onClick={() => handleRemove(serviceGroup.serviceGroup.id)} />
									</div>
									<AccordionContent className="ml-8 mt-1">
										<div className="flex flex-wrap gap-1">
											{serviceGroup.services.map((service, serviceIndex) => (
												<Badge className="text-sm text-left " key={serviceIndex}>{service.serviceName}</Badge>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							</div>
						))}
					</Accordion>
					<Button className="mt-2" onClick={() => { handleShowGroups() }}><FontAwesomeIcon icon={faPlus} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} />Thêm nhóm mới</Button>
					<ServiceGroupCommand items={serviceGroups.filter(sg => !newServiceGroups.some(nsg => nsg.serviceGroup.id === sg.serviceGroup.id))} open={commandOpen} setOpen={setCommandOpen} onAdd={handleAddServiceGroup} />
				</div>
			</div>
		</div>
	);
}

export default SiteTypeDetail;