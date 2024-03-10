import { useState, useEffect } from "react";

import SeatTable from "./SeatTable";

import seatService from "@/services/seat";
import { toast } from "sonner";

const SeatStat = () => {
    const [seatData, setSeatData] = useState([]);
    useEffect(() => {
        seatService
            .getSeat()
            .then((seatData) => {
                setSeatData(seatData.seatResult);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    }, []);

    if (seatData.length === 0) {
        return (
            <section id="seat-table" className="py-24 h-full justify-center">
                <div className="text-3xl text-center">Loading...</div>
            </section>
        );
    }

    return <SeatTable seatData={seatData} />;
};

export default SeatStat;
