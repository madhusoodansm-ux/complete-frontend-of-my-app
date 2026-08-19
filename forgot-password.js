/* =========================================================
   SRI SADGURU SIDDAROODA PARCEL SERVICE
   CUSTOMER FORGOT PASSWORD
   FRONTEND JAVASCRIPT
========================================================= */


/* =========================================================
   GET ELEMENTS
========================================================= */

const recoveryForm =
    document.getElementById("recoveryForm");

const recoveryMethod =
    document.getElementById("recoveryMethod");

const recoveryValue =
    document.getElementById("recoveryValue");

const recoveryValueLabel =
    document.getElementById("recoveryValueLabel");

const recoveryValueError =
    document.getElementById("recoveryValueError");

const sendOtpButton =
    document.getElementById("sendOtpButton");

const otpSection =
    document.getElementById("otpSection");

const otpInput =
    document.getElementById("otp");

const otpError =
    document.getElementById("otpError");

const verifyOtpButton =
    document.getElementById("verifyOtpButton");

const resendOtpButton =
    document.getElementById("resendOtpButton");

const newPasswordSection =
    document.getElementById("newPasswordSection");

const newPassword =
    document.getElementById("newPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const newPasswordError =
    document.getElementById("newPasswordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const resetPasswordButton =
    document.getElementById("resetPasswordButton");

const formMessage =
    document.getElementById("formMessage");

const loginButton =
    document.getElementById("loginButton");


/* =========================================================
   VARIABLES
========================================================= */

let generatedOTP = "";

let otpVerified = false;

let otpSent = false;

let resendTimer = null;

let resendSeconds = 30;


/* =========================================================
   HELPER - SHOW MESSAGE
========================================================= */

function showMessage(message, type = "info") {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.className =
        "form-message show " + type;
}


/* =========================================================
   HELPER - CLEAR MESSAGE
========================================================= */

function clearMessage() {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = "";

    formMessage.className =
        "form-message";
}


/* =========================================================
   HELPER - ERROR
========================================================= */

function showError(element, message) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.classList.add("input-error");
}


/* =========================================================
   HELPER - CLEAR ERROR
========================================================= */

function clearError(element) {

    if (!element) {
        return;
    }

    element.textContent = "";

    element.classList.remove("input-error");
}


/* =========================================================
   RECOVERY METHOD
========================================================= */

if (recoveryMethod) {

    recoveryMethod.addEventListener(
        "change",
        function () {

            clearError(recoveryValueError);

            clearMessage();

            if (recoveryValue) {
                recoveryValue.value = "";
            }

            if (recoveryMethod.value === "email") {

                if (recoveryValueLabel) {
                    recoveryValueLabel.textContent =
                        "Gmail Address";
                }

                if (recoveryValue) {
                    recoveryValue.type = "email";

                    recoveryValue.placeholder =
                        "Enter your Gmail address";
                }

            } else {

                if (recoveryValueLabel) {
                    recoveryValueLabel.textContent =
                        "Mobile Number";
                }

                if (recoveryValue) {
                    recoveryValue.type = "tel";

                    recoveryValue.placeholder =
                        "Enter your 10-digit mobile number";

                    recoveryValue.maxLength = 10;
                }
            }

        }
    );

}


/* =========================================================
   RECOVERY VALUE INPUT
========================================================= */

if (recoveryValue) {

    recoveryValue.addEventListener(
        "input",
        function () {

            clearError(recoveryValueError);

            clearMessage();

            if (
                recoveryMethod &&
                recoveryMethod.value === "phone"
            ) {

                this.value =
                    this.value.replace(
                        /[^0-9]/g,
                        ""
                    );

            }

        }
    );

}


/* =========================================================
   VALIDATE RECOVERY VALUE
========================================================= */

function validateRecoveryValue() {

    if (
        !recoveryMethod ||
        !recoveryValue
    ) {
        return false;
    }

    const method =
        recoveryMethod.value;

    const value =
        recoveryValue.value.trim();


    /* -----------------------------------------------------
       EMAIL
    ----------------------------------------------------- */

    if (method === "email") {

        const gmailPattern =
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!gmailPattern.test(value)) {

            showError(
                recoveryValueError,
                "Please enter a valid Gmail address."
            );

            return false;
        }

    }


    /* -----------------------------------------------------
       PHONE
    ----------------------------------------------------- */

    if (method === "phone") {

        const phonePattern =
            /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(value)) {

            showError(
                recoveryValueError,
                "Please enter a valid 10-digit mobile number."
            );

            return false;
        }

    }


    clearError(recoveryValueError);

    return true;
}


/* =========================================================
   GENERATE OTP
========================================================= */

function generateOTP() {

    return Math.floor(
        100000 +
        Math.random() * 900000
    ).toString();

}


/* =========================================================
   SEND OTP
========================================================= */

