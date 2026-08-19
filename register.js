/* =========================================================
   SRI SADGURU SIDDAROODA PARCEL SERVICE
   CUSTOMER REGISTRATION
   REGISTER.JS CUSTOMIZE
========================================================= */


/* =========================================================
   GET FORM ELEMENTS
========================================================= */

const registrationForm =
    document.getElementById("registrationForm");

const fullName =
    document.getElementById("fullName");

const mobile =
    document.getElementById("mobile");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const terms =
    document.getElementById("terms");

const createAccountButton =
    document.getElementById("createAccountButton");

const buttonLoader =
    document.getElementById("buttonLoader");

const formMessage =
    document.getElementById("formMessage");


/* =========================================================
   CHECK REQUIRED ELEMENTS
========================================================= */

if (!registrationForm) {
    console.error("Registration form was not found.");
}


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

function setupPasswordToggle(buttonId, inputId) {

    const button =
        document.getElementById(buttonId);

    const input =
        document.getElementById(inputId);

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", function () {

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Hide";

        } else {

            input.type = "password";

            button.textContent = "Show";
        }

    });
}


setupPasswordToggle(
    "passwordToggle",
    "password"
);


setupPasswordToggle(
    "confirmPasswordToggle",
    "confirmPassword"
);


/* =========================================================
   PASSWORD RULES
========================================================= */

/*
    Password requirements:

    1. Minimum 12 characters
    2. At least one uppercase letter
    3. At least one lowercase letter
    4. At least one number
    5. At least one special character
*/


function checkPasswordRules(value) {

    return {

        length:
            value.length >= 12,

        uppercase:
            /[A-Z]/.test(value),

        lowercase:
            /[a-z]/.test(value),

        number:
            /[0-9]/.test(value),

        special:
            /[!@#$%^&*]/.test(value)

    };
}


/* =========================================================
   UPDATE PASSWORD RULES
================================================================= */

function updatePasswordRules() {

    if (!password) {
        return;
    }

    const value =
        password.value;

    const rules =
        checkPasswordRules(value);


    updateRule(
        "ruleLength",
        rules.length
    );


    updateRule(
        "ruleUppercase",
        rules.uppercase
    );


    updateRule(
        "ruleLowercase",
        rules.lowercase
    );


    updateRule(
        "ruleNumber",
        rules.number
    );


    updateRule(
        "ruleSpecial",
        rules.special
    );
}


/* =========================================================
   UPDATE INDIVIDUAL PASSWORD RULE
========================================================= */

function updateRule(elementId, valid) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    const circle =
        element.querySelector(".rule-circle");

    if (!circle) {
        return;
    }


    if (valid) {

        element.classList.add("valid");

        circle.textContent = "✓";

    } else {

        element.classList.remove("valid");

        circle.textContent = "○";
    }
}


/* =========================================================
   PASSWORD INPUT EVENT
========================================================= */

if (password) {

    password.addEventListener(
        "input",
        function () {

            updatePasswordRules();

            clearError(
                password,
                "passwordError"
            );

        }
    );

}


/* =========================================================
   ERROR HANDLING
========================================================= */

function showError(
    inputElement,
    errorElementId,
    message
) {

    if (inputElement) {

        inputElement.classList.add(
            "input-error"
        );

    }


    const errorElement =
        document.getElementById(errorElementId);


    if (errorElement) {

        errorElement.textContent =
            message;

    }
}


function clearError(
    inputElement,
    errorElementId
) {

    if (inputElement) {

        inputElement.classList.remove(
            "input-error"
        );

    }


    const errorElement =
        document.getElementById(errorElementId);


    if (errorElement) {

        errorElement.textContent = "";

    }
}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
    message,
    type
) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent =
        message;

    formMessage.className =
        "form-message show " + type;
}


function clearFormMessage() {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = "";

    formMessage.className =
        "form-message";
}


/* =========================================================
   FULL NAME VALIDATION
========================================================= */

