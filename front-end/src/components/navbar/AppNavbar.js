import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider,
    CButton,
} from "@coreui/react";

import userService from "../../services/userService";

function AppNavbar(props) {
    let navigate = useNavigate();

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const user = userService.getUser();

        if (user !== null) {
            setIsUserLoggedIn(true);
        }
    }, []);

    const handleLogOut = () => {
        userService.logout();

        navigate("/login");
    };

    return (
        <CNavbar colorScheme="light" className="bg-body">
            <CContainer fluid>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <CNavbarBrand style={{fontWeight:"bold"}}>Sri-Care</CNavbarBrand>
                </NavLink>
                {!isUserLoggedIn ? (
                    <div>
                        <NavLink to="/register" style={{ textDecoration: "none" }}>
                            <CButton color="success" className="me-2">
                                Sign up
                            </CButton>
                        </NavLink>
                        <NavLink to="/login" style={{ textDecoration: "none" }}>
                            <CButton color="success">Login</CButton>
                        </NavLink>
                    </div>
                ) : (
                    <CDropdown alignment="end">
                        <CDropdownToggle color="secondary">
                            {props.user.username}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <NavLink
                                to={`/${props.user.userType}`}
                                style={{ textDecoration: "none" }}
                            >
                                <CDropdownItem>Dashboard</CDropdownItem>
                            </NavLink>
                            <CDropdownDivider />
                            {/* <NavLink to="/logout" style={{ textDecoration: "none" }}> */}
                            <CDropdownItem
                                onClick={handleLogOut}
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </CDropdownItem>
                            {/* </NavLink> */}
                        </CDropdownMenu>
                    </CDropdown>
                )}
            </CContainer>
        </CNavbar>
    );
}

export default AppNavbar;