if (sendOtpButton) {

    sendOtpButton.addEventListener(
        "click",
        function () {

            clearMessage();

            if (!validateRecoveryValue()) {
                return;
            }


            /* Generate temporary demo OTP */

            generatedOTP =
                generateOTP();

            otpSent = true;

            otpVerified = false;


            /* Show OTP section */

            if (otpSection) {
                otpSection.classList.add("show");
            }


            /* Hide password section */

            if (newPasswordSection) {
                newPasswordSection.classList.remove("show");
            }


            /* ------------------------------------------------
               DEMO ONLY

               Real application will send OTP through:
               SMS gateway OR email service.
            ------------------------------------------------ */

            console.log(
                "DEMO OTP:",
                generatedOTP
            );


            showMessage(
                "OTP has been sent. Please enter the OTP to continue.",
                "success"
            );


            /* Start resend timer */

            startResendTimer();

        }
    );

}


/* =========================================================
   OTP INPUT - NUMBERS ONLY
========================================================= */

if (otpInput) {

    otpInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );

            clearError(otpError);

        }
    );

}


/* =========================================================
   VALIDATE OTP
========================================================= */

function validateOTP() {

    if (!otpInput) {
        return false;
    }

    const enteredOTP =
        otpInput.value.trim();


    if (!otpSent) {

        showError(
            otpError,
            "Please request an OTP first."
        );

        return false;
    }


    if (enteredOTP.length !== 6) {

        showError(
            otpError,
            "Please enter the 6-digit OTP."
        );

        return false;
    }


    if (enteredOTP !== generatedOTP) {

        showError(
            otpError,
            "Incorrect OTP. Please try again."
        );

        return false;
    }


    clearError(otpError);

    return true;
}


/* =========================================================
   VERIFY OTP
========================================================= */

if (verifyOtpButton) {

    verifyOtpButton.addEventListener(
        "click",
        function () {

            clearMessage();

            if (!validateOTP()) {
                return;
            }


            otpVerified = true;


            /* Hide OTP section */

            if (otpSection) {
                otpSection.classList.remove("show");
            }


            /* Show new password section */

            if (newPasswordSection) {
                newPasswordSection.classList.add("show");
            }


            showMessage(
                "OTP verified successfully. You can now create a new password.",
                "success"
            );

        }
    );

}


/* =========================================================
   RESEND OTP TIMER
========================================================= */

function startResendTimer() {

    resendSeconds = 30;


    if (resendTimer) {
        clearInterval(resendTimer);
    }


    if (resendOtpButton) {

        resendOtpButton.disabled = true;

        resendOtpButton.textContent =
            "Resend OTP (" +
            resendSeconds +
            "s)";
    }


    resendTimer =
        setInterval(
            function () {

                resendSeconds--;


                if (resendOtpButton) {

                    resendOtpButton.textContent =
                        "Resend OTP (" +
                        resendSeconds +
                        "s)";
                }


                if (resendSeconds <= 0) {

                    clearInterval(
                        resendTimer
                    );


                    if (resendOtpButton) {

                        resendOtpButton.disabled =
                            false;

                        resendOtpButton.textContent =
                            "Resend OTP";
                    }

                }

            },
            1000
        );

}


/* =========================================================
   RESEND OTP
========================================================= */

if (resendOtpButton) {

    resendOtpButton.addEventListener(
        "click",
        function () {

            if (!validateRecoveryValue()) {
                return;
            }


            generatedOTP =
                generateOTP();

            otpSent = true;

            otpVerified = false;


            console.log(
                "DEMO NEW OTP:",
                generatedOTP
            );


            if (otpInput) {
                otpInput.value = "";
            }


            clearError(otpError);


            showMessage(
                "A new OTP has been sent.",
                "success"
            );


            startResendTimer();

        }
    );

}


/* =========================================================
   12 + 4 PASSWORD RULE
========================================================= */

/*

   PASSWORD REQUIREMENTS:

   1. Minimum 12 characters
   2. At least 1 CAPITAL letter (A-Z)
   3. At least 1 small letter (a-z)
   4. At least 1 number (0-9)
   5. At least 1 special character

*/


