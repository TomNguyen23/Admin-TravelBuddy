import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dateTimeFormat from "@/assets/js/formatter";

const SiteReportDetailedRow = ({ row }) => {
   return (
      <TableRow className="even:bg-gray-100 odd:bg-white py-3">
         <TableCell className="font-medium text-right py-3">{row["reportId"]}</TableCell>
         <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row["userName"]}</TableCell>
         <TableCell className="text-left py-3">{row["categoryName"]}</TableCell>
         <TableCell className="text-left py-3">{row["description"]}</TableCell>
         <TableCell className="text-right py-3">{dateTimeFormat(row["createdAt"])}</TableCell>
      </TableRow>
   )
}

const SiteReportDetailedTable = ({ data, lastUpdate }) => {
   return (
      <div className="m-3">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className="text-right w-[10%]">ID</TableHead>
                  <TableHead className="text-left w-[20%]">Username</TableHead>
                  <TableHead className="text-left w-[25%]">Loại vi phạm</TableHead>
                  <TableHead className="text-left w-[25%]">Mô tả</TableHead>
                  <TableHead className="text-right w-[20%]">Thời gian</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((row, index) => (
                  <SiteReportDetailedRow key={index} row={row} />
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default SiteReportDetailedTable;