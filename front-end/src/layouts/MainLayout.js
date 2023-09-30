import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { CContainer } from "@coreui/react";

import AppNavbar from "../components/navbar/AppNavbar";
import AppFooter from "../components/footer/AppFooter";

import userService from "../services/userService";

function MainLayout(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        userType: "",
    });

    useEffect(() => {
        if (props.public !== true) {
            const userToken = userService.getUser();

            if (userToken !== null) {
                setUser((prev) => ({
                    username: userToken.username,
                    userType: userToken.userType,
                }));
            } else {
                toast.error("User token not found");
                // navigate("/");
            }

            console.log(user);
        }
    }, []);

    return (
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppNavbar user={user} />
            <ToastContainer autoClose={2000} />
            <div className="body flex-grow-1 p-3">
                <CContainer>{props.page}</CContainer>
            </div>
            <AppFooter />
        </div>
    );
}

export default MainLayout;
