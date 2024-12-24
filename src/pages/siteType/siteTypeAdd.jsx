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

const Header = ({ handleSubmit }) => {
   return (
      <div className='flex'>
         <div className="py-5 text-left">
            {/* left part */}
            <h1 className="font-bold">Thêm danh mục mới</h1>
            {/* // TODO: Implement sort */}
            {/* <p className="text-sm">Sắp xếp theo:</p> */}
         </div>
         <div className='py-5 text-left flex flex-row-reverse mr-0 ml-auto gap-2'>
            <Button className="">Hủy</Button>
            <Button className="bg-blue-c" onClick={handleSubmit}>Lưu</Button>
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

const SiteTypeAdd = ({ }) => {
   const { toast } = useToast();
   const [loading, setLoading] = useState(false);
   const [siteTypeName, setSiteTypeName] = useState("");
   const [typeMode, setTypeMode] = useState(null);
   const [serviceGroups, setServiceGroups] = useState([]);
   const [newServiceGroups, setNewServiceGroups] = useState([]);
   const [commandOpen, setCommandOpen] = useState(false);
   // const [newAspects,

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

   const postNewType = async () => {
      if (siteTypeName == "") {
         toast({
            variant: "destructive",
            title: "Tên danh mục không được để trống",
            description: "Vui lòng nhập tên danh mục",
         })
         return;
      }
      if (typeMode == null) {
         toast({
            variant: "destructive",
            title: "Dạng danh mục không được để trống",
            description: "Vui lòng chọn dạng danh mục",
         })
         return;
      }
      try {
         const response = await axiosInstance.post(apis.newSiteType.urls, {
            siteTypeName: siteTypeName,
            mode: typeMode,
            serviceGroups: newServiceGroups.map(serviceGroup => serviceGroup.serviceGroup.id)
         });
         if (response.status == 201) {
            toast({
               variant: "success",
               title: "Thêm thành công",
               description: "Danh mục mới đã được thêm, sẽ chuyển hướng sau 2 giây...",
            })
            setTimeout(() => {
               window.location.href = urls.allSiteTypes;
            }, 2000);
         }
         if (response.status == 409) {
            toast({
               variant: "destructive",
               title: "Danh mục đã tồn tại",
               description: "Vui lòng kiểm tra danh mục cũ hoặc chọn một cái tên khác",
            })
         }
         if (response.status == 400) {
            toast({
               variant: "destructive",
               title: "Dữ liệu không hợp lệ",
               description: "Vui lòng kiểm tra lại"
            })
         }
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

   useEffect(() => {
      fetchServiceGroups();
   }, []);

   if (loading) {
      return (
         <div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 mx-12 my-7 p-2 pb-10 min-h-[75%]">
            <span className="loading loading-dots loading-md mt-28 ml-2"></span>
         </div>
      ); // Render a loading indicator while data is being fetched
   }
   return (
      <div className="bg-white border shadow-lg rounded-md text-2xl text-center relative right-0 top-[-8rem] left-0 mx-12 my-7 px-5 pb-10 min-h-[75%]">
         <Header handleSubmit={postNewType} />
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

export default SiteTypeAdd;