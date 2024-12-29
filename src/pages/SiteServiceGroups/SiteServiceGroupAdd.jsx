import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import apis from '@/APIs/APIs';
import urls from '@/routes/urls';
import axiosInstance from '../../services/axios/custom-axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandDialog } from "@/components/ui/command"
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

const Header = ({ handleSubmit }) => {
	return (
		<div className='flex'>
			<div className="py-5 text-left">
				<h1 className="font-bold">Thêm mới nhóm dịch vụ</h1>
				<div className="mt-2">
				</div>
			</div>
			<div className='py-5 text-left flex flex-row-reverse mr-0 ml-auto gap-2'>
				<Button className="" onClick={() => {window.location.href = urls.allSiteServiceGroups;}}>Hủy</Button>
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
					{items.map((service, index) => (
						<CommandItem key={index} onSelect={() => onAdd(service)}>
							<span>#{service.id} - {service.serviceName}</span>
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

const SiteServiceGroupAdd = () => {
	const { toast } = useToast();
	const [newServices, setNewServices] = useState([]);
	const [services, setServices] = useState([]);
	const [commandOpen, setCommandOpen] = useState(false);
	const [groupServiceName, setGroupServiceName] = useState("");

	const fetchAllServices = async () => {
		try {
			const response = await axiosInstance.get(apis.getAllServices.urls);
			setServices(response.data.data);
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
			await submitNewGroup();
			toast({
				title: "Thành công",
				description: "Dữ liệu đã được cập nhật",
			});
			// Redirect to the list page after 2s
			setTimeout(() => {
				window.location.href = urls.allSiteServiceGroups;
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

	const submitNewGroup = async () => {
		const data = {
			groupName: groupServiceName.trim(),
			siteServiceIds: newServices.map(s => s.id)
		}
		try {
			await axiosInstance.post(apis.newServiceGroup.urls, data);
		} catch (error) {
			throw new Error("Có vấn đề khi thêm nhóm dịch vụ mới");
		}
	}

	const handleShowServices = () => {
		setCommandOpen(true);
	}

	const handleAddServiceGroup = (serviceGroup) => {
		setNewServices([...newServices, serviceGroup]);
		setCommandOpen(false);
	};

	const handleSubmit = () => {
		if (newServices.length === 0) {
			toast({
				variant: "destructive",
				title: "Chưa chọn dịch vụ",
				description: "Vui lòng chọn ít nhất một dịch vụ"
			});
			return;
		}
		if (groupServiceName.trim() === "") {
			toast({
				variant: "destructive",
				title: "Tên nhóm dịch vụ không được để trống",
				description: "Vui lòng nhập tên nhóm dịch vụ"
			});
			return;
		}
		submitChanges();
	}

	const serviceRemove = (index) => {
		const newServicesCopy = [...newServices];
		newServicesCopy.splice(index, 1);
		setNewServices(newServicesCopy);
	}

	// Initial state
	useEffect(() => {
		fetchAllServices();
	}, [])

	return (
		<div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 mx-12 my-7 px-5 pb-10 min-h-[75%]">
			<Header handleSubmit={handleSubmit} />
			<div className="">
				<div className="flex h-full">
					{/* Basic informations */}
					<div className="flex w-full p-4 flex-col items-start gap-2">
						<Label>Tên nhóm dịch vụ</Label>
						<Input value={groupServiceName} onChange={(e) => { setGroupServiceName(e.target.value) }} />
					</div>
				</div>
				<div>
					<Separator text="Dịch vụ nằm trong nhóm này" />
					<div>
						<div className="flex flex-wrap gap-1 justify-center mt-6">
							{
								newServices.map((service, index) => (
									<Badge className="text-sm text-left" key={index}>#{service.id}. {service.serviceName}<FontAwesomeIcon icon={faXmark} size='lg' className='pl-2 cursor-pointer' style={{ width: '1rem' }} onClick={() => (serviceRemove(index))} /></Badge>
								))
							}
						</div>
					</div>
					<Button className="mt-2" onClick={() => { handleShowServices() }}><FontAwesomeIcon icon={faPlus} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} />Thêm dịch vụ mới</Button>
					<ServiceGroupCommand items={services.filter(s => !newServices.some(ns => ns.id === s.id))} open={commandOpen} setOpen={setCommandOpen} onAdd={handleAddServiceGroup} />
				</div>
			</div>
		</div>
	);
}

export default SiteServiceGroupAdd;