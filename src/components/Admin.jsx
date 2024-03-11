import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AdminInfo from "@/components/AdminPage/AdminInfo";
import FloorStat from "@/components/AdminPage/FloorStat";

import adminService from "@/services/admin";
import { toast } from "sonner";
import PenaltyStat from "./AdminPage/PenaltyStat";

const FloorContext = createContext();
export const useFloor = () => useContext(FloorContext);

const PenaltyContext = createContext();
export const usePenalty = () => useContext(PenaltyContext);

const Admin = () => {
    const admin = useSelector((state) => state.admin);

    const [floors, setFloors] = useState([]);
    const [penalty, setPenalty] = useState([]);

    useEffect(() => {
        if (admin) {
            adminService
                .getInfo(admin.token)
                .then((data) => {
                    setFloors(data.floorResult);
                    setPenalty(data.penaltyResult);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error(err.response.data.error);
                });
        }
    }, [admin]);

    if (!admin) {
        return (
            <section id="admin" className="py-24 h-full justify-center">
                <div className="text-3xl text-center">Loading...</div>
            </section>
        );
    }
    return (
        <section id="user" className="container py-24 h-full">
            <div className="flex flex-col gap-8">
                <AdminInfo adminName={admin.name} />
                <FloorContext.Provider value={{ floors, setFloors }}>
                    <FloorStat />
                </FloorContext.Provider>
                <PenaltyContext.Provider value={{ penalty, setPenalty }}>
                    <PenaltyStat />
                </PenaltyContext.Provider>
            </div>
        </section>
    );
};

export default Admin;
