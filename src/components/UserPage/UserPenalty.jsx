import { useState, useEffect } from "react";
import { toast } from "sonner";

import PenaltyTable from "./PenaltyTable";

import penaltyService from "@/services/penalty";

const UserPenalty = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        penaltyService
            .getPenalty()
            .then((res) => {
                setRecords(res);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                console.error(err);
            });
    }, []);

    return (
        <div className="bg-muted/50 border rounded-lg py-12 px-12 flex flex-row gap-8">
            <div className="w-full bg-green-0 flex flex-col gap-6">
                <h2 className="pb-6 text-4xl font-bold">违规记录</h2>
                <PenaltyTable records={records} />
            </div>
        </div>
    );
};

export default UserPenalty;
