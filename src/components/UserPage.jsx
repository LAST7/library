import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import BackButton from "@/components/BackButton";
import ChgPasswdDialog from "@/components/UserPage/ChgPasswdDialog";
import UserStat from "@/components/UserPage/UserStat";

import { clearUser } from "@/reducers/userReducer";
import userService from "@/services/user";

import avatar from "../assets/last-avatar.webp";

const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const localUser = window.localStorage.getItem("localUser");

    const [stats, setStats] = useState(null);
    useEffect(() => {
        if (!user) {
            return;
        }

        // somehow async functions need to be written this way
        const fetchData = async () => {
            const userInfo = await userService.getInfo();
            setStats(userInfo);
        };
        fetchData();
    }, [user]);

    // navigate to login page if no user stored locally
    if (!user && !localUser) {
        navigate("/login");
    } else if (!user) {
        return (
            <section
                id="user"
                className="container py-24 h-full justify-center"
            >
                <div className="text-3xl text-center">Loading...</div>
            </section>
        );
    }

    const handlelogOut = () => {
        dispatch(clearUser());
        window.localStorage.removeItem("localUser");
        navigate("/login");
    };

    return (
        <section id="user" className="container py-24 h-full">
            <BackButton />
            <div className="bg-muted/50 border rounded-lg py-12">
                <div className="px-12 flex flex-row gap-8 md:gap-12">
                    <div className="w-full bg-green-0 flex flex-col gap-6">
                        <div className="pb-6">
                            <h2 className="text-6xl font-bold">
                                <span className="bg-gradient-to-b from-primary/50 to-primary text-transparent bg-clip-text">
                                    你好，{user.username}
                                </span>
                            </h2>
                        </div>
                        <UserStat stats={stats} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <img
                            src={avatar}
                            alt="user avater"
                            className="w-[300px] object-contain rounded-lg"
                        />
                        <ChgPasswdDialog buttonVariant="outline" />
                        <Button variant="destructive" onClick={handlelogOut}>
                            <ExitIcon className="mr-2" /> 退出登录
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserPage;
