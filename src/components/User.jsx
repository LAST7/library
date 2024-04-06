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
        // navigate to login page if no user stored locally
        if (!user || !localUser) {
            navigate("/login");
        }

        userService
            .getInfo()
            .then((userInfo) => setStats(userInfo))
            .catch((err) => {
                toast.error("无法获取用户数据");
                if (err.response) {
                    // error during requesting data
                    console.error(err.response.data.error);
                } else {
                    // error during forming request, probably missing local token
                    console.error(err);
                }
            });
    }, [user]);

    if (!user) {
        return (
            <section id="user" className="py-24 h-full justify-center">
                <div className="text-3xl text-center">Not Logged In</div>
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
