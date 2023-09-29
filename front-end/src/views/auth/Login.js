import React from "react";
import image from "../../assets/images/signIn.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    CForm,
    CCol,
    CFormInput,
    CButton,
    CContainer,
    CRow,
    CCard,
    CCardBody,
    CSpinner,
} from "@coreui/react";
import { toast } from "react-toastify";

import { v_email, v_required } from "../../utils/validator";

import userService from "../../services/userService";

function Login() {
    // For the server side requests and responses
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    // Form data
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    // Update the form data while input
    const onUpdateInput = (e) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // For data errors
    const [loginFormErrors, setLoginFormErrors] = useState({
        emailError: "",
        passwordError: "",
    });

    // Validate the data and
    // If valid send to the server
    // else show the errors
    const handleSubmit = async (e) => {
        e.preventDefault();

        let emailError = "";
        let passwordError = "";

        if (!v_required(loginForm.email)) {
            emailError = "Email can not be empty.";
        } else if (!v_email(loginForm.email)) {
            emailError = "Email is not valid.";
        }

        if (!v_required(loginForm.password)) {
            passwordError = "Password can not be empty.";
        }

        // If errors exist, show errors
        setLoginFormErrors({
            emailError,
            passwordError,
        });

        // If no errors exist, send to the server
        if (!(emailError || passwordError)) {
            // Sending to the server
            setLoading(true);

            const payload = {
                email: loginForm.email,
                password: loginForm.password,
            };

            userService.login(payload).then(
                (res) => {
                    if (res.type === "OK") {
                        toast.success(res.message);

                        if (res.payload.userType === "buyer") {
                            navigate("/buyer");
                        } else if (res.payload.userType === "seller") {
                            navigate("/seller");
                        } else {
                            navigate("/");
                        }
                    } else if (res.type === "BAD") {
                        toast.error(res.message);
                    }

                    setLoading(false);
                },
                (error) => {
                    const res =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    // After recieving the server request
                    toast.error(res);
                    setLoading(false);
                }
            );
        }
    };

    return (
        <div className="bg-light d-flex flex-row align-items-center ">
            <CContainer>
                <CRow className="justify-content-center pt-5 mt-5">
                    <CCol md={7}>
                        <div className="text-center">
                            <img alt="Responsive image" src={image} />
                        </div>
                    </CCol>
                    <CCol md={5}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <h1 className="text-center">Login</h1>
                                <p className="text-medium-emphasis text-center">
                                    Please enter your credentials
                                </p>
                                <CForm className="row g-3">
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="email"
                                            label="Email"
                                            onChange={onUpdateInput}
                                            value={loginForm.email}
                                            feedback={loginFormErrors.emailError}
                                            invalid={loginFormErrors.emailError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        <CFormInput
                                            type="password"
                                            id="validationServer01"
                                            name="password"
                                            label="Password"
                                            onChange={onUpdateInput}
                                            value={loginForm.password}
                                            feedback={loginFormErrors.passwordError}
                                            invalid={loginFormErrors.passwordError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        <div className="forgot-dev">
                                            <a class="forgot" href="#">
                                                <p className="text-center">
                                                    forgot password ?
                                                </p>
                                            </a>
                                        </div>
                                    </CCol>
                                    <CCol md={12}>
                                        <hr />{" "}
                                        <p className="text-medium-emphasis text-center">or</p>
                                    </CCol>
                                    <div className="d-grid">
                                        <CButton
                                            color="primary"
                                            className="py-2"
                                            disabled={loading}
                                            onClick={handleSubmit}
                                        >
                                            <div className="text-white">
                                                Login {loading && <CSpinner size="sm" />}
                                            </div>
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default Login;
