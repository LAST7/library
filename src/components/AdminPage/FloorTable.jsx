import { useEffect } from "react";
import { useFloor } from "@/components/Admin";
import { cn } from "@/lib/utils";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const FloorTable = () => {
    const { floors } = useFloor();

    useEffect(() => {
        if (!floors) {
            return (
                <section
                    id="admin-floors"
                    className="py-24 h-full justify-center"
                >
                    <div className="text-3xl text-center">Loading...</div>
                </section>
            );
        }
    }, []);

    return (
        <Table>
            <TableCaption>图书馆楼层开放情况</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">
                        楼层
                    </TableHead>
                    <TableHead className="text-right">开放</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {floors.map((f) => (
                    <TableRow key={f.floor_level}>
                        <TableCell className="text-lg text-center">
                            {f.floor_level}
                        </TableCell>
                        <TableCell
                            className={cn("text-right text-lg font-bold", {
                                "text-sky-400": f.open === 1,
                                "text-rose-400": f.open === 0,
                            })}
                        >
                            {f.open === 1 ? "是" : "否"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FloorTable;
