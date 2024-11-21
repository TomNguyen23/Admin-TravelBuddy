// import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "@/redux/reducer/auth.reducer";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const token = useSelector(state => state.auth.token);

    const logoutHandler = () => {
        dispatch(logout());
        navigateTo('/');
    }

    return ( 
        <nav className="flex flex-wrap justify-between items-start px-12 py-7 bg-[#0284c7] h-60">
            <h1 className="uppercase font-semibold text-sm text-white">dashboard</h1>

            <div className="flex">
                {/* <Input type="text" placeholder="Tìm biển số xe..." onChange={e => onSearchChange(e.target.value)} /> */}
                
                {token && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-5">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Admin</DropdownMenuLabel>
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logoutHandler}>Đăng xuất</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

            </div>
        </nav>
     );
}
 
export default Navbar;