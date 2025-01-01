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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PhotoUpload from '@/components/photoUpload/photoUpload';
import dateTimeFormat from '@/assets/js/formatter';
import ResetPasswordPopupInput from '@/components/popupInput/resetPasswordPopUpInput';

const Header = ({ data, handleSubmit, setOpen }) => {
   const { toast } = useToast();

   const disableAdmin = async () => {
      try {
         const response = await axiosInstance.put(apis.disableAdmin.urls.replace(':id', window.location.pathname.split("/").pop()));
         if (response.status === 200) {
            toast({
               title: "Thành công",
               description: "Đã vô hiệu hóa tài khoản quản trị viên",
            });
            // Refresh the page by redirecting to the same page
            window.location.href = window.location.href;
            return;
         }
      } catch (error) {
         toast({
            variant: "destructive",
            title: "Đã có lỗi xảy ra",
            description: "Vui lòng thử lại",
         })
      }
   }

   const enableAdmin = async () => {
      try {
         const response = await axiosInstance.put(apis.enableAdmin.urls.replace(':id', window.location.pathname.split("/").pop()));
         if (response.status === 200) {
            toast({
               title: "Thành công",
               description: "Đã hiệu lực hóa tài khoản quản trị viên",
            });
            window.location.href = window.location.href;
            return;
         }
      } catch (error) {
         toast({
            variant: "destructive",
            title: "Đã có lỗi xảy ra",
            description: "Vui lòng thử lại",
         })
      }
   }

   const changeVisibility = async () => {
      if (data.enabled) {
         disableAdmin();
      } else {
         enableAdmin();
      }
   }
   return (
      <div className='flex'>
         <div className="py-5 text-left">
            {/* left part */}
            <h1 className="font-bold">Chi tiết quản trị viên</h1>
            <div className="mt-2">
               <p className="text-sm text-gray-700">ID quản trị viên: {data.id}</p>
               <p className="text-sm text-gray-700">Được tạo: {dateTimeFormat(data.createdAt)}</p>
            </div>
            {/* // TODO: Implement sort */}
            {/* <p className="text-sm">Sắp xếp theo:</p> */}
         </div>
         <div className='py-5 text-left flex flex-row-reverse mr-0 ml-auto gap-2'>
            <Button className="" onClick={() => {window.location.href = urls.adminList}}>Hủy</Button>
            <Button className="bg-blue-c" onClick={handleSubmit}>Lưu thay đổi</Button>
            <Button className="bg-blue-c" onClick={() => {setOpen(true)}}>Đổi mật khẩu</Button>
            <Button className="bg-blue-c" onClick={() => { changeVisibility() }}>{data.enabled ? "Vô hiệu hóa" : "Hiệu lực hóa"}</Button>
         </div>
      </div>
   )
}

const GroupCommand = ({ items, open, setOpen, onAdd }) => {
   return (
      <CommandDialog open={open} onOpenChange={setOpen}>
         <CommandInput placeholder="Tìm kiếm" />
         <CommandList>
            <CommandEmpty>Không có kết quả</CommandEmpty>
            <CommandGroup heading="Danh mục">
               {items.map((group, index) => (
                  <CommandItem key={index} onSelect={() => onAdd(group)}>
                     <span>{group.name}</span>
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
   const [open, setOpen] = useState(false);

   const [fullName, setFullName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [profilePic, setProfilePic] = useState("");
   const [address, setAddress] = useState("");

   const fetchData = async () => {
      try {
         const response = await axiosInstance.get(apis.getAdminDetail.urls.replace(':id', window.location.pathname.split("/").pop()));
         // If 404
         // TODO: Redirect to 404 page
         setData(response.data)
         setNewGroups(response.data.groups)
         setFullName(response.data.fullName)
         setPhoneNumber(response.data.phoneNumber)
         setProfilePic(response.data.avatar)
         setAddress(response.data.address)
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

   const fetchAllGroups = async () => {
      try {
         const response = await axiosInstance.get(apis.getAllAdminGroups.urls);
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
      const newGroupsCopy = [...newGroups]
      const index = newGroupsCopy.findIndex(group => group.id === id)
      newGroupsCopy.splice(index, 1)
      setNewGroups(newGroupsCopy)
   }

   const handleShowGroups = () => {
      setCommandOpen(true);
   }

   const saveInsertedGroups = async () => {
      const pendingInsert = newGroups.filter(group => !data.groups.some(g => g.id === group.id)).map(group => group.id);
      if (pendingInsert.length === 0) return;
      const response = await axiosInstance.put(apis.adminAssociateGroup.urls, {
         "parentId": data.id,
         "dependencyIds": pendingInsert
      });
      if (response.status === 201) {
         toast({
            title: "Thành công",
            description: "Đã thêm nhóm dịch vụ mới",
         });
         return;
      } else {
         throw new Error("Failed to associate new groups");
      }
   }

   const saveDeletedGroups = async () => {
      const pendingDelete = data.groups.filter(group => !newGroups.some(g => g.id === group.id)).map(group => group.id);
      if (pendingDelete.length === 0) return;
      const response = await axiosInstance.put(apis.adminDetachGroup.urls, {
         "parentId": data.id,
         "dependencyIds": pendingDelete
      });
      if (response.status === 204) {
         toast({
            title: "Thành công",
            description: "Đã xóa nhóm dịch vụ",
         });
         return;
      } else {
         throw new Error("Failed to detach groups");
      }

   }

   const saveNewImage = async () => {
      // Using form data to send the image
      const formData = new FormData();
      formData.append("files", profilePic);
      if (profilePic === null) {
         return {
            id: "",
            url: ""
         }
      }
      const response = await axiosInstance.post(apis.saveImage.urls, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      if (response.status === 200) {
         toast({
            title: "Thành công",
            description: "Đã cập nhật ảnh đại diện",
         });
         return response.data[0];
      } else {
         throw new Error("Failed to save image");
      }
   }

   const saveChanges = async () => {
      const newImage = await saveNewImage();
      const response = await axiosInstance.put(apis.updateAdmin.urls, {
         id: data.id,
         phoneNumber: phoneNumber,
         address: address,
         avatarId: newImage.id,
      });
      if (response.status === 200) {
         toast({
            title: "Thành công",
            description: "Đã cập nhật thông tin",
         });
         return;
      } else {
         throw new Error("Failed to update admin");
      }
   }

   const handleAddServiceGroup = (groups) => {
      setNewGroups([...newGroups, groups]);
      setCommandOpen(false);
   };

   const handleSubmit = () => {
      try {
         saveInsertedGroups();
         saveDeletedGroups();
         saveChanges();
      } catch (error) {
         console.log(error);
         toast({
            variant: "destructive",
            title: "Đã có lỗi xảy ra",
            description: "Vui lòng thử lại",
         })
      }
   }

   // Initial state
   useEffect(() => {
      fetchData();
      fetchAllGroups();
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
         <Header data={data} handleSubmit={handleSubmit} setOpen={setOpen}/>
         <div className="">
            <div className="flex h-full">
               {/* Basic informations */}
               <div className="flex w-1/3 p-4 flex-col items-center gap-2">
                  <PhotoUpload photo={profilePic} setPhoto={setProfilePic} fullName={fullName} />
               </div>
               <div className="flex w-2/3 p-4 flex-col items-start gap-2">
                  <Label>Nickname</Label>
                  <Input value={data.nickname} disabled={true} />
                  <Label>Tên đầy đủ</Label>
                  <Input value={fullName} disabled={true}/>
                  <Label>Số điện thoại</Label>
                  <Input value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                  <Label>Email</Label>
                  <Input value={data.email} disabled={true} />
                  <Label>Giới tính</Label>
                  <Input value={data.gender == "MALE" ? "Nam" : "Nữ"} disabled={true} />
                  <Label>Địa chỉ</Label>
                  <Input value={address} onChange={(e) => { setAddress(e.target.value) }} />
               </div>
            </div>
            <div>
               {/* Associated service groups */}
               <Accordion type="single" collapsible>
                  {newGroups.map((group, index) => (
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
               <GroupCommand items={groups.filter(g => !newGroups.some(ng => ng.id === g.id))} open={commandOpen} setOpen={setCommandOpen} onAdd={handleAddServiceGroup} />
               <ResetPasswordPopupInput adminId={data.id} open={open} setOpen={setOpen} />
            </div>
         </div>
      </div >
   );
}

export default AdminAccountDetail;