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

const PenaltyTable = ({ records }) => {
    // TODO: maybe a scroll area to avoid the list become to long
    // when there are too many records

    if (records.length === 0) {
        return (
            <div className="py-16 h-full justify-center">
                <div className="text-2xl text-center text-muted-foreground">
                    无违规记录
                </div>
            </div>
        );
    } else {
        return (
            <Table>
                <TableCaption>当前用户违规记录</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">惩罚</TableHead>
                        <TableHead>原因</TableHead>
                        <TableHead>管理员</TableHead>
                        <TableHead className="text-right">解除时间</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.map((r, index) => (
                        <TableRow key={r.penalty_id}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{r.reason}</TableCell>
                            <TableCell>{r.adminName}</TableCell>
                            <TableCell className="text-right font-bold">
                                {r.util}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="text-gray-400">
                            总数
                        </TableCell>
                        <TableCell className="text-right text-blue-400 text-lg font-bold">
                            {records.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
};

export default PenaltyTable;