function validateFullName() {

    if (!fullName) {
        return false;
    }


    const value =
        fullName.value.trim();


    if (value.length === 0) {

        showError(
            fullName,
            "fullNameError",
            "Please enter your full name."
        );

        return false;
    }


    if (value.length < 2) {

        showError(
            fullName,
            "fullNameError",
            "Full name must contain at least 2 characters."
        );

        return false;
    }


    /*
       Allows:

       A-Z
       a-z
       spaces
       apostrophe
       period
       hyphen
       accented characters
    */

    if (!/^[A-Za-zÀ-ÿ\s.'-]+$/.test(value)) {

        showError(
            fullName,
            "fullNameError",
            "Please enter a valid name."
        );

        return false;
    }


    clearError(
        fullName,
        "fullNameError"
    );

    return true;
}


/* =========================================================
   MOBILE VALIDATION
========================================================= */

function validateMobile() {

    if (!mobile) {
        return false;
    }


    const value =
        mobile.value.trim();


    /*
       Indian mobile number:

       Starts with 6, 7, 8 or 9
       Followed by 9 digits
    */

    if (!/^[6-9][0-9]{9}$/.test(value)) {

        showError(
            mobile,
            "mobileError",
            "Enter a valid 10-digit mobile number."
        );

        return false;
    }


    clearError(
        mobile,
        "mobileError"
    );

    return true;
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail() {

    if (!email) {
        return false;
    }


    const value =
        email.value.trim().toLowerCase();


    /*
       Registration accepts Gmail only.
    */

    const gmailPattern =
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


    if (!gmailPattern.test(value)) {

        showError(
            email,
            "emailError",
            "Please enter a valid Gmail address."
        );

        return false;
    }


    clearError(
        email,
        "emailError"
    );

    return true;
}


/* =========================================================
   PASSWORD VALIDATION
========================================================= */

function validatePassword() {

    if (!password) {
        return false;
    }


    const value =
        password.value;


    const rules =
        checkPasswordRules(value);


    const valid =
        rules.length &&
        rules.uppercase &&
        rules.lowercase &&
        rules.number &&
        rules.special;


    if (!valid) {

        showError(
            password,
            "passwordError",
            "Password must satisfy all password requirements."
        );

        return false;
    }


    clearError(
        password,
        "passwordError"
    );

    return true;
}


/* =========================================================
   CONFIRM PASSWORD VALIDATION
========================================================= */

function validateConfirmPassword() {

    if (!confirmPassword) {
        return false;
    }


    const value =
        confirmPassword.value;


    if (value.length === 0) {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Please confirm your password."
        );

        return false;
    }


    if (value !== password.value) {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );

        return false;
    }


    clearError(
        confirmPassword,
        "confirmPasswordError"
    );

    return true;
}


/* =========================================================
   TERMS & CONDITIONS VALIDATION
========================================================= */

function validateTerms() {

    if (!terms) {
        return false;
    }


    const error =
        document.getElementById("termsError");


    if (!terms.checked) {

        if (error) {

            error.textContent =
                "Please accept the Terms & Conditions and Privacy Policy.";

        }

        return false;
    }


    if (error) {

        error.textContent = "";

    }

    return true;
}


/* =========================================================
   MOBILE NUMBER INPUT CLEANING
========================================================= */

if (mobile) {

    mobile.addEventListener(
        "input",
        function () {

            /*
               Allow numbers only.
            */

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );


            /*
               Maximum 10 digits.
            */

            if (this.value.length > 10) {

                this.value =
                    this.value.substring(0, 10);

            }


            clearError(
                mobile,
                "mobileError"
            );

        }
    );

}


/* =========================================================
   FULL NAME LIVE ERROR CLEAR
========================================================= */

if (fullName) {

    fullName.addEventListener(
        "input",
        function () {

            clearError(
                fullName,
                "fullNameError"
            );

        }
    );

}


/* =========================================================
   EMAIL LIVE ERROR CLEAR
========================================================= */

