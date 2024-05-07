import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";

import { clearAdmin } from "@/reducers/adminReducer";

const AdminInfo = ({ adminName }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogOut = () => {
        dispatch(clearAdmin());
        navigate("/login");
    };

    return (
        <div className="bg-muted/50 border rounded-lg py-12 px-12 flex flex-row justify-between items-center">
            <h2 className="pb-6 text-6xl font-bold">
                你好，管理员 <span className="text-sky-600">{adminName}</span>
            </h2>
            <Button
                variant="destructive"
                className="h-[64px] w-[200px] text-xl rounded-xl"
                onClick={handlelogOut}
            >
                <ExitIcon className="mr-2" /> 退出登录
            </Button>
        </div>
    );
};

export default AdminInfo;
