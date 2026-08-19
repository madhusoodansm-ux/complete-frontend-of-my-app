/* =========================================================
   SRI SADGURU SIDDAROODA PARCEL SERVICE
   CUSTOMER LOGIN
   JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       GET ELEMENTS                                                                            
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const phoneMethod =
        document.getElementById("phoneMethod");

    const emailMethod =
        document.getElementById("emailMethod");

    const identifierLabel =
        document.getElementById("identifierLabel");

    const identifierInput =
        document.getElementById("loginIdentifier");

    const identifierIcon =
        document.getElementById("identifierIcon");

    const identifierHelp =
        document.getElementById("identifierHelp");

    const passwordInput =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const identifierError =
        document.getElementById("identifierError");

    const passwordError =
        document.getElementById("passwordError");

    const loginButton =
        document.getElementById("loginButton");

    const loginButtonText =
        document.getElementById("loginButtonText");

    const formMessage =
        document.getElementById("formMessage");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const helpButton =
        document.getElementById("helpButton");

    const currentYear =
        document.getElementById("currentYear");
    
    const registerButton = document.getElementById("registerButton");

        if (registerButton) {
        registerButton.addEventListener("click", function () {
        window.location.href = "customer/register.html";
        });
        }


    /* =====================================================
       CURRENT LOGIN METHOD
    ===================================================== */

    let currentMethod = "phone";


    /* =====================================================
       PHONE LOGIN
    ===================================================== */

    phoneMethod.addEventListener("click", function () {

        currentMethod = "phone";

        phoneMethod.classList.add("active");

        emailMethod.classList.remove("active");


        identifierLabel.textContent =
            "Phone Number";


        identifierInput.type =
            "tel";


        identifierInput.inputMode =
            "numeric";


        identifierInput.placeholder =
            "Enter your phone number";


        identifierInput.autocomplete =
            "tel";


        identifierInput.maxLength =
            10;


        identifierIcon.textContent =
            "📱";


        identifierHelp.textContent =
            "Enter your 10-digit mobile number.";


        identifierInput.value = "";


        clearIdentifierError();

        clearFormMessage();


        identifierInput.focus();

    });


    /* =====================================================
       GMAIL LOGIN
    ===================================================== */

    emailMethod.addEventListener("click", function () {

        currentMethod = "email";

        emailMethod.classList.add("active");

        phoneMethod.classList.remove("active");


        identifierLabel.textContent =
            "Gmail Address";


        identifierInput.type =
            "email";


        identifierInput.inputMode =
            "email";


        identifierInput.placeholder =
            "Enter your Gmail address";


        identifierInput.autocomplete =
            "email";


        identifierInput.maxLength =
            100;


        identifierIcon.textContent =
            "✉";


        identifierHelp.textContent =
            "Use the Gmail address registered with your account.";


        identifierInput.value = "";


        clearIdentifierError();

        clearFormMessage();


        identifierInput.focus();

    });


    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    passwordToggle.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type =
                "text";

            passwordToggle.textContent =
                "Hide";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type =
                "password";

            passwordToggle.textContent =
                "Show";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });


    /* =====================================================
       PHONE INPUT
       NUMBERS ONLY
    ===================================================== */

    identifierInput.addEventListener(
        "input",
        function () {

            if (currentMethod === "phone") {

                this.value =
                    this.value.replace(/\D/g, "");

            }

            clearIdentifierError();

            clearFormMessage();

        }
    );


    /* =====================================================
       PASSWORD INPUT
    ===================================================== */

    passwordInput.addEventListener(
        "input",
        function () {

            clearPasswordError();

            clearFormMessage();

        }
    );


    /* =====================================================
       VALIDATE PHONE
    ===================================================== */

    function validatePhone(value) {

        const phonePattern =
            /^[6-9]\d{9}$/;

        return phonePattern.test(value);

    }


    /* =====================================================
       VALIDATE GMAIL
    ===================================================== */

    function validateGmail(value) {

        const gmailPattern =
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        return gmailPattern.test(value);

    }


    /* =====================================================
       VALIDATE IDENTIFIER
    ===================================================== */

    function validateIdentifier() {

        const value =
            identifierInput.value.trim();


        if (!value) {

            showIdentifierError(

                currentMethod === "phone"

                    ? "Please enter your phone number."

                    : "Please enter your Gmail address."

            );

            return false;
        }


        if (currentMethod === "phone") {

            if (!validatePhone(value)) {

                showIdentifierError(
                    "Please enter a valid 10-digit mobile number."
                );

                return false;
            }

        }


        if (currentMethod === "email") {

            if (!validateGmail(value)) {

                showIdentifierError(
                    "Please enter a valid Gmail address."
                );

                return false;
            }

        }


        clearIdentifierError();

        return true;

    }


    /* =====================================================
       VALIDATE PASSWORD
       LOGIN PAGE:
       MINIMUM 12 CHARACTERS
    ===================================================== */

    function validatePassword() {

        const password =
            passwordInput.value;


        if (!password) {

            showPasswordError(
                "Please enter your password."
            );

            return false;
        }


        if (password.length < 12) {

            showPasswordError(
                "Password must contain at least 12 characters."
            );

            return false;
        }


        clearPasswordError();

        return true;

    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            clearFormMessage();


            const identifierValid =
                validateIdentifier();


            const passwordValid =
                validatePassword();


            if (
                !identifierValid ||
                !passwordValid
            ) {

                showFormMessage(
                    "Please correct the highlighted fields.",
                    "error"
                );

                return;

            }


            /* =================================================
               IMPORTANT

               THIS IS FRONTEND VALIDATION ONLY.

               REAL LOGIN AUTHENTICATION MUST BE CONNECTED
               TO A SECURE BACKEND API.
            ================================================= */

            setLoginLoading(true);

             await wait(800);

             const identifier = identifierInput.value.trim();

             const rememberMe =
             document.getElementById("rememberMe").checked;

             const customerSession = {
             isLoggedIn: true,
             loginMethod: currentMethod,
             identifier: identifier,
             name: "Customer",
              loginTime: new Date().toISOString()
             };

             if (rememberMe) {

             localStorage.setItem(
             "customerSession",
             JSON.stringify(customerSession)
             );

             } else {

             sessionStorage.setItem(
               "customerSession",
               JSON.stringify(customerSession)
             );
             }

             setLoginLoading(false);

             showFormMessage(
              "Login successful. Redirecting...",
              "success"
             );

             setTimeout(function () {

             window.location.href =
             "customer/dashboard.html";

             }, 500);
            
            



        }
    );


    // ========================================
     // FORGOT PASSWORD NAVIGATION
    // ========================================

    const forgotPasswordButton = document.getElementById("forgotPassword");

      if (forgotPasswordButton) {
        forgotPasswordButton.addEventListener("click", function () {
        window.location.href = "customer/forgot-password.html";
      });
      }


    /* =====================================================
       NEED HELP
    ===================================================== */

    helpButton.addEventListener(
        "click",
        function () {

            showFormMessage(
                "Customer support information will be added here.",
                "info"
            );

        }
    );


    /* =====================================================
       IDENTIFIER ERROR
    ===================================================== */

    function showIdentifierError(message) {

        identifierError.textContent =
            message;

        identifierInput.classList.add(
            "input-error"
        );

    }


    function clearIdentifierError() {

        identifierError.textContent =
            "";

        identifierInput.classList.remove(
            "input-error"
        );

    }


    /* =====================================================
       PASSWORD ERROR
    ===================================================== */

    function showPasswordError(message) {

        passwordError.textContent =
            message;

        passwordInput.classList.add(
            "input-error"
        );

    }


    function clearPasswordError() {

        passwordError.textContent =
            "";

        passwordInput.classList.remove(
            "input-error"
        );

    }


    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    function showFormMessage(
        message,
        type = "info"
    ) {

        formMessage.textContent =
            message;

        formMessage.className =
            `form-message show ${type}`;

    }


    function clearFormMessage() {

        formMessage.textContent =
            "";

        formMessage.className =
            "form-message";

    }


    /* =====================================================
       LOGIN LOADING
    ===================================================== */

    function setLoginLoading(isLoading) {

        if (isLoading) {

            loginButton.disabled =
                true;

            loginButton.classList.add(
                "loading"
            );

            loginButtonText.textContent =
                "Checking...";

        } else {

            loginButton.disabled =
                false;

            loginButton.classList.remove(
                "loading"
            );

            loginButtonText.textContent =
                "Login";

        }

    }


    /* =====================================================
       WAIT
    ===================================================== */

    function wait(milliseconds) {

        return new Promise(function (resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    currentYear.textContent =
        new Date().getFullYear();


});