import React from "react";
import image from "../../assets/images/signUp.jpg";
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
    CSpinner
} from "@coreui/react";
import { toast } from "react-toastify";

import {
    v_required,
    v_match
} from "../../utils/validator";

import userService from "../../services/userService";

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("TOKEN", token);

    // Form data
    const [registerForm, setRegisterForm] = useState({
        password: "",
        confirmPassword: ""
    });

    // Update the form data while input
    const onUpdateInput = (e) => {
        setRegisterForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // For data errors
    const [registerFormErrors, setRegisterFormErrors] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let passwordError = "";
        let confirmPasswordError = "";

        if (!v_required(registerForm.password)) {
            passwordError = "Password can not be empty.";
        }

        if (!v_required(registerForm.confirmPassword)) {
            confirmPasswordError = "Confirm password can not be empty.";
        } else if (!v_match(registerForm.password, registerForm.confirmPassword)) {
            confirmPasswordError = "Passwords are not matched.";
        }

        // If errors exist, show errors
        setRegisterFormErrors({
            passwordError,
            confirmPasswordError
        });

        // If no errors exist, send to the server
        if (
            !(passwordError ||
                confirmPasswordError)
        ) {
            // Sending to the server
            setLoading(true);

            const payload = {
                password: registerForm.password
            };

            userService.resetPassword(payload, token).then(
                (res) => {
                    if (res.type === "OK") {
                        toast.success(res.message);
                        navigate("/login");
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
        <div className=" bg-light d-flex flex-row align-items-center h-100">
            <CContainer className="d-flex">
                <CRow className="justify-content-center">
                    <CCol md={7}>
                        <div className="text-center">
                            <img alt="Responsive image" src={image} />
                        </div>
                    </CCol>
                    <CCol md={5}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <h1 className="text-center">Reset Password</h1>
                                <p className="text-medium-emphasis text-center">
                                    Please enter your new password
                                </p>

                                <CForm className="row g-3">
                                <CCol md={6}>
                                        <CFormInput
                                            type="password"
                                            id="validationServer01"
                                            name="password"
                                            label="Password"
                                            onChange={onUpdateInput}
                                            value={registerForm.password}
                                            feedback={registerFormErrors.passwordError}
                                            invalid={registerFormErrors.passwordError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="password"
                                            id="validationServer01"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            onChange={onUpdateInput}
                                            value={registerForm.confirmPassword}
                                            feedback={registerFormErrors.confirmPasswordError}
                                            invalid={
                                                registerFormErrors.confirmPasswordError ? true : false
                                            }
                                        />
                                    </CCol>

                                    <div className="d-grid">
                                        <CButton
                                            color="primary"
                                            className="py-2"
                                            disabled={loading}
                                            onClick={handleSubmit}
                                        >
                                            <div className="text-white">
                                                Submit {loading && <CSpinner size="sm" />}
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

export default ResetPassword;
