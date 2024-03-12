import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";

import userService from "@/services/user";
import UserInfo from "@/components/UserPage/UserInfo";
import UserReservation from "@/components/UserPage/UserReservation";
import UserPenalty from "@/components/UserPage/UserPenalty";

const User = () => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [localUser, setLocalUser] = useLocalStorage("localUser", null);

    const [stats, setStats] = useState(null);
    useEffect(() => {
        userService
            .getInfo()
            .then((userInfo) => setStats(userInfo))
            .catch((err) => {
                toast.error("无法获取服务器数据");
                console.error(err.response.data.error);
            });
    }, [user]);

    // navigate to login page if no user stored locally
    if (!user && !localUser) {
        navigate("/login");
    } else if (!user) {
        return (
            <section id="user" className="py-24 h-full justify-center">
                <div className="text-3xl text-center">Loading...</div>
            </section>
        );
    }

    return (
        <section id="user" className="container py-24 h-full">
            <div className="flex flex-col gap-8">
                <UserInfo
                    username={user.username}
                    stats={stats}
                    setLocalUser={setLocalUser}
                />
                <UserReservation />
                <UserPenalty />
            </div>
        </section>
    );
};

export default User;
