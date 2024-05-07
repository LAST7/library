import { usePenalty } from "@/components/Admin";

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

const AdminPenaltyTable = () => {
    const { penalty } = usePenalty();

    if (!penalty) {
        return (
            <section id="admin-floors" className="py-24 h-full justify-center">
                <div className="text-3xl text-center">Loading...</div>
            </section>
        );
    }

    return (
        <Table>
            <TableCaption>学生违规记录</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-xl">学生姓名</TableHead>
                    <TableHead className="text-xl">用户名</TableHead>
                    <TableHead className="text-xl">违规原因</TableHead>
                    <TableHead className="text-right text-xl">
                        预约限制结束时间
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {penalty.map((p) => (
                    <TableRow key={p.penalty_id}>
                        <TableCell className="text-xl">{p.name}</TableCell>
                        <TableCell className="text-xl">{p.username}</TableCell>
                        <TableCell className="text-xl">{p.reason}</TableCell>
                        <TableCell className="text-right text-xl font-bold">
                            {new Date(p.until).toLocaleDateString("zh-CN")}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="text-gray-600">
                        总数
                    </TableCell>
                    <TableCell className="text-right text-sky-600 text-lg font-bold">
                        {penalty.length}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default AdminPenaltyTable;
