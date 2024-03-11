import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Reservation from "@/components/Reservation";
import User from "@/components/User";

import { setUser } from "@/reducers/userReducer";
import Admin from "./components/Admin";

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [localUser, setLocalUser] = useLocalStorage("localUser", null);

    const admin = useSelector((state) => state.admin);

    // get the login info
    useEffect(() => {
        if (localUser) {
            dispatch(setUser(localUser));
        } else if (!admin) {
            navigate("/login");
            toast.message("未检测到本地存储的用户信息，请登录");
        }
    }, [localUser, admin]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reservation" element={<Reservation />} />
            </Routes>
            <Toaster
                position="top-center"
                expand={false}
                richColors
                closeButton
            />
        </div>
    );
};

export default App;
