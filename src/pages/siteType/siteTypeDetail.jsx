import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import apis from '@/APIs/APIs';
import urls from '@/routes/urls';
import axiosInstance from '../../services/axios/custom-axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, CommandDialog } from "@/components/ui/command"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

const Separator = ({ text }) => {
	return (
		<div className="separator -mt-3 mb-3">
			<div className="text-lg font-bold p-2 translate-y-6"><span className="bg-white px-3">{text}</span></div>
			<hr />
		</div>
	)
};

const AspectDialog = ({ open, setOpen, onAdd }) => {
	const [newAspect, setNewAspect] = useState("");

	const handleAdd = async () => {
		await onAdd(newAspect);
		if (document.getElementById('new-aspect-err').classList.contains('hidden')) {
			setOpen(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="mt-2" onClick={() => setOpen(true)}><FontAwesomeIcon icon={faPlus} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} />Thêm khía cạnh</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Khía cạnh mới</DialogTitle>
					<DialogDescription>Nhập khía cạnh mới vào trường bên dưới.</DialogDescription>
					<div className="!-mb-2">
						<span id='new-aspect-err' className="text-sm text-red-800 hidden">Khía cạnh này đã tồn tại với danh mục này</span>
					</div>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="aspectName" className="sr-only">aspectName</Label>
						<Input id="aspectName" value={newAspect} onChange={(e) => setNewAspect(e.target.value)} placeholder="Tên khía cạnh" maxLength={40} />
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button type="submit" size="sm" className="px-3" onClick={() => { handleAdd(newAspect) }}>Thêm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const SiteTypeDetail = () => {
	const [data, setData] = useState('N/A');
	const [loading, setLoading] = useState(true);
	const { toast } = useToast();
	const [typeMode, setTypeMode] = useState(null);
	const [newServiceGroups, setNewServiceGroups] = useState([]);
	const [serviceGroups, setServiceGroups] = useState([]);
	const [commandOpen, setCommandOpen] = useState(false);
	const [updateStatus, setUpdateStatus] = useState({ "delete": false, "insert": false, "siteType": false, "aspectDel": false, "aspectAdd": false });
	const [siteTypeName, setSiteTypeName] = useState("");
	const [aspects, setAspects] = useState([]);
	const [aspectOpen, setAspectOpen] = useState(false);
	const [newAspects, setNewAspects] = useState([]);

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

	const fetchAspectsByType = async () => {
		try {
			const response = await axiosInstance.get(apis.aspectsByType.urls.replace(':id', window.location.pathname.split("/").pop()));
			let aspects = [];
			response.data.map(aspect => {
				aspects.push({ "id": aspect.aspectId, "aspectName": aspect.aspectName })
			})
			setAspects(aspects);
			setNewAspects(aspects);
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
			await putInsert();
			await putDelete();
			await putSiteType();
			await putAspects();
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

	const deleteAspects = async (pendingDelete) => {
		try {
			const response = await axiosInstance.delete(apis.deleteAspects.urls, {
				data: pendingDelete
			});
			if (response.status === 200) {
				setUpdateStatus({ ...updateStatus, "aspectDel": true });
			} else {
				toast({
					variant: "destructive",
					title: "Có vấn đề gì đó",
					description: "Chờ chút rồi thử lại sau nhé",
					action: <ToastAction altText="Try again">Thử lại</ToastAction>,
				});
			}
		} catch (error) {
			console.log(error);
			toast({
				variant: "destructive",
				title: "Có vấn đề gì đó",
				description: "Chờ chút rồi thử lại sau nhé",
				action: <ToastAction altText="Try again">Thử lại</ToastAction>,
			});
		}
	};

	const addAspects = async (pendingAdd) => {
		const response = await axiosInstance.post(apis.addAspects.urls, {
			"typeId": window.location.pathname.split("/").pop(),
			"aspectNames": pendingAdd
		});
		if (response.status == 201) {
			setUpdateStatus({ ...updateStatus, "aspectAdd": true })
		} else {
			toast({
				variant: "destructive",
				title: "Có vấn đề gì đó",
				description: "Chờ chút rồi thử lại sau nhé",
				action: <ToastAction altText="Try again">Thử lại</ToastAction>,
			})
		}
	}

	const putAspects = async () => {
		// Get the name of new aspects (-1)
		const pendingAdd = newAspects.filter(aspect => aspect.id === -1).map(aspect => aspect.aspectName)
		// Get the id of pendingDelete, presents in the old list but not in the new list
		let pendingDeleteIds = []
		for (const aspect of aspects) {
			if (!newAspects.some(newAspect => newAspect.id === aspect.id)) {
				pendingDeleteIds.push(aspect.id)
			}
		}
		console.log("R: ", aspects);
		console.log("N: ", newAspects);
		console.log("D: ", pendingDeleteIds);
		console.log("A: ", pendingAdd);
		await addAspects(pendingAdd);
		await deleteAspects(pendingDeleteIds);
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

	const handleAddAspect = async (asp) => {
		// Check for existed aspect in the newAspects by string comparison, trimed, and case-insensitive
		if (newAspects.some(aspect => aspect.aspectName.trim().toLowerCase() === asp.trim().toLowerCase())) {
			document.getElementById('new-aspect-err').classList.remove('hidden');
			return;
		}
		// Hide the error message if it is shown
		document.getElementById('new-aspect-err').classList.add('hidden');
		// Find the id of the aspect by name in the aspects list, else set -1
		const aspectId = aspects.find(aspect => aspect.aspectName.trim().toLowerCase() === asp.trim().toLowerCase())?.id ?? -1;
		if (aspectId === -1) {
			// If the aspect is not in the list, add it to the newAspects
			setNewAspects([...newAspects, { "id": -1, "aspectName": asp }]);
			return;
		}
		setNewAspects([...newAspects, { "id": aspectId, "aspectName": asp }]);
		return;
	}

	const aspectRemove = (index) => {
		const newAspectsCopy = [...newAspects]
		newAspectsCopy.splice(index, 1)
		setNewAspects(newAspectsCopy)
	}

	// Initial state
	useEffect(() => {
		fetchData();
		fetchServiceGroups();
		fetchAspectsByType();
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
						<Input value={siteTypeName} onChange={(e) => { setSiteTypeName(e.target.value) }} />
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
					<Separator text="Nhóm dịch vụ" />
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
				<div>
					<Separator text="Khía cạnh" />
					<div className="flex flex-wrap gap-1 justify-center mt-6">
						{
							newAspects.map((aspect, index) => (
								<Badge className="text-sm text-left " key={index}>{aspect.aspectName}<FontAwesomeIcon icon={faXmark} size='lg' className='pl-2 cursor-pointer' style={{ width: '1rem' }} onClick={() => (aspectRemove(index))} /></Badge>
							))
						}
					</div>
					<AspectDialog open={aspectOpen} setOpen={setAspectOpen} onAdd={handleAddAspect} />
				</div>
			</div>
		</div>
	);
}

export default SiteTypeDetail;