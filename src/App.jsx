import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { setUser } from "./reducers/userReducer";

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let localUser = null;
    useEffect(() => {
        const localUserJSON = window.localStorage.getItem("localUser");
        // TODO: handle token
        if (localUserJSON) {
            localUser = JSON.parse(localUserJSON);
            dispatch(setUser(localUser));
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<h1>Hello World</h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reserve" element={<h1>Reservation Page</h1>} />
            </Routes>
        </div>
    );
};

export default App;
