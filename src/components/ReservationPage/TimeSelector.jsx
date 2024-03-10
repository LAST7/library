import * as React from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useDateTime } from "@/components/Reservation";

const TimeSelector = ({ type }) => {
    const info = {
        start: {
            placeholder: "选择起始时间",
            label: "起始",
        },
        end: {
            placeholder: "选择结束时间",
            label: "结束",
        },
        times: [
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
        ],
    };

    // extract the value provided by DateTimeContext
    const { dateTime, setDateTime } = useDateTime();

    const setTime =
        type === "start"
            ? (t) => setDateTime({ ...dateTime, iTime: t })
            : (t) => setDateTime({ ...dateTime, oTime: t });

    return (
        <Select onValueChange={setTime}>
            <SelectTrigger className="w-[300px] border-slate-500">
                <SelectValue
                    placeholder={
                        type === "start"
                            ? info.start.placeholder
                            : info.end.placeholder
                    }
                />
            </SelectTrigger>
            <SelectContent>
                {info.times.map((t) => (
                    <SelectItem key={t} value={t}>
                        {t}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default TimeSelector;
