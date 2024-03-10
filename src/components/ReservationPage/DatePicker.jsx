"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useDateTime } from "@/components/Reservation";

const DatePicker = () => {
    // extract the value provided by DateTimeContext
    const { dateTime, setDateTime } = useDateTime();
    const date = dateTime.date;

    const setDate = (d) =>
        setDateTime({
            ...dateTime,
            date: new Date(d).toLocaleDateString("zh-CN"),
        });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>选择预约日期</span>}
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

export default DatePicker;
