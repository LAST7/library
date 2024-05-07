import { useState, useEffect, useContext, createContext } from "react";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import SeatStat from "@/components/ReservationPage/SeatStat";
import TimeForm from "@/components/ReservationPage/TimeForm";

import reservationService from "@/services/reservation";
import { toast } from "sonner";

const DateTimeContext = createContext();
export const useDateTime = () => useContext(DateTimeContext);

const SeatContext = createContext();
export const useSeat = () => useContext(SeatContext);

const Reservation = () => {
    const [dateTime, setDateTime] = useState({
        date: "",
        iTime: "",
        oTime: "",
    });
    const [selectedSeat, setSelectedSeat] = useState({
        seat_number: "",
        floor_level: 0,
    });

    // check time validity after user selection
    useEffect(() => {
        if (dateTime.iTime === "" || dateTime.oTime === "") {
            return;
        } else if (
            Number(dateTime.iTime.slice(0, 2)) >
            Number(dateTime.oTime.slice(0, 2))
        ) {
            toast.warning("结束时间不可在初始时间之前，请重新选择时间段");
            setDateTime({ ...dateTime, iTime: "", oTime: "" });
        }
        if (dateTime.date === "") {
            return;
        } else if (new Date() > new Date(dateTime.date)) {
            toast.warning("预约时间不可早于今日");
            setDateTime({ ...dateTime, date: "" });
        }
        // TODO: should take more precise time into consideration, no time for that lol
    }, [dateTime]);

    const translateKey = (key) => {
        if (key === "date") {
            return "日期";
        } else if (key === "iTime") {
            return "起始时间";
        } else if (key === "oTime") {
            return "结束时间";
        }
    };

    const handleReserve = () => {
        // check data completeness
        const withEmpty = Object.keys(dateTime).some((k) => dateTime[k] === "");
        if (withEmpty) {
            const emptyKey = Object.keys(dateTime).find(
                (k) => dateTime[k] === "",
            );
            toast.warning(`请选择${translateKey(emptyKey)}`);
            return;
        }

        if (selectedSeat.seat_number === "") {
            toast.warning("请选择座位");
            return;
        }

        // convert time to UTC
        const iTime = new Date(dateTime.date + " " + dateTime.iTime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        const oTime = new Date(dateTime.date + " " + dateTime.oTime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        // send reservation to the backend server
        const reservationInfo = {
            seat_number: selectedSeat.seat_number,
            floor_level: selectedSeat.floor_level,
            iTime,
            oTime,
        };

        reservationService
            .postReservation(reservationInfo)
            .then((res) => {
                toast.info(
                    `座位 ${res.floor_level} 楼 ${res.seat_number} 预订成功，请回到个人主页查看`,
                );
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <section id="user" className="container py-24 h-full">
            <BackButton />
            <div className="bg-muted/50 border rounded-xl py-12 px-12 flex flex-row gap-8">
                <div className="w-full bg-green-0 flex flex-col gap-6 items-center">
                    <h2 className="pb-6 text-6xl font-bold">座位预约</h2>
                    <SeatContext.Provider value={setSelectedSeat}>
                        <SeatStat />
                    </SeatContext.Provider>
                    <div className="flex flex-row gap-16">
                        <DateTimeContext.Provider
                            value={{ dateTime, setDateTime }}
                        >
                            <TimeForm />
                        </DateTimeContext.Provider>
                        <Button
                            variant="outline"
                            className="h-[250px] text-2xl border-2 border-slate-700 rounded-xl"
                            onClick={handleReserve}
                        >
                            确认预约
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservation;
