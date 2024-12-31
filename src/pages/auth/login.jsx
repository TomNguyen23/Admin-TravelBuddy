import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { useDispatch } from "react-redux"
import { setCredentials } from "@/redux/reducer/auth.reducer"
import { setPermissions } from "@/redux/reducer/permission.reducer"
import { useLoginMutation } from "@/services/rtk-query/featureApi/authApiSlice"

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { toast } = useToast()

   const getPermissions = (token) => {
      if (token) {
         try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const permissions = decodedToken.scp || [];
            return permissions;
         } catch (error) {
            console.log(error);
         }
      }
   }

   const navigateTo = useNavigate();
   const dispatch = useDispatch();

   const [login, { isLoading }] = useLoginMutation();
   const handleLogin = async () => {
      if (username === '' || password === '') {
         toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You must enter email and password.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
         })
         return;
      }

      const data = {
         email: username,
         password: password
      }

      await login(data).unwrap()
         .then((res) => {
            dispatch(setCredentials(res));
            dispatch(setPermissions(getPermissions(res.accessToken)));
            navigateTo('/admin/dashboard');
         })
         .catch((error) => {
            toast({
               variant: "destructive",
               title: "Uh oh! Something went wrong.",
               description: error.message,
               action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
         })
   }

   return (
      <div className="flex justify-center items-center min-h-screen">
         <Card className="w-[350px] bg-[#e2e8f0]">
            <CardHeader>
               <CardTitle className='text-center'>Đăng nhập</CardTitle>
            </CardHeader>
            <CardContent>
               <form>
                  <div className="grid w-full items-center gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Email</Label>
                        <Input id="name" placeholder="Nhập email của bạn..."
                           onChange={(e) => setUsername(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="pw">Mật khẩu</Label>
                        <Input id="pw" placeholder="Nhập mật khẩu của bạn..."
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                  </div>
               </form>
            </CardContent>
            <CardFooter className="flex justify-start">
               {
                  isLoading ? <Button disabled>
                     Đăng nhập
                     <span className="loading loading-dots loading-md ml-2"></span>
                  </Button>
                     : <Button onClick={handleLogin}>Đăng nhập</Button>
               }

            </CardFooter>
         </Card>
      </div>
   );
}

export default Login;