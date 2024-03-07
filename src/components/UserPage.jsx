import { useDispatch, useSelector } from "react-redux";

import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import UserStat from "@/components/UserPage/UserStat";
import BackButton from "@/components/BackButton";

import avatar from "../assets/last-avatar.webp";
import ChgPasswdDialog from "./UserPage/ChgPasswdDialog";
import { clearUser } from "@/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    // TODO: should navigate to login page if user is null
    if (!user) {
        return null;
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
                        <UserStat />
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
