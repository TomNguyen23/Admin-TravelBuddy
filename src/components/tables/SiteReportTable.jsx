import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import { useNavigate } from "react-router-dom";
import dateTimeFormat from "@/assets/js/formatter";

const SiteReportRow = ({ row }) => {
   const navigate = useNavigate();

   const handleRedirect = () => {
      navigate(`${urls.reportSiteDetail}${row.siteId}`);
   }

   return (
      <TableRow className="even:bg-gray-100 odd:bg-white py-3" onClick={handleRedirect}>
         <TableCell className="font-medium text-right py-3">{row["siteId"]}</TableCell>
         <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row["siteName"]}</TableCell>
         <TableCell className="text-right py-3">{row["reportCount"]}</TableCell>
      </TableRow>
   )
}

const SiteReportTable = ({ data, lastUpdate }) => {
   return (
      <div className="m-3">
         <Table>
            <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead className="text-right w-[15%]">ID Địa điểm</TableHead>
                  <TableHead className="text-left w-[50%]">Tên địa điểm</TableHead>
                  <TableHead className="text-right w-[15%]">Số lượng báo cáo</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((row, index) => (
                  <SiteReportRow key={index} row={row} />
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default SiteReportTable;