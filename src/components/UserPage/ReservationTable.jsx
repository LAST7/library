import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ReservationTable = ({ records }) => {
    // TODO: maybe a scroll area to avoid the area from becoming too long
    // when there are too many records

    if (records.length === 0) {
        return (
            <div className="py-16 h-full justify-center">
                <div className="text-2xl text-center text-muted-foreground">
                    无预约记录
                </div>
            </div>
        );
    } else {
        return (
            <Table>
                <TableCaption>图书馆座位预约记录</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">预约</TableHead>
                        <TableHead>楼层 & 座位</TableHead>
                        <TableHead>预约时间</TableHead>
                        <TableHead>使用时间</TableHead>
                        <TableHead className="text-right">状态</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.map((r, index) => (
                        <TableRow key={r.reservation_id}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{r.floorAndSeat}</TableCell>
                            <TableCell>{r.reservationTime}</TableCell>
                            <TableCell>
                                <p>日期：{r.date}</p>
                                <p>
                                    时间：
                                    <strong>
                                        {r.iTime} ~ {r.oTime}
                                    </strong>
                                </p>
                            </TableCell>
                            <TableCell
                                className={cn("text-right font-bold", {
                                    "text-gray-600": r.status === "已过期",
                                    "text-sky-600": r.status === "进行中",
                                    "text-red-600": r.status === "取消",
                                })}
                            >
                                {r.status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="text-gray-400">
                            总数
                        </TableCell>
                        <TableCell className="text-right text-sky-400 text-lg font-bold">
                            {records.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
};

export default ReservationTable;
