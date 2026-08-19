/* =========================================================
   SRI SADGURU PARCEL SERVICE
   PROFILE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BASIC ELEMENTS
    ====================================================== */

    const backButton =
        document.getElementById("backButton");

    const profileAvatar =
        document.getElementById("profileAvatar");

    const changePhotoButton =
        document.getElementById("changePhotoButton");

    const profilePhotoInput =
        document.getElementById("profilePhotoInput");


    /* =====================================================
       BACK
    ====================================================== */

    if (backButton) {
        backButton.addEventListener("click", function () {

            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "dashboard.html";
            }

        });
    }


    /* =====================================================
       PROFILE PHOTO
    ====================================================== */

    if (changePhotoButton) {

        changePhotoButton.addEventListener("click", function () {
            profilePhotoInput.click();
        });

    }


    if (profilePhotoInput) {

        profilePhotoInput.addEventListener("change", function () {

            const file = profilePhotoInput.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image.");
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {

                profileAvatar.innerHTML = "";

                const image =
                    document.createElement("img");

                image.src = event.target.result;
                image.alt = "Profile photo";

                profileAvatar.appendChild(image);

                localStorage.setItem(
                    "customerProfilePhoto",
                    event.target.result
                );

            };

            reader.readAsDataURL(file);

        });

    }


    /* =====================================================
       PROFILE DATA
    ====================================================== */

    const defaultCustomer = {
        name: "Sri Customer",
        mobile: "+91 98765 43210",
        email: "customer@gmail.com",
        district: "—",
        state: "—",
        address: "—",
        customerId: "SSPS-CUST-001"
    };


    function getCustomerData() {

        const saved =
            localStorage.getItem("customerData");

        if (!saved) {
            return defaultCustomer;
        }

        try {
            return {
                ...defaultCustomer,
                ...JSON.parse(saved)
            };
        } catch (error) {
            return defaultCustomer;
        }

    }


    function saveCustomerData(data) {

        localStorage.setItem(
            "customerData",
            JSON.stringify(data)
        );

    }


    function displayCustomerData() {

        const customer = getCustomerData();

        setText("customerName", customer.name);
        setText("displayName", customer.name);
        setText("displayMobile", customer.mobile);
        setText("displayEmail", customer.email);
        setText("displayDistrict", customer.district);
        setText("displayState", customer.state);
        setText("displayAddress", customer.address);
        setText(
            "customerId",
            "Customer ID: " + customer.customerId
        );


        const initial =
            document.getElementById("avatarInitial");

        if (initial && customer.name) {
            initial.textContent =
                customer.name
                    .trim()
                    .charAt(0)
                    .toUpperCase();
        }


        /* Load saved photo */

        const savedPhoto =
            localStorage.getItem(
                "customerProfilePhoto"
            );

        if (savedPhoto && profileAvatar) {

            profileAvatar.innerHTML = "";

            const image =
                document.createElement("img");

            image.src = savedPhoto;
            image.alt = "Profile photo";

            profileAvatar.appendChild(image);

        }

    }


    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                value || "—";
        }

    }


    displayCustomerData();


    /* =====================================================
       EDIT PROFILE
    ====================================================== */

    const editProfileButton =
        document.getElementById("editProfileButton");

    const editProfileSection =
        document.getElementById("editProfileSection");

    const editProfileForm =
        document.getElementById("editProfileForm");

    const cancelEditButton =
        document.getElementById("cancelEditButton");


    function fillEditProfile() {

        const customer = getCustomerData();

        document.getElementById("editName").value =
            customer.name || "";

        document.getElementById("editMobile").value =
            customer.mobile.replace("+91 ", "") || "";

        document.getElementById("editEmail").value =
            customer.email || "";

        document.getElementById("editDistrict").value =
            customer.district === "—"
                ? ""
                : customer.district || "";

        document.getElementById("editState").value =
            customer.state === "—"
                ? ""
                : customer.state || "";

        document.getElementById("editAddress").value =
            customer.address === "—"
                ? ""
                : customer.address || "";

    }


    if (editProfileButton) {

        editProfileButton.addEventListener(
            "click",
            function () {

                fillEditProfile();

                editProfileSection.hidden = false;

                editProfileSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    if (cancelEditButton) {

        cancelEditButton.addEventListener(
            "click",
            function () {

                editProfileSection.hidden = true;

                clearProfileErrors();

            }
        );

    }


    if (editProfileForm) {

        editProfileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                clearProfileErrors();


                const name =
                    document.getElementById(
                        "editName"
                    ).value.trim();

                const mobile =
                    document.getElementById(
                        "editMobile"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "editEmail"
                    ).value.trim();

                const district =
                    document.getElementById(
                        "editDistrict"
                    ).value.trim();

                const state =
                    document.getElementById(
                        "editState"
                    ).value.trim();

                const address =
                    document.getElementById(
                        "editAddress"
                    ).value.trim();


                let valid = true;


                if (!name) {

                    showError(
                        "nameError",
                        "Please enter your name."
                    );

                    valid = false;

                }


                if (!/^[0-9]{10}$/.test(mobile)) {

                    showError(
                        "mobileError",
                        "Enter a valid 10-digit mobile number."
                    );

                    valid = false;

                }


                /*
                 * Email is optional.
                 * If entered, it must contain @gmail.com.
                 */

                if (
                    email &&
                    !/^[^\s@]+@gmail\.com$/i.test(email)
                ) {

                    showError(
                        "emailError",
                        "Enter a valid Gmail address."
                    );

                    valid = false;

                }


                if (!valid) {
                    return;
                }


                const oldData =
                    getCustomerData();


                const updatedData = {

                    ...oldData,

                    name: name,

                    mobile:
                        "+91 " + mobile,

                    email: email,

                    district:
                        district || "—",

                    state:
                        state || "—",

                    address:
                        address || "—"

                };


                saveCustomerData(updatedData);

                displayCustomerData();


                const success =
                    document.getElementById(
                        "profileSuccessMessage"
                    );

                if (success) {

                    success.hidden = false;

                    setTimeout(function () {
                        success.hidden = true;
                    }, 2500);

                }

            }
        );

    }


    function showError(id, message) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = message;
        }

    }


    function clearProfileErrors() {

        [
            "nameError",
            "mobileError",
            "emailError"
        ].forEach(function (id) {

            const element =
                document.getElementById(id);

            if (element) {
                element.textContent = "";
            }

        });

    }


    /* =====================================================
       SAVED ADDRESSES
    ====================================================== */

    const savedAddressList =
        document.getElementById(
            "savedAddressList"
        );

    const addAddressButton =
        document.getElementById(
            "addAddressButton"
        );

    const addressFormArea =
        document.getElementById(
            "addressFormArea"
        );

    const addressForm =
        document.getElementById(
            "addressForm"
        );

    const cancelAddressButton =
        document.getElementById(
            "cancelAddressButton"
        );


    function getAddresses() {

        const saved =
            localStorage.getItem(
                "savedAddresses"
            );

        if (!saved) {
            return [];
        }

        try {
            return JSON.parse(saved);
        } catch (error) {
            return [];
        }

    }


    function saveAddresses(addresses) {

        localStorage.setItem(
            "savedAddresses",
            JSON.stringify(addresses)
        );

    }


    function renderAddresses() {

        const addresses =
            getAddresses();

        savedAddressList.innerHTML = "";


        if (addresses.length === 0) {

            const empty =
                document.createElement("div");

            empty.className =
                "saved-address-card";

            empty.innerHTML = `
                <div class="address-card-content">
                    <p>
                        No saved addresses yet.
                        Add an address to make parcel booking faster.
                    </p>
                </div>
            `;

            savedAddressList.appendChild(empty);

            return;
        }


        addresses.forEach(function (address, index) {

            const card =
                document.createElement("div");

            card.className =
                "saved-address-card" +
                (address.isDefault
                    ? " default-address"
                    : "");


            card.innerHTML = `

                <div class="address-card-top">

                    <div class="address-card-title">

                        <span class="address-type">
                            ${escapeHTML(address.type)}
                        </span>

                        ${
                            address.isDefault
                                ? `<span class="default-badge">
                                    DEFAULT
                                   </span>`
                                : ""
                        }

                    </div>

                </div>


                <div class="address-card-content">

                    <p>
                        <strong>
                            ${escapeHTML(address.contactName)}
                        </strong>
                    </p>

                    <p>
                        ${escapeHTML(address.mobile)}
                    </p>

                    <p>
                        ${escapeHTML(address.fullAddress)}
                    </p>

                    <p>
                        ${escapeHTML(address.district)},
                        ${escapeHTML(address.state)}
                        - ${escapeHTML(address.pin)}
                    </p>

                </div>


                <div class="address-actions">

                    <button
                        type="button"
                        class="address-action-button"
                        data-action="edit"
                        data-index="${index}">
                        Edit
                    </button>

                    ${
                        !address.isDefault
                            ? `<button
                                type="button"
                                class="address-action-button"
                                data-action="default"
                                data-index="${index}">
                                Set Default
                               </button>`
                            : ""
                    }

                    <button
                        type="button"
                        class="address-action-button delete"
                        data-action="delete"
                        data-index="${index}">
                        Delete
                    </button>

                </div>
            `;


            savedAddressList.appendChild(card);

        });

    }


    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    renderAddresses();


    /* Add address */

    if (addAddressButton) {

        addAddressButton.addEventListener(
            "click",
            function () {

                resetAddressForm();

                addressFormArea.hidden = false;

                addressFormArea.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* Cancel address */

    if (cancelAddressButton) {

        cancelAddressButton.addEventListener(
            "click",
            function () {

                addressFormArea.hidden = true;

                resetAddressForm();

            }
        );

    }


    /* Save address */

    if (addressForm) {

        addressForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const type =
                    document.getElementById(
                        "addressType"
                    ).value;

                const contactName =
                    document.getElementById(
                        "addressContactName"
                    ).value.trim();

                const mobile =
                    document.getElementById(
                        "addressMobile"
                    ).value.trim();

                const pin =
                    document.getElementById(
                        "addressPin"
                    ).value.trim();

                const district =
                    document.getElementById(
                        "addressDistrict"
                    ).value.trim();

                const state =
                    document.getElementById(
                        "addressState"
                    ).value.trim();

                const fullAddress =
                    document.getElementById(
                        "addressFull"
                    ).value.trim();

                const isDefault =
                    document.getElementById(
                        "addressDefault"
                    ).checked;

                const error =
                    document.getElementById(
                        "addressError"
                    );


                error.textContent = "";


                if (!contactName) {

                    error.textContent =
                        "Enter contact person name.";

                    return;

                }


                if (!/^[0-9]{10}$/.test(mobile)) {

                    error.textContent =
                        "Enter a valid 10-digit mobile number.";

                    return;

                }


                if (!/^[0-9]{6}$/.test(pin)) {

                    error.textContent =
                        "Enter a valid 6-digit PIN code.";

                    return;

                }


                if (!district || !state) {

                    error.textContent =
                        "District and state are required.";

                    return;

                }


                if (!fullAddress) {

                    error.textContent =
                        "Enter the complete address.";

                    return;

                }


                let addresses =
                    getAddresses();


                const editIndex =
                    Number(
                        document.getElementById(
                            "addressEditIndex"
                        ).value
                    );


                const newAddress = {

                    type: type,

                    contactName:
                        contactName,

                    mobile:
                        "+91 " + mobile,

                    pin:
                        pin,

                    district:
                        district,

                    state:
                        state,

                    fullAddress:
                        fullAddress,

                    isDefault:
                        isDefault

                };


                /*
                 * If default is selected,
                 * remove default from all others.
                 */

                if (isDefault) {

                    addresses =
                        addresses.map(
                            function (item) {

                                return {
                                    ...item,
                                    isDefault: false
                                };

                            }
                        );

                }


                if (editIndex >= 0) {

                    addresses[editIndex] =
                        newAddress;

                } else {

                    /*
                     * First address automatically becomes
                     * default if no address exists.
                     */

                    if (addresses.length === 0) {
                        newAddress.isDefault = true;
                    }

                    addresses.push(newAddress);

                }


                saveAddresses(addresses);

                renderAddresses();

                resetAddressForm();

                addressFormArea.hidden = true;

            }
        );

    }


    /* Address buttons */

    if (savedAddressList) {

        savedAddressList.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!button) return;


                const action =
                    button.dataset.action;

                const index =
                    Number(button.dataset.index);


                if (action === "edit") {

                    editAddress(index);

                }


                if (action === "delete") {

                    deleteAddress(index);

                }


                if (action === "default") {

                    setDefaultAddress(index);

                }

            }
        );

    }


    function editAddress(index) {

        const addresses =
            getAddresses();

        const address =
            addresses[index];

        if (!address) return;


        document.getElementById(
            "addressFormTitle"
        ).textContent =
            "Edit Address";


        document.getElementById(
            "addressEditIndex"
        ).value = index;


        document.getElementById(
            "addressType"
        ).value =
            address.type;


        document.getElementById(
            "addressContactName"
        ).value =
            address.contactName;


        document.getElementById(
            "addressMobile"
        ).value =
            address.mobile.replace("+91 ", "");


        document.getElementById(
            "addressPin"
        ).value =
            address.pin;


        document.getElementById(
            "addressDistrict"
        ).value =
            address.district;


        document.getElementById(
            "addressState"
        ).value =
            address.state;


        document.getElementById(
            "addressFull"
        ).value =
            address.fullAddress;


        document.getElementById(
            "addressDefault"
        ).checked =
            address.isDefault;


        addressFormArea.hidden = false;

        addressFormArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function deleteAddress(index) {

        const addresses =
            getAddresses();


        if (!addresses[index]) return;


        const confirmed =
            confirm(
                "Are you sure you want to delete this address?"
            );


        if (!confirmed) return;


        const wasDefault =
            addresses[index].isDefault;


        addresses.splice(index, 1);


        /*
         * If the deleted address was default,
         * make the first remaining address default.
         */

        if (
            wasDefault &&
            addresses.length > 0
        ) {

            addresses[0].isDefault = true;

        }


        saveAddresses(addresses);

        renderAddresses();

    }


    function setDefaultAddress(index) {

        const addresses =
            getAddresses();


        addresses =
            addresses.map(
                function (address, currentIndex) {

                    return {
                        ...address,
                        isDefault:
                            currentIndex === index
                    };

                }
            );


        saveAddresses(addresses);

        renderAddresses();

    }


    function resetAddressForm() {

        addressForm.reset();

        document.getElementById(
            "addressEditIndex"
        ).value = "-1";


        document.getElementById(
            "addressFormTitle"
        ).textContent =
            "Add New Address";


        document.getElementById(
            "addressError"
        ).textContent = "";

    }


    /* =====================================================
       CHANGE PASSWORD
       12 + 4 RULE
    ====================================================== */

    const passwordModal =
        document.getElementById(
            "passwordModal"
        );

    const changePasswordButton =
        document.getElementById(
            "changePasswordButton"
        );

    const closePasswordModal =
        document.getElementById(
            "closePasswordModal"
        );

    const passwordModalOverlay =
        document.getElementById(
            "passwordModalOverlay"
        );

    const cancelPasswordButton =
        document.getElementById(
            "cancelPasswordButton"
        );

    const changePasswordForm =
        document.getElementById(
            "changePasswordForm"
        );

    const newPassword =
        document.getElementById(
            "newPassword"
        );

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        );

    const currentPassword =
        document.getElementById(
            "currentPassword"
        );

    const passwordError =
        document.getElementById(
            "passwordError"
        );


    const ruleLength =
        document.getElementById(
            "ruleLength"
        );

    const ruleUppercase =
        document.getElementById(
            "ruleUppercase"
        );

    const ruleNumber =
        document.getElementById(
            "ruleNumber"
        );

    const ruleSpecial =
        document.getElementById(
            "ruleSpecial"
        );


    if (changePasswordButton) {

        changePasswordButton.addEventListener(
            "click",
            function () {

                passwordModal.hidden = false;

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    function closePassword() {

        passwordModal.hidden = true;

        document.body.style.overflow = "";

        changePasswordForm.reset();

        passwordError.textContent = "";

        [
            ruleLength,
            ruleUppercase,
            ruleNumber,
            ruleSpecial
        ].forEach(function (rule) {

            rule.classList.remove("valid");

        });

    }


    if (closePasswordModal) {
        closePasswordModal.addEventListener(
            "click",
            closePassword
        );
    }

    if (cancelPasswordButton) {
        cancelPasswordButton.addEventListener(
            "click",
            closePassword
        );
    }

    if (passwordModalOverlay) {
        passwordModalOverlay.addEventListener(
            "click",
            closePassword
        );
    }


    /* Password show / hide */

    document.querySelectorAll(
        ".password-toggle"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        button.dataset.target
                    );

                if (input.type === "password") {

                    input.type = "text";
                    button.textContent = "Hide";

                } else {

                    input.type = "password";
                    button.textContent = "Show";

                }

            }
        );

    });


    /* Password rules */

    function checkPasswordRules(password) {

        const lengthValid =
            password.length >= 12;

        const uppercaseValid =
            /[A-Z]/.test(password);

        const numberValid =
            /[0-9]/.test(password);

        const specialValid =
            /[^A-Za-z0-9]/.test(password);


        updateRule(
            ruleLength,
            lengthValid
        );

        updateRule(
            ruleUppercase,
            uppercaseValid
        );

        updateRule(
            ruleNumber,
            numberValid
        );

        updateRule(
            ruleSpecial,
            specialValid
        );


        return (
            lengthValid &&
            uppercaseValid &&
            numberValid &&
            specialValid
        );

    }


    function updateRule(rule, valid) {

        if (!rule) return;

        rule.classList.toggle(
            "valid",
            valid
        );

    }


    if (newPassword) {

        newPassword.addEventListener(
            "input",
            function () {

                checkPasswordRules(
                    newPassword.value
                );

            }
        );

    }


    if (changePasswordForm) {

        changePasswordForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const current =
                    currentPassword.value.trim();

                const newPass =
                    newPassword.value;

                const confirm =
                    confirmPassword.value;


                passwordError.textContent = "";


                if (!current) {

                    passwordError.textContent =
                        "Enter your current password.";

                    return;

                }


                /*
                 * EXACT 12+4 RULE
                 */

                if (!checkPasswordRules(newPass)) {

                    passwordError.textContent =
                        "Password must contain at least 12 characters, one uppercase letter, one number, and one special character.";

                    return;

                }


                if (newPass !== confirm) {

                    passwordError.textContent =
                        "New password and confirm password do not match.";

                    return;

                }


                /*
                 * FRONTEND ONLY
                 */

                localStorage.setItem(
                    "customerPassword",
                    newPass
                );


                alert(
                    "Password updated successfully."
                );


                closePassword();

            }
        );

    }


    /* =====================================================
       CUSTOMER SUPPORT
    ====================================================== */

    const supportModal =
        document.getElementById(
            "supportModal"
        );

    const supportButton =
        document.getElementById(
            "supportButton"
        );

    const closeSupportModal =
        document.getElementById(
            "closeSupportModal"
        );

    const supportModalOverlay =
        document.getElementById(
            "supportModalOverlay"
        );


    if (supportButton) {

        supportButton.addEventListener(
            "click",
            function () {

                supportModal.hidden = false;

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    function closeSupport() {

        supportModal.hidden = true;

        document.body.style.overflow = "";

    }


    if (closeSupportModal) {
        closeSupportModal.addEventListener(
            "click",
            closeSupport
        );
    }

    if (supportModalOverlay) {
        supportModalOverlay.addEventListener(
            "click",
            closeSupport
        );
    }


    /* =====================================================
       ABOUT US
    ====================================================== */

    const aboutUsModal =
        document.getElementById(
            "aboutUsModal"
        );

    const aboutUsButton =
        document.getElementById(
            "aboutUsButton"
        );

    const closeAboutUsModal =
        document.getElementById(
            "closeAboutUsModal"
        );

    const aboutUsModalOverlay =
        document.getElementById(
            "aboutUsModalOverlay"
        );


    if (aboutUsButton) {

        aboutUsButton.addEventListener(
            "click",
            function () {

                aboutUsModal.hidden = false;

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    function closeAbout() {

        aboutUsModal.hidden = true;

        document.body.style.overflow = "";

    }


    if (closeAboutUsModal) {
        closeAboutUsModal.addEventListener(
            "click",
            closeAbout
        );
    }

    if (aboutUsModalOverlay) {
        aboutUsModalOverlay.addEventListener(
            "click",
            closeAbout
        );
    }


    /* =====================================================
       LOGOUT
    ====================================================== */

    const logoutModal =
        document.getElementById(
            "logoutModal"
        );

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );

    const cancelLogoutButton =
        document.getElementById(
            "cancelLogoutButton"
        );

    const confirmLogoutButton =
        document.getElementById(
            "confirmLogoutButton"
        );

    const logoutModalOverlay =
        document.getElementById(
            "logoutModalOverlay"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                logoutModal.hidden = false;

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    function closeLogout() {

        logoutModal.hidden = true;

        document.body.style.overflow = "";

    }


    if (cancelLogoutButton) {
        cancelLogoutButton.addEventListener(
            "click",
            closeLogout
        );
    }

    if (logoutModalOverlay) {
        logoutModalOverlay.addEventListener(
            "click",
            closeLogout
        );
    }


    if (confirmLogoutButton) {

        confirmLogoutButton.addEventListener(
            "click",
            function () {

                /*
                 * Frontend logout.
                 * Later your backend authentication/session
                 * will be cleared here.
                 */

                localStorage.removeItem(
                    "customerLoggedIn"
                );

                window.location.href =
                    "../index.html";

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            document.querySelectorAll(
                ".profile-modal"
            ).forEach(function (modal) {

                modal.hidden = true;

            });


            document.body.style.overflow = "";

        }
    );


    console.log(
        "Sri Sadguru Parcel Service profile loaded successfully."
    );

});


