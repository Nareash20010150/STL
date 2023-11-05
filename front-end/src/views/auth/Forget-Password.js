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
    v_email,
    v_required
} from "../../utils/validator";

import userService from "../../services/userService";

function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    // Form data
    const [registerForm, setRegisterForm] = useState({
        email: ""
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
        emailError: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let emailError = "";

        if (!v_required(registerForm.email)) {
            emailError = "Email can not be empty.";
        } else if (!v_email(registerForm.email)) {
            emailError = "Email is not valid.";
        }

        // If errors exist, show errors
        setRegisterFormErrors({
            emailError
        });

        // If no errors exist, send to the server
        if (
            !(emailError)
        ) {
            // Sending to the server
            setLoading(true);

            const payload = {
                email: registerForm.email
            };

            userService.forgetPassword(payload).then(
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
                                <h1 className="text-center">Forget Password</h1>
                                <p className="text-medium-emphasis text-center">
                                    Please enter your email
                                </p>

                                <CForm className="row g-3">
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="email"
                                            label="Email"
                                            onChange={onUpdateInput}
                                            value={registerForm.email}
                                            feedback={registerFormErrors.emailError}
                                            invalid={registerFormErrors.emailError ? true : false}
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
                                                Send Password Reset Email {loading && <CSpinner size="sm" />}
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

export default ForgetPassword;
