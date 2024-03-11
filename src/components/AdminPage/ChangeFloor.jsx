import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useFloor } from "../Admin";

import adminService from "@/services/admin";
import { useSelector } from "react-redux";

const FloorSelector = ({ setFloorLevel }) => {
    const { floors } = useFloor();
    const floorLevels = floors.map((f) => f.floor_level);
    return (
        <Select onValueChange={setFloorLevel}>
            <SelectTrigger className="w-[180px] border-slate-500">
                <SelectValue placeholder="选择楼层" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>楼层</SelectLabel>
                    {floorLevels.map((f) => (
                        <SelectItem key={f} value={f}>
                            {f}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const StatusSelector = ({ setStatus }) => {
    return (
        <Select onValueChange={setStatus}>
            <SelectTrigger className="w-[180px] border-slate-500">
                <SelectValue placeholder="设置状态" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>状态</SelectLabel>
                    <SelectItem value="open">开放</SelectItem>
                    <SelectItem value="closed">关闭</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const ChangeFloor = () => {
    const [floorLevel, setFloorLevel] = useState("");
    const [status, setStatus] = useState("");

    const admin = useSelector((state) => state.admin);
    const { floors, setFloors } = useFloor();

    const handleChange = () => {
        if (floorLevel === "" || status === "") {
            toast.warning("请选择楼层和开放状态");
            return;
        }

        adminService
            .changeFloorStatus(floorLevel, status, admin.token)
            .then((_) => {
                // update table component
                setFloors(
                    floors.map((f) =>
                        f.floor_level === floorLevel
                            ? { ...f, open: status === "open" ? 1 : 0 }
                            : f,
                    ),
                );
                toast.info("楼层状态修改成功");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <div className="flex flex-col gap-2 items-center">
            <FloorSelector setFloorLevel={setFloorLevel} />
            <StatusSelector setStatus={setStatus} />
            <Button
                variant="destructive"
                className="my-4"
                onClick={handleChange}
            >
                更改
            </Button>
        </div>
    );
};

export default ChangeFloor;
