import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";

import { setUser } from "./reducers/userReducer";

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let localUser = null;
    useEffect(() => {
        const localUserJSON = window.localStorage.getItem("localUser");
        // TEST: testing pages other than login
        if (localUserJSON) {
            localUser = JSON.parse(localUserJSON);
            dispatch(setUser(localUser));
            // TODO: handle token
        } else {
            // if user not login, redirect to login page
            console.log("no login!");
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<h1>Hello World</h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reserve" element={<h1>Reservation Page</h1>} />
            </Routes>
        </div>
    );
};

export default App;
