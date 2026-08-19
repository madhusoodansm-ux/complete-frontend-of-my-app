/* =========================================================
   SRI SADGURU SIDDAROODA PARCEL SERVICE
   BOOK PARCEL JAVASCRIPT
   FRONTEND ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       STEP ELEMENTS
    ====================================================== */

    const steps = document.querySelectorAll(".booking-step");
    const progressSteps = document.querySelectorAll(".progress-step");
    const progressLines = document.querySelectorAll(".progress-line");

    let currentStep = 1;


    /* =====================================================
       HELPER - GET ELEMENT
    ====================================================== */

    function getElement(id) {
        return document.getElementById(id);
    }


    /* =====================================================
       SHOW STEP
    ====================================================== */

    function showStep(stepNumber) {

        if (stepNumber < 1 || stepNumber > 5) {
            return;
        }

        currentStep = stepNumber;


        /* Show selected content */

        steps.forEach((step) => {

            step.classList.remove("active");

        });


        const selectedStep = getElement(`step${stepNumber}`);

        if (selectedStep) {
            selectedStep.classList.add("active");
        }


        /* Update progress circles */

        progressSteps.forEach((step) => {

            const number = Number(step.dataset.step);

            step.classList.remove("active");
            step.classList.remove("completed");

            if (number === stepNumber) {
                step.classList.add("active");
            }

            if (number < stepNumber) {
                step.classList.add("completed");
            }

        });


        /* Update progress lines */

        progressLines.forEach((line, index) => {

            const lineNumber = index + 1;

            line.classList.remove("completed");

            if (lineNumber < stepNumber) {
                line.classList.add("completed");
            }

        });


        /* Scroll to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       VALIDATE FORM
    ====================================================== */

    function validateForm(form) {

        if (!form) {
            return false;
        }


        let valid = true;


        const requiredFields =
            form.querySelectorAll("[required]");


        requiredFields.forEach((field) => {

            field.classList.remove("input-error");


            if (!field.value.trim()) {

                valid = false;

                field.classList.add("input-error");

                field.style.borderColor = "#dc2626";

            } else {

                field.style.borderColor = "";

            }

        });


        /* Validate phone numbers */

        const phoneFields =
            form.querySelectorAll('input[type="tel"]');


        phoneFields.forEach((field) => {

            if (
                field.value.trim() &&
                !/^[0-9]{10}$/.test(field.value.trim())
            ) {

                valid = false;

                field.classList.add("input-error");

                field.style.borderColor = "#dc2626";

            }

        });
               /* =====================================================
               OPTIONAL GMAIL VALIDATION
               Email is NOT mandatory.
               If entered, it must end with @gmail.com
             ===================================================== */

        const emailFields =
           form.querySelectorAll('input[type="email"]');

        emailFields.forEach((field) => {

           const email = field.value.trim();

         /* Empty email is allowed */

          if (email === "") {
        return;
           }

         /* Gmail validation */

         const gmailPattern =
           /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

         if (!gmailPattern.test(email)) {

          valid = false;

          field.style.borderColor = "#dc2626";

          alert(
            "Please enter a valid Gmail address ending with @gmail.com."
           );
         }

    });

        /* Validate PIN codes */

        const pinFields =
            form.querySelectorAll(
                'input[name*="Pincode"], input[id*="Pincode"]'
            );


        pinFields.forEach((field) => {

            if (
                field.value.trim() &&
                !/^[0-9]{6}$/.test(field.value.trim())
            ) {

                valid = false;

                field.classList.add("input-error");

                field.style.borderColor = "#dc2626";

            }

        });


        if (!valid) {

            alert(
                "Please check the highlighted fields and enter the required information."
            );

        }


        return valid;

    }


    /* =====================================================
       CLEAR ERROR WHEN USER TYPES
    ====================================================== */

    document
        .querySelectorAll("input, textarea, select")
        .forEach((field) => {

            field.addEventListener("input", () => {

                field.style.borderColor = "";

            });


            field.addEventListener("change", () => {

                field.style.borderColor = "";

            });

        });


    /* =====================================================
       CONTINUE BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".next-button")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const nextStep =
                    Number(button.dataset.next);


                /* Step 1 validation */

                if (currentStep === 1) {

                    const form =
                        getElement("pickupForm");


                    if (!validateForm(form)) {
                        return;
                    }

                }


                /* Step 2 validation */

                if (currentStep === 2) {

                    const form =
                        getElement("deliveryForm");


                    if (!validateForm(form)) {
                        return;
                    }

                }


              


                /* Before confirmation */

                if (currentStep === 4) {

                    updateReview();

                    createBookingReference();

                }


                showStep(nextStep);

            });

        });


    /* =====================================================
       BACK BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".back-step-button")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const previousStep =
                    Number(button.dataset.back);

                showStep(previousStep);

            });

        });


    /* =====================================================
       EDIT BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".edit-step-button")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const editStep =
                    Number(button.dataset.edit);

                showStep(editStep);

            });

        });


    /* =====================================================
       UPDATE REVIEW
    ====================================================== */

    function updateReview() {


        /* -------------------------------------------------
           PICKUP
        -------------------------------------------------- */
        
        setReviewValue(
         "reviewParcelName",
         getValue("parcelName")
        );


        setReviewValue(
            "reviewPickupName",
            getValue("pickupName")
        );


        setReviewValue(
            "reviewPickupPhone",
            getValue("pickupPhone")
        );
        
        setReviewValue(
            "reviewPickupEmail",
            getValue("pickupEmail")
        );

        setReviewValue(
            "reviewPickupAddress",
            getValue("pickupAddress")
        );


        setReviewValue(
            "reviewPickupCity",
            getValue("pickupCity")
        );


        setReviewValue(
            "reviewPickupPincode",
            getValue("pickupPincode")
        );


        setReviewValue(
            "reviewPickupDate",
            formatDate(getValue("pickupDate"))
        );


        /* -------------------------------------------------
           DELIVERY
        -------------------------------------------------- */

        setReviewValue(
            "reviewReceiverName",
            getValue("receiverName")
        );


        setReviewValue(
            "reviewReceiverPhone",
            getValue("receiverPhone")
        );


        setReviewValue(
            "reviewDeliveryAddress",
            getValue("deliveryAddress")
        );


        setReviewValue(
            "reviewDeliveryCity",
            getValue("deliveryCity")
        );


        setReviewValue(
            "reviewDeliveryDistrict",
            getValue("deliveryDistrict")
        );


        setReviewValue(
            "reviewDeliveryPincode",
            getValue("deliveryPincode")
        );


        /* -------------------------------------------------
           PARCEL
        -------------------------------------------------- */

        setReviewValue(
            "reviewParcelType",
            getSelectText("parcelType")
        );


        setReviewValue(
            "reviewParcelDescription",
            getValue("parcelDescription")
        );


        const weight =
            getValue("parcelWeight");


        if (weight) {

            setReviewValue(
                "reviewParcelWeight",
                `${weight} kg`
            );

        } else {

            setReviewValue(
                "reviewParcelWeight",
                "—"
            );

        }

    }


    /* =====================================================
       GET INPUT VALUE
    ====================================================== */

    function getValue(id) {

        const element = getElement(id);

        if (!element) {
            return "";
        }

        return element.value.trim();

    }


    /* =====================================================
       GET SELECTED OPTION TEXT
    ====================================================== */

    function getSelectText(id) {

        const select = getElement(id);

        if (!select || select.selectedIndex < 0) {
            return "—";
        }


        return select.options[
            select.selectedIndex
        ].text;

    }


    /* =====================================================
       SET REVIEW VALUE
    ====================================================== */

    function setReviewValue(id, value) {

        const element = getElement(id);

        if (!element) {
            return;
        }


        element.textContent =
            value || "—";

    }


    /* =====================================================
       FORMAT DATE
    ====================================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "—";
        }


        const date =
            new Date(`${dateValue}T00:00:00`);


        if (Number.isNaN(date.getTime())) {
            return dateValue;
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       CREATE TEMPORARY BOOKING REFERENCE
    ====================================================== */

    function createBookingReference() {

        const reference =
            document.getElementById(
                "bookingReference"
            );


        if (!reference) {
            return;
        }


        const randomNumber =
            Math.floor(
                100000 + Math.random() * 900000
            );


        reference.textContent =
            `SBG-${randomNumber}`;

    }


    /* =====================================================
       CONFIRM BOOKING
    ====================================================== */

    const confirmButton =
        document.querySelector(
            '#step4 .next-button'
        );


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            () => {

                updateReview();

                createBookingReference();

                showStep(5);

            }
        );

    }


    /* =====================================================
       SET MINIMUM PICKUP DATE
    ====================================================== */

    const pickupDate =
        getElement("pickupDate");


    if (pickupDate) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        pickupDate.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       ALLOW ONLY NUMBERS FOR PHONE AND PIN
    ====================================================== */

    document
        .querySelectorAll(
            'input[type="tel"], input[id*="Pincode"]'
        )
        .forEach((input) => {

            input.addEventListener(
                "input",
                () => {

                    input.value =
                        input.value.replace(
                            /[^0-9]/g,
                            ""
                        );

                }
            );

        });


    /* =====================================================
       INITIAL STEP
    ====================================================== */

    showStep(1);

});