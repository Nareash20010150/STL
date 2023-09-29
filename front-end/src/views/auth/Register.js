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
    CFormSelect,
    CSpinner,
    CImage,
    CImg,
    CCardImageOverlay,
} from "@coreui/react";
import { toast } from "react-toastify";

import {
    v_email,
    v_required,
    v_min,
    v_inRange,
    v_match,
} from "../../utils/validator";

import userService from "../../services/userService";

function Register() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    // Form data
    const [registerForm, setRegisterForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        usernameError: "",
        firstNameError: "",
        lastNameError: "",
        phoneError: "",
        addressError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let usernameError = "";
        let firstNameError = "";
        let lastNameError = "";
        let phoneError = "";
        let addressError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (!v_required(registerForm.username)) {
            usernameError = "Username can not be empty.";
        } else if (!v_inRange(registerForm.username, 5, 20)) {
            usernameError = "Username should be 5-20 characters.";
        }

        if (!v_required(registerForm.firstName)) {
            firstNameError = "First name can not be empty.";
        }

        if (!v_required(registerForm.lastName)) {
            lastNameError = "Last name can not be empty.";
        }

        if (!v_required(registerForm.phone)) {
            phoneError = "Phone can not be empty.";
        } else if (!v_min(registerForm.phone, 10)) {
            phoneError = "Phone number is not valid.";
        }

        if (!v_required(registerForm.address)) {
            addressError = "Address can not be empty.";
        }

        if (!v_required(registerForm.email)) {
            emailError = "Email can not be empty.";
        } else if (!v_email(registerForm.email)) {
            emailError = "Email is not valid.";
        }

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
            usernameError,
            firstNameError,
            lastNameError,
            phoneError,
            addressError,
            emailError,
            passwordError,
            confirmPasswordError,
        });

        // If no errors exist, send to the server
        if (
            !(
                usernameError ||
                firstNameError ||
                lastNameError ||
                phoneError ||
                addressError ||
                emailError ||
                passwordError ||
                confirmPasswordError
            )
        ) {
            // Sending to the server
            setLoading(true);

            const payload = {
                username: registerForm.username,
                firstName: registerForm.firstName,
                lastName: registerForm.lastName,
                phone: registerForm.phone,
                address: registerForm.address,
                email: registerForm.email,
                password: registerForm.password,
            };

            userService.register(payload).then(
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
                                <h1 className="text-center">Sign up</h1>
                                <p className="text-medium-emphasis text-center">
                                    Please enter your details
                                </p>

                                <CForm className="row g-3">
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="username"
                                            label="Username"
                                            onChange={onUpdateInput}
                                            value={registerForm.username}
                                            feedback={registerFormErrors.usernameError}
                                            invalid={registerFormErrors.usernameError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="firstName"
                                            label="First name"
                                            onChange={onUpdateInput}
                                            value={registerForm.firstName}
                                            feedback={registerFormErrors.firstNameError}
                                            invalid={registerFormErrors.firstNameError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="lastName"
                                            label="Last name"
                                            onChange={onUpdateInput}
                                            value={registerForm.lastName}
                                            feedback={registerFormErrors.lastNameError}
                                            invalid={registerFormErrors.lastNameError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="phone"
                                            label="Phone"
                                            onChange={onUpdateInput}
                                            value={registerForm.phone}
                                            feedback={registerFormErrors.phoneError}
                                            invalid={registerFormErrors.phoneError ? true : false}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="validationServer01"
                                            name="address"
                                            label="Address"
                                            onChange={onUpdateInput}
                                            value={registerForm.address}
                                            feedback={registerFormErrors.addressError}
                                            invalid={registerFormErrors.addressError ? true : false}
                                        />
                                    </CCol>
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
                                                Register {loading && <CSpinner size="sm" />}
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

export default Register;
