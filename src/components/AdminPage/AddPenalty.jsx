import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import adminService from "@/services/admin";
import { usePenalty } from "../Admin";

const StudentSelector = ({ token, setStudent }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        adminService.getStudents(token).then((res) => {
            setStudents(res.studentResult);
        });
    }, []);

    return (
        <Select onValueChange={setStudent}>
            <SelectTrigger className="w-[180px] border-slate-500">
                <SelectValue placeholder="选择学生" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>学生</SelectLabel>
                    {students.map((s) => (
                        <SelectItem key={s.user_id} value={s}>
                            {s.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
const ReasonSelector = ({ token, setReason }) => {
    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        adminService.getPenaltyType(token).then((res) => {
            setReasons(res.penaltyTypeResult);
        });
    }, []);

    return (
        <Select onValueChange={setReason}>
            <SelectTrigger className="w-[180px] border-slate-500">
                <SelectValue placeholder="选择原因" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel></SelectLabel>
                    {reasons.map((r) => (
                        <SelectItem key={r.penalty_type_id} value={r}>
                            {r.reason}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const DatePicker = ({ date, setDate }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>预约限制结束日期</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

const AddPenalty = () => {
    const [student, setStudent] = useState("");
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");

    const { penalty, setPenalty } = usePenalty();

    const admin = useSelector((state) => state.admin);
    if (!admin) {
        return;
    }

    const handleAdd = () => {
        if (student === "" || reason === "") {
            toast.warning("请选择学生和违规原因");
            return;
        } else if (date === "") {
            toast.warning("请选择预约限制结束日期");
            return;
        }

        const dateUTC = new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        adminService
            .addPenalty(
                admin.token,
                student.user_id,
                admin.admin_id,
                reason.penalty_type_id,
                dateUTC,
            )
            .then((_) => {
                // update table component
                setPenalty(
                    penalty.concat({
                        admin_id: admin.admin_id,
                        username: student.username,
                        name: student.name,
                        reason: reason.reason,
                        until: dateUTC,
                    }),
                );
                toast.info("违规信息添加成功");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <div className="flex flex-col gap-2 items-center">
            <StudentSelector setStudent={setStudent} token={admin.token} />
            <ReasonSelector setReason={setReason} token={admin.token} />
            <DatePicker date={date} setDate={setDate} />
            <Button variant="destructive" className="my-4" onClick={handleAdd}>
                添加
            </Button>
        </div>
    );
};

export default AddPenalty;
