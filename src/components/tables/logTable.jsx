import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import urls from "@/routes/urls";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import dateTimeFormat from "@/assets/js/formatter";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const DetailedPopUp = ({ row, open, setOpen }) => {
	const badgeColor = !row ? "" : (row.level == "BUG" ? "bg-red-600" : row.level == "INFO" ? "bg-blue-600" : "bg-yellow-600");

	useEffect(() => {
		console.log(row);
	}, [row]);

	if (!row) {
		return null;
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-md">

				<DialogTitle>Chi tiết log</DialogTitle>
				<DialogDescription><b>ID Log: </b>{row.id}<Badge className={badgeColor + " ml-2"}>{row.level}</Badge></DialogDescription>
				<DialogDescription><b>Thời điểm: </b>{dateTimeFormat(row.timestamp)}</DialogDescription>
				<DialogDescription><b>Nội dung: </b>{row.content}</DialogDescription>
			</DialogContent>
		</Dialog>
	);
};

const LogRow = ({ row, setOpen, setCurrentSelected }) => {
	const handleOpen = () => {
		setCurrentSelected(row);
		setOpen(true);
	}

	const badgeColor = row.level == "BUG" ? "bg-red-600" : row.level == "INFO" ? "bg-blue-600" : "bg-yellow-600";

	return (
		<TableRow className="even:bg-gray-100 odd:bg-white py-3 cursor-pointer" onClick={handleOpen}>
			<TableCell className="font text-right py-3">{row.id}</TableCell>
			<TableCell className="font text-right py-3">{dateTimeFormat(row.timestamp)}</TableCell>
			<TableCell className="text-center py-3 font-mono">
				<Badge className={badgeColor}>{row["level"]}</Badge>
			</TableCell>
			<TableCell className="text-left py-3 truncate whitespace-nowrap overflow-hidden">{row["content"]}</TableCell>
		</TableRow>
	)
}

const LogTable = ({ data, lastUpdate }) => {
	const [open, setOpen] = useState(true);
	const [currentSeleted, setCurrentSelected] = useState(null);

	return (
		<div className="m-3">
			<Table>
				<TableCaption>Cập nhật lần cuối: {dateTimeFormat(lastUpdate)}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="text-right w-[8%]">ID</TableHead>
						<TableHead className="text-center w-[14%]">Thời gian</TableHead>
						<TableHead className="text-center w-[8%]">Level</TableHead>
						<TableHead className="text-left w-[70%]">Nội dung</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, index) => (
						<LogRow key={index} row={row} setOpen={setOpen} setCurrentSelected={setCurrentSelected} />
					))}
				</TableBody>
				<DetailedPopUp row={currentSeleted} open={open} setOpen={setOpen} />
			</Table>
		</div>
	)
}

export default LogTable;