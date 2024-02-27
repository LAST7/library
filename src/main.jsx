import "./assets/main.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "./stores/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <Router>
                <ThemeProvider defaultTheme="dark">
                    <App />
                </ThemeProvider>
            </Router>
        </ReduxProvider>
    </React.StrictMode>,
);
