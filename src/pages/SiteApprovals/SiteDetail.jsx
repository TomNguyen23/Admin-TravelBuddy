import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const SiteDetail = () => {
    const sitePassingInfos = useSelector((state) => state.siteVerification);
    const [data, setData] = useState({});

    useState(() => {
        if (!sitePassingInfos.approvalID) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You must enter email and password.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return;
        }
    }, []);

    return (
        <div className="bg-white border shadow-lg rounded-md text-2xl text-center absolute right-0 top-28 left-0 h-3/4 mx-12 my-7">
            hello
        </div>
     );
}

export default SiteDetail;