if (email) {

    email.addEventListener(
        "input",
        function () {

            clearError(
                email,
                "emailError"
            );

        }
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
                confirmPassword,
                "confirmPasswordError"
            );


            if (this.value.length > 0) {

                if (this.value !== password.value) {

                    showError(
                        confirmPassword,
                        "confirmPasswordError",
                        "Passwords do not match."
                    );

                }

            }

        }
    );

}


/* =========================================================
   BLUR VALIDATION
========================================================= */

if (fullName) {

    fullName.addEventListener(
        "blur",
        validateFullName
    );

}


if (mobile) {

    mobile.addEventListener(
        "blur",
        validateMobile
    );

}


if (email) {

    email.addEventListener(
        "blur",
        validateEmail
    );

}


if (password) {

    password.addEventListener(
        "blur",
        validatePassword
    );

}


if (confirmPassword) {

    confirmPassword.addEventListener(
        "blur",
        validateConfirmPassword
    );

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            clearFormMessage();


            /*
               Validate every field.
            */

            const nameValid =
                validateFullName();


            const mobileValid =
                validateMobile();


            const emailValid =
                validateEmail();


            const passwordValid =
                validatePassword();


            const confirmValid =
                validateConfirmPassword();


            const termsValid =
                validateTerms();


            /*
               Stop registration if
               any validation fails.
            */

            if (
                !nameValid ||
                !mobileValid ||
                !emailValid ||
                !passwordValid ||
                !confirmValid ||
                !termsValid
            ) {

                showFormMessage(
                    "Please correct the highlighted information before creating your account.",
                    "error"
                );

                return;
            }


            /* =================================================
               LOADING STATE
            ================================================= */

            if (createAccountButton) {

                createAccountButton.disabled =
                    true;

                createAccountButton.classList.add(
                    "loading"
                );

            }


            /*
               Temporary frontend demonstration.

               This delay is only for displaying
               the loading animation.

               Later this section can be replaced
               with a real backend API.
            */

            await new Promise(
                function (resolve) {

                    setTimeout(
                        resolve,
                        1000
                    );

                }
            );


            /* =================================================
               CUSTOMER DATA
            ================================================= */

            const customerData = {

                fullName:
                    fullName.value.trim(),

                mobile:
                    mobile.value.trim(),

                email:
                    email.value.trim().toLowerCase(),

                registeredAt:
                    new Date().toISOString()

            };


            /*
               IMPORTANT:

               Password is NOT stored in localStorage.

               This is only temporary frontend testing.
            */

            try {

                localStorage.setItem(
                    "demoCustomer",
                    JSON.stringify(customerData)
                );

            } catch (error) {

                console.warn(
                    "Could not save demo customer data.",
                    error
                );

            }


            /* =================================================
               REMOVE LOADING STATE
            ================================================= */

            if (createAccountButton) {

                createAccountButton.disabled =
                    false;

                createAccountButton.classList.remove(
                    "loading"
                );

            }


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            showFormMessage(
                "Your registration information has been validated successfully.",
                "success"
            );


            /*
               NOTE:

               No automatic redirect is used here.

               When your backend/database is ready,
               this section will be replaced by the
               real registration API.
            */

        }
    );

}


/* =========================================================
   LOGIN BUTTON
========================================================= */

const loginButton =
    document.getElementById("loginButton");


if (loginButton) {

    loginButton.addEventListener(
        "click",
        function () {

            /*
               Navigate back to the login page.
            */

            window.location.href =
                "../index.html";

        }
    );

}


/* =========================================================
   TERMS & CONDITIONS BUTTON
========================================================= */

const termsButton =
    document.getElementById("termsButton");


if (termsButton) {

    termsButton.addEventListener(
        "click",
        function () {

            alert(
                "Terms & Conditions page will be connected here."
            );

        }
    );

}


/* =========================================================
   PRIVACY POLICY BUTTON
========================================================= */

const privacyButton =
    document.getElementById("privacyButton");


if (privacyButton) {

    privacyButton.addEventListener(
        "click",
        function () {

            alert(
                "Privacy Policy page will be connected here."
            );

        }
    );

}


/* =========================================================
   INITIAL PASSWORD RULE DISPLAY
========================================================= */

updatePasswordRules();