import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import { useNavigate } from "react-router-dom";
import dateTimeFormat from "@/assets/js/formatter";
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useUnbanReportSiteMutation } from "@/services/rtk-query/featureApi/reportApiSlice";

const BannedSiteRow = ({ row }) => {
   const { toast } = useToast();
   const navigate = useNavigate();

   const handleRedirect = () => {
      navigate(`${urls.reportSiteDetail}${row.siteId}`);
   }

   const [UnbanSiteReport] = useUnbanReportSiteMutation();
   const handleUnbanSiteReport = (siteID) => {
      UnbanSiteReport(siteID)
      .unwrap()
      .then(() => {
         toast({
            title: "Thành công",
            description: "Đã cập nhật ảnh đại diện",
         });
      })
      .catch((error) => {
         toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
      })
   }

   return (
      <TableRow className="even:bg-gray-100 odd:bg-white py-3" onClick={handleRedirect}>
         <TableCell className="font-medium text-right py-3">{row["siteId"]}</TableCell>
         <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row["siteName"]}</TableCell>
         <TableCell className="text-right py-3">{row["reportCount"]}</TableCell>
         <TableCell className="text-right py-3"><Button onClick={() => handleUnbanSiteReport(row.siteId)}>Hủy hạn chế</Button></TableCell>
      </TableRow>
   )
}

const BannedSiteTable = ({ data, lastUpdate }) => {
   return (
      <div className="m-3">
         <Table>
            <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead className="text-right w-[15%]">ID Địa điểm</TableHead>
                  <TableHead className="text-left w-[55%]">Tên địa điểm</TableHead>
                  <TableHead className="text-right w-[15%]">Số lượng báo cáo</TableHead>
                  <TableHead className="text-center w-[15%]">Hủy hạn chế</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((row, index) => (
                  <BannedSiteRow key={index} row={row} />
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default BannedSiteTable;