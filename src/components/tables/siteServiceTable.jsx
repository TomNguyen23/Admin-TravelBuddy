import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import dateTimeFormat from "@/assets/js/formatter";

const ServiceGroupRow = ({ row, onClick, setDialogOpen }) => {
   const handleOnClick = () => {
      onClick(row);
      setDialogOpen(true);
   }

   return (
      <TableRow className="even:bg-gray-100 odd:bg-white py-3 cursor-pointer" onClick={handleOnClick}>
         <TableCell className="font-medium text-right py-3">{row["id"]}</TableCell>
         <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row["serviceName"]}</TableCell>
      </TableRow>
   )
}

const SiteServiceTable = ({ data, lastUpdate, setCurrentSelected, setDialogOpen }) => {
   return (
      <div className="m-3">
         <Table>
            <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead className="text-right w-[15%]">ID</TableHead>
                  <TableHead className="text-left w-[85%]">Tên nhóm</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((row, index) => (
                  <ServiceGroupRow key={index} row={row} onClick={setCurrentSelected} setDialogOpen={setDialogOpen}/>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default SiteServiceTable;