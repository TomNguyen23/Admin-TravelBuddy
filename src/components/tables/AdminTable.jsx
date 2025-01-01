import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import { useNavigate } from "react-router-dom";
import dateTimeFormat from "@/assets/js/formatter";

const AdminRow = ({ row }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`${urls.siteTypeDetail}${row["id"]}`);
    }

    return (
        <TableRow className="even:bg-gray-100 odd:bg-white py-3" onClick={handleRedirect}>
            <TableCell className="font-medium text-right py-3">{row.id}</TableCell>
            <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row.email}</TableCell>
            <TableCell className="truncate whitespace-nowrap overflow-hidden text-left py-3">{row.nickname}</TableCell>
            <TableCell className="text-left py-3">{row.fullName}</TableCell>
            <TableCell className="text-left py-3">{row.phoneNumber}</TableCell>
            <TableCell className="text-right py-3">{dateTimeFormat(row.createdAt)}</TableCell>
        </TableRow>
    )
}

const AdminTable = ({ data, lastUpdate }) => {
    return (
        <div className="m-3">
            <Table>
                <TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-right w-[7%]">ID</TableHead>
                        <TableHead className="text-left w-[20%]">Email</TableHead>
                        <TableHead className="text-left w-[19%]">Nickname</TableHead>
                        <TableHead className="text-left w-[19%]">Tên đầy đủ</TableHead>
                        <TableHead className="text-left w-[17%]">Số điện thoại</TableHead>
                        <TableHead className="text-right w-[18%]">Lập lúc</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <AdminRow key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminTable;