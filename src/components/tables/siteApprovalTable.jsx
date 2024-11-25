import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SpanedLabel from "../others/spanedLabel";
import dateTimeFormat from "@/assets/js/formatter";

const SiteApprovalRow = ({ row }) => {
    return (
        <TableRow className="even:bg-gray-100 odd:bg-white">
            <TableCell className="font-medium text-right">{row["id"]}</TableCell>
            <TableCell className="text-right">{row["siteVersionId"]}</TableCell>
            <TableCell className="truncate whitespace-nowrap overflow-hidden text-left">{row["siteName"]}</TableCell>
            <TableCell className="text-right">{dateTimeFormat(row["createdAt"])}</TableCell>
            <TableCell className="text-center">
                {row["siteStatus"] === "NEW" ?
                    <SpanedLabel value={"Tạo mới"} bgColor={"bg-pltA-green"} textColor={"text-white"} /> :
                    <SpanedLabel value={"Cập nhật"} bgColor={"bg-pltA-yellow"} textColor={"text-gray"} />}
            </TableCell>
        </TableRow>
    )
}

const SiteApprovalTable = ({ data, lastUpdate }) => {
    return (
        <div className="m-3">
            <Table>
                <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-right w-[8%]">ID</TableHead>
                        <TableHead className="text-right w-[8%]">ID phiên bản</TableHead>
                        <TableHead>Tên địa điểm</TableHead>
                        <TableHead className="text-right w-[19%]">Được tạo lúc</TableHead>
                        <TableHead className="text-center w-[11%]">Trạng thái địa điểm</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <SiteApprovalRow key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SiteApprovalTable;