function validateNewPassword(password) {

    /* Rule 1 - Minimum 12 characters */

    if (password.length < 12) {

        return {
            valid: false,
            message:
                "Password must contain at least 12 characters."
        };

    }


    /* Rule 2 - CAPITAL letter */

    if (!/[A-Z]/.test(password)) {

        return {
            valid: false,
              message:
                "Password must contain at least one capital letter (A-Z)."
        };

    }


    /* Rule 3 - small letter */

    if (!/[a-z]/.test(password)) {

        return {
            valid: false,
            message:
                "Password must contain at least one small letter (a-z)."
        };

    }


    /* Rule 4 - number */

    if (!/[0-9]/.test(password)) {

        return {
            valid: false,
            message:
                "Password must contain at least one number (0-9)."
        };

    }


    /* Rule 5 - special character */

    if (
        !/[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]`~]/.test(password)
    ) {

        return {
            valid: false,
            message:
                "Password must contain at least one special character."
        };

    }


    return {
        valid: true,
        message: ""
    };

}


/* =========================================================
   CHECK NEW PASSWORD
========================================================= */

function checkNewPassword() {

    if (!newPassword) {
        return false;
    }

    const result =
        validateNewPassword(
            newPassword.value
        );


    if (!result.valid) {

        showError(
            newPasswordError,
            result.message
        );

        return false;
    }


    clearError(
        newPasswordError
    );

    return true;

}


/* =========================================================
   CHECK CONFIRM PASSWORD
========================================================= */

function checkConfirmNewPassword() {

    if (
        !newPassword ||
        !confirmPassword
    ) {
        return false;
    }


    if (
        confirmPassword.value === ""
    ) {

        showError(
            confirmPasswordError,
            "Please confirm your new password."
        );

        return false;
    }


    if (
        confirmPassword.value !==
        newPassword.value
    ) {

        showError(
            confirmPasswordError,
            "Passwords do not match."
        );

        return false;
    }


    clearError(
        confirmPasswordError
    );

    return true;

}


/* =========================================================
   NEW PASSWORD LIVE VALIDATION
========================================================= */

if (newPassword) {

    newPassword.addEventListener(
        "input",
        function () {

            clearError(
                newPasswordError
            );


            if (
                confirmPassword &&
                confirmPassword.value !== ""
            ) {

                checkConfirmNewPassword();

            }

        }
    );


    newPassword.addEventListener(
        "blur",
        checkNewPassword
    );

}


/* =========================================================
   CONFIRM PASSWORD LIVE VALIDATION
========================================================= */

if (confirmPassword) {

    confirmPassword.addEventListener(
        "input",
        function () {

            clearError(
                confirmPasswordError
            );

        }
    );


    confirmPassword.addEventListener(
        "blur",
        checkConfirmNewPassword
    );

}


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

function setupPasswordToggle(
    buttonId,
    inputId
) {

    const button =
        document.getElementById(
            buttonId
        );

    const input =
        document.getElementById(
            inputId
        );


    if (
        !button ||
        !input
    ) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            if (
                input.type ===
                "password"
            ) {

                input.type = "text";

                button.textContent =
                    "Hide";

            } else {

                input.type =
                    "password";

                button.textContent =
                    "Show";

            }

        }
    );

}


/* =========================================================
   PASSWORD TOGGLE BUTTONS
========================================================= */

setupPasswordToggle(
    "newPasswordToggle",
    "newPassword"
);

setupPasswordToggle(
    "confirmPasswordToggle",
    "confirmPassword"
);


/* =========================================================
   RESET PASSWORD
========================================================= */

if (resetPasswordButton) {

    resetPasswordButton.addEventListener(
        "click",
        function () {

            clearMessage();


            /* OTP must be verified */

            if (!otpVerified) {

                showMessage(
                    "Please verify the OTP before resetting your password.",
                    "error"
                );

                return;
            }


            /* Validate password */

            const passwordValid =
                checkNewPassword();


            /* Validate confirmation */

            const confirmValid =
                checkConfirmNewPassword();


            if (
                !passwordValid ||
                !confirmValid
            ) {

                showMessage(
                    "Please correct the password information.",
                    "error"
                );

                return;
            }


            /* ---------------------------------------------
               FRONTEND DEMO ONLY

               Real backend will update the password
               securely in the database.
            --------------------------------------------- */


            resetPasswordButton.disabled =
                true;


            resetPasswordButton.textContent =
                "RESETTING...";


            setTimeout(
                function () {

                    resetPasswordButton.disabled =
                        false;


                    resetPasswordButton.textContent =
                        "RESET PASSWORD";


                    showMessage(
                        "Your password has been reset successfully. Please login with your new password.",
                        "success"
                    );


                    /* Clear sensitive fields */

                    if (newPassword) {
                        newPassword.value = "";
                    }


                    if (confirmPassword) {
                        confirmPassword.value = "";
                    }


                    /* Reset state */

                    otpVerified = false;

                    otpSent = false;

                    generatedOTP = "";

                },
                1000
            );

        }
    );

}


/* =========================================================
   LOGIN BUTTON
========================================================= */

if (loginButton) {

    loginButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "../index.html";

        }
    );

}


/* =========================================================
   RECOVERY FORM
========================================================= */

if (recoveryForm) {

    recoveryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
               The individual buttons handle
               the recovery process.

               Prevent normal browser submission.
            */

        }
    );

}


/* =========================================================
   INITIAL STATE
========================================================= */

if (otpSection) {

    otpSection.classList.remove(
        "show"
    );

}


if (newPasswordSection) {

    newPasswordSection.classList.remove(
        "show"
    );
}