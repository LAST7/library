import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import ChgPasswdDialog from "@/components/UserPage/ChgPasswdDialog";

import { clearUser } from "@/reducers/userReducer";

import avatar from "@/assets/last-avatar.webp";

const UserAvatar = ({ setLocalUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogOut = () => {
        dispatch(clearUser());
        setLocalUser(null);
        navigate("/login");
    };

    return (
        <div className="flex flex-col gap-4">
            <img
                src={avatar}
                alt="user avater"
                className="w-[300px] object-contain rounded-lg"
            />
            <ChgPasswdDialog
                buttonVariant="outline"
                setLocalUser={setLocalUser}
            />
            <Button variant="destructive" onClick={handlelogOut}>
                <ExitIcon className="mr-2" /> 退出登录
            </Button>
        </div>
    );
};

export default UserAvatar;
