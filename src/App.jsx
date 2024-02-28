import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";

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
        }
    }, []);

    const currentUser = useSelector((state) => state.userLogin);

    // TEST: testing pages other than login
    /* if (!currentUser) {
        console.log("No login! Navigating to the login page");
        navigate("/login");
    } */

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
