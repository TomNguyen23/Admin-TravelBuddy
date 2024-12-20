import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Badge } from "../ui/badge";
import dateTimeFormat from "@/assets/js/formatter";

const SiteTypeRow = ({ row }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`${urls.siteTypeDetail}${row["id"]}`);
    }

    return (
        <TableRow className="even:bg-gray-100 odd:bg-white py-3" onClick={handleRedirect}>
            <TableCell className="font-medium text-right py-3">{row["id"]}</TableCell>
            <TableCell className="truncate whitespace-nowrap overflow-hidden text-center py-3">
                <Badge className={(row["amenity"] == row["attraction"] ? "bg-blue-a" : (row["attraction"] ? "bg-blue-b" : "bg-blue-c"))}>
                    {(row["amenity"] == row["attraction"] ? "Chung" : (row["attraction"] ? "Điểm du lịch" : "Tiện ích"))}
                </Badge>
            </TableCell>
            <TableCell className="text-left py-3">{row["name"]}</TableCell>
        </TableRow>
    )
}

const SiteTypeTable = ({ data, lastUpdate }) => {
    return (
        <div className="m-3">
            <Table>
                <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-right w-[10%]">ID</TableHead>
                        <TableHead className="text-center w-[10%]">Loại hình</TableHead>
                        <TableHead className="text-left w-[50%]">Tên danh mục</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <SiteTypeRow key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SiteTypeTable;