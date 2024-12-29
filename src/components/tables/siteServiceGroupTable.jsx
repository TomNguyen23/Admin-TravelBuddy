import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import { useNavigate } from "react-router-dom";
import dateTimeFormat from "@/assets/js/formatter";

const ServiceGroupRow = ({ row }) => {
   const navigate = useNavigate();

   const handleRedirect = () => {
      navigate(`${urls.siteServiceGroupDetail}${row["serviceGroup"]["id"]}`);
   }

   return (
      <TableRow className="even:bg-gray-100 odd:bg-white py-3" onClick={handleRedirect}>
         <TableCell className="font-medium text-right py-3">{row["serviceGroup"]["id"]}</TableCell>
         <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row["serviceGroup"]["serviceGroupName"]}</TableCell>
         <TableCell className="text-right py-3">{row["services"].length}</TableCell>
      </TableRow>
   )
}

const SiteServiceGroupTable = ({ data, lastUpdate }) => {
   return (
      <div className="m-3">
         <Table>
            <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead className="text-right w-[10%]">ID</TableHead>
                  <TableHead className="text-left w-[50%]">Tên nhóm</TableHead>
                  <TableHead className="text-right w-[20%]">Số lượng dịch vụ</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((row, index) => (
                  <ServiceGroupRow key={index} row={row} />
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default SiteServiceGroupTable;