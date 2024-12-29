import { useState, useEffect } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axiosInstance from '../../services/axios/custom-axios';
import apis from '@/APIs/APIs';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const ServicePopUpInput = ({ service, referencing, open, setOpen, setSubmit }) => {
   const [serviceName, setServiceName] = useState(service == null ? "" : service.serviceName);
   const { toast } = useToast();

   const postNewService = async () => {
      try {
         const response = await axiosInstance.post(apis.newService.urls, {
            serviceName: serviceName
         });
         if (response.status === 200) {
            toast({
               title: "Thành công",
               description: "Đã thêm dịch vụ mới thành công",
            });
            return;
         }
         if (response.status === 409) {
            toast({
               variant: "destructive",
               title: "Dịch vụ với tên này đã tồn tại",
               description: "Hãy thử tên khác",
            })
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

   const putService = async () => {
      try {
         const response = await axiosInstance.put(apis.putService.urls.replace(':id', service.id), {
            serviceName: serviceName
         });
         if (response.status === 204) {
            toast({
               title: "Thành công",
               description: "Đã cập nhật dịch vụ thành công",
            });
            return;
         }
         if (response.status === 409) {
            toast({
               variant: "destructive",
               title: "Dịch vụ với tên này đã tồn tại",
               description: "Hãy thử tên khác",
            })
            return;
         }
         if (response.status === 404) {
            toast({
               variant: "destructive",
               title: "Dịch vụ không tồn tại",
               description: "Vui lòng thử lại"
            })
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

   const submit = async () => {
      if (service == null) {
         await postNewService();
      } else {
         await putService();
      }
      setOpen(false);
      setSubmit(true);
   }

   const handleAdd = async () => {
      if (serviceName.trim() == "") {
         document.getElementById('new-service-blank').classList.remove('hidden');
         return;
      }
      // Check if service name already exists in referencing case insensitive
      if (referencing.some((item) => item.serviceName.toLowerCase() === serviceName.toLowerCase())) {
         document.getElementById('new-service-err').classList.remove('hidden');
         return;
      }

      // Success block
      document.getElementById('new-service-err').classList.add('hidden');
      await submit();
      setOpen(false);
   }

   useEffect(() => {
      setServiceName(service == null ? "" : service.serviceName);
      console.log(service);
   }, [open]);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>{service == null ? "Thêm dịch vụ mới" : "Chỉnh sửa dịch vụ"}</DialogTitle>
               <DialogDescription>{service != null ? "ID dịch vụ: " + service.id : "Nhập tên dịch vụ mới vào bên dưới"}</DialogDescription>
               <div className="!-mb-2">
                  <span id='new-service-err' className="text-sm text-red-800 hidden">Dịch vụ với tên này đã tồn tại</span><br />
                  <span id='new-service-blank' className="text-sm text-red-800 hidden">Tên dịch vụ không được để trống</span>
               </div>
            </DialogHeader>
            <div className="flex items-center space-x-2">
               <div className="grid flex-1 gap-2">
                  <Label htmlFor="aspectName" className="sr-only">aspectName</Label>
                  <Input id="aspectName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Tên khía cạnh" maxLength={40} />
               </div>
            </div>
            <DialogFooter className="sm:justify-start">
               <Button type="submit" size="sm" className={"px-3"} onClick={() => { handleAdd() }} disabled={service ? service.serviceName.toLowerCase() === serviceName.trim().toLowerCase() : !serviceName.trim()}
               >
                  {service == null ? "Thêm mới" : "Lưu"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export default ServicePopUpInput;