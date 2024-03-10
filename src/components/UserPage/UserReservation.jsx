import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sortBy } from "lodash";
import { toast } from "sonner";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ReservationTable from "@/components/UserPage/ReservationTable";

import reservationService from "@/services/reservation";

const UserReservation = () => {
    const navigate = useNavigate();

    const [records, setRecords] = useState([]);

    useEffect(() => {
        reservationService
            .getReservation()
            .then((res) => {
                setRecords(res);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                console.error(err);
            });
    }, []);

    // format the data sent back from the backend server
    const formatRecords = records.map((r) => {
        const reservation_id = r.reservation_id;
        const floorAndSeat = `${r.floor_level} 楼 ${r.seat_number}`;
        const reservationTime = new Date(r.reservation_time).toLocaleString(
            "zh-CN",
        );
        const date = new Date(r.check_in_time).toLocaleDateString("zh-CN");
        const iTime = new Date(r.check_in_time)
            .toLocaleTimeString("zh-CN")
            .slice(0, 5);
        const oTime = new Date(r.check_out_time)
            .toLocaleTimeString("zh-CN")
            .slice(0, 5);

        let status = "未知";
        if (r.cancelled === 1) {
            status = "取消";
        } else if (new Date(r.check_out_time) >= new Date()) {
            status = "进行中";
        } else {
            status = "已过期";
        }

        return {
            reservation_id,
            floorAndSeat,
            reservationTime,
            date,
            iTime,
            oTime,
            status,
        };
    });

    const sortedRecords = sortBy(formatRecords, [
        (r) => {
            const statusOrder = { 进行中: 0, 取消: 1, 已过期: 2 };
            return [statusOrder[r.status], new Date(r.iTime)];
        },
    ]);

    const handleReservation = () => {
        navigate("/reservation");
    };

    return (
        <div className="bg-muted/50 border rounded-lg py-12 px-12 flex flex-row gap-8">
            <div className="w-full bg-green-0 flex flex-col gap-6">
                <div className="flex flex-row justify-between">
                    <h2 className="pb-6 text-4xl font-bold">
                        <span className="bg-gradient-to-b from-primary/50 to-primary text-transparent bg-clip-text">
                            预约记录
                        </span>
                    </h2>

                    <Button
                        type="button"
                        variant="link"
                        onClick={handleReservation}
                        className="py-6 px-6 text-sky-400 text-lg font-bold border border-gray-500"
                    >
                        前往预约 <ChevronRightIcon className="h-6 w-6 ml-2" />
                    </Button>
                </div>
                <ReservationTable records={sortedRecords} />
            </div>
        </div>
    );
};
export default UserReservation;
