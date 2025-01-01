import { useState, useEffect } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axiosInstance from '../../services/axios/custom-axios';
import apis from '@/APIs/APIs';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPasswordPopupInput = ({ adminId, open, setOpen }) => {
   const [password, setPassword] = useState("");
   const { toast } = useToast();

   const submit = async () => {
      try {
         const response = await axiosInstance.put(apis.resetAdminPassword.urls, {
            adminId: adminId,
            password: password
         });
         if (response.status === 200) {
            toast({
               title: "Thành công",
               description: "Đã đặt lại mật khẩu thành công",
            });
            setOpen(false);
            return;
         }
      } catch (error) {
         console.log(error);
         toast({
            variant: "destructive",
            title: "Đã có lỗi xảy ra",
            description: "Vui lòng thử lại",
         })
      }
   }

   const [showPassword, setShowPassword] = useState(false);
   const [isPasswordValid, setIsPasswordValid] = useState(false);

   useEffect(() => {
      setIsPasswordValid(password.length >= 8);
   }, [password]);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>Đặt lại mật khẩu</DialogTitle>
               <DialogDescription>Nhập mật khẩu mới vào bên dưới</DialogDescription>
               <div className="!-mb-2">
                  <span id='rst-pswd-err' className={`text-sm text-red-800 ${isPasswordValid ? 'hidden' : ''}`}>Mật khẩu phải có ít nhất 8 ký tự</span><br />
               </div>
            </DialogHeader>
            <div className="flex items-center space-x-2">
               <div className="grid flex-1 gap-2">
                  <Label htmlFor="password" className="sr-only">Mật khẩu</Label>
                  <div className="relative">
                     <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" maxLength={40} />
                     <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} /> : <FontAwesomeIcon icon={faEye} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} />}
                     </button>
                  </div>
               </div>
            </div>
            <DialogFooter className="sm:justify-start">
               <Button type="submit" size="sm" className={"px-3"} onClick={submit} disabled={!isPasswordValid}>
                  Đặt lại mật khẩu
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export default ResetPasswordPopupInput;