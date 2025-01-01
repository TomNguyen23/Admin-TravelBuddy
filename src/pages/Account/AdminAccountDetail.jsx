import { useState, useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import apis from '@/APIs/APIs';
import axiosInstance from '../../services/axios/custom-axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
            <h1 className="font-bold">Chi tiết quản trị viên</h1>
            <div className="mt-2">
               <p className="text-sm text-gray-700">ID quản trị viên: {data.id}</p>
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

const AdminAccountDetail = ({ }) => {
   const [data, setData] = useState('N/A');
   const [loading, setLoading] = useState(true);
   const { toast } = useToast();
   const [newGroups, setNewGroups] = useState([]);
   const [groups, setGroups] = useState([]);
   const [commandOpen, setCommandOpen] = useState(false);
   const [updateStatus, setUpdateStatus] = useState({ "delete": false, "insert": false, "siteType": false });
   const [siteTypeName, setSiteTypeName] = useState("");

   const fetchData = async () => {
      try {
         const response = await axiosInstance.get(apis.getAdminDetail.urls.replace(':id', window.location.pathname.split("/").pop()));
         // If 404
         // TODO: Redirect to 404 page
         setData(response.data)
         setLoading(false)
         setNewGroups(response.data.groupEntities)
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
         setGroups(response.data)
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
      // setNewServiceGroups(newServiceGroupsCopy)
   }

   const handleShowGroups = () => {
      setCommandOpen(true);
   }

   const handleAddServiceGroup = (serviceGroup) => {
      // setNewServiceGroups([...newServiceGroups, serviceGroup]);
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
                  <Label>Nickname</Label>
                  <Input value={siteTypeName} onChange={(e) => { }} />
                  <Label>Tên đầy đủ</Label>
                  <Input value={siteTypeName} onChange={(e) => { }} />
               </div>
               <div className="flex w-1/2 p-4 flex-col items-start gap-2">
                  <Label>Dạng danh mục</Label>
                  <div className="gap-2 flex">
                     <Label>Số điện thoại</Label>
                     <Input value={siteTypeName} onChange={(e) => { }} />
                     <Label>Hình đại diện</Label>
                     <Input value={siteTypeName} onChange={(e) => { }} />
                  </div>
               </div>
            </div>
            <div>
               {/* Associated service groups */}
               <Accordion type="single" collapsible>
                  {newGroups.map((group, index) => (
                     console.log(group),
                     <div key={index}>
                        <AccordionItem value={group.name}>
                           <div className="flex justify-between items-center mx-8">
                              <AccordionTrigger className="text-base flex justify-between items-center cursor-pointer gap-2">
                                 {group.name.toString()}
                              </AccordionTrigger>
                              <FontAwesomeIcon icon={faTrash} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} onClick={() => handleRemove(group.id)} />
                           </div>
                           <AccordionContent className="ml-8 mt-1">
                              <div className="flex flex-wrap gap-1">
                                 {group.permissionEntities.map((permission, permissionIndex) => (
                                    <Badge className="text-sm text-left " key={permissionIndex}>{permission.name}</Badge>
                                 ))}
                              </div>
                           </AccordionContent>
                        </AccordionItem>
                     </div>
                  ))}
               </Accordion>
               <Button className="mt-2" onClick={() => { handleShowGroups() }}><FontAwesomeIcon icon={faPlus} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} />Thêm nhóm mới</Button>
               <ServiceGroupCommand items={groups.filter(g => !newGroups.some(ng => ng.id === g.id))} open={commandOpen} setOpen={setCommandOpen} onAdd={handleAddServiceGroup} />
            </div>
         </div>
      </div>
   );
}

export default AdminAccountDetail;