/* =========================================================
   PAYMENT PAGE JAVASCRIPT
   Sri Sadguru Siddarooda Parcel Service
========================================================= */


/* =========================================================
   DEMO PAYMENT / ORDER DATA
   ---------------------------------------------------------
   Later this data will come from your backend/database.
   Newest orders are automatically displayed first.
========================================================= */

const paymentOrders = [

    {
        date: "2026-08-19",
        bookingId: "SBG-100245",
        trackingId: "SBGN100245",

        parcelName: "Important Documents",
        parcelType: "Document",
        parcelWeight: "0.5 kg",

        customerName: "Rajesh Kumar",
        customerPhone: "9876543210",
        customerEmail: "rajesh@gmail.com",

        receiverName: "Suresh Kumar",
        receiverPhone: "9876501234",
        receiverEmail: "suresh@gmail.com",

        pickup: "Hubballi, Karnataka",
        delivery: "Bengaluru, Karnataka",

        serviceCharge: 381,
        gst: 69,

        amount: 450,

        paymentMethod: "Not Paid",
        paymentStatus: "unpaid",

        transactionId: "",

        paymentDate: "",

        gstStatus: "Included"
    },


    {
        date: "2026-08-17",
        bookingId: "SBG-100198",
        trackingId: "SBGN100198",

        parcelName: "Food Items",
        parcelType: "Food",
        parcelWeight: "2 kg",

        customerName: "Rajesh Kumar",
        customerPhone: "9876543210",
        customerEmail: "rajesh@gmail.com",

        receiverName: "Anil Kumar",
        receiverPhone: "9988776655",
        receiverEmail: "anil@gmail.com",

        pickup: "Hubballi, Karnataka",
        delivery: "Dharwad, Karnataka",

        serviceCharge: 237,
        gst: 43,

        amount: 280,

        paymentMethod: "Google Pay",
        paymentStatus: "paid",

        transactionId: "TXN-GPAY-782451",

        paymentDate: "2026-08-17",

        gstStatus: "Paid"
    },


    {
        date: "2026-08-15",
        bookingId: "SBG-100176",
        trackingId: "SBGN100176",

        parcelName: "Books",
        parcelType: "Books",
        parcelWeight: "3 kg",

        customerName: "Rajesh Kumar",
        customerPhone: "9876543210",
        customerEmail: "rajesh@gmail.com",

        receiverName: "Mahesh Kumar",
        receiverPhone: "9123456789",
        receiverEmail: "mahesh@gmail.com",

        pickup: "Belagavi, Karnataka",
        delivery: "Hubballi, Karnataka",

        serviceCharge: 297,
        gst: 53,

        amount: 350,

        paymentMethod: "Cash on Delivery",
        paymentStatus: "cod",

        transactionId: "",

        paymentDate: "",

        gstStatus: "Payable"
    },


    {
        date: "2026-08-12",
        bookingId: "SBG-100142",
        trackingId: "SBGN100142",

        parcelName: "Medicine",
        parcelType: "Medicine",
        parcelWeight: "1 kg",

        customerName: "Rajesh Kumar",
        customerPhone: "9876543210",
        customerEmail: "rajesh@gmail.com",

        receiverName: "Prakash Kumar",
        receiverPhone: "9000012345",
        receiverEmail: "prakash@gmail.com",

        pickup: "Dharwad, Karnataka",
        delivery: "Mysuru, Karnataka",

        serviceCharge: 441,
        gst: 79,

        amount: 520,

        paymentMethod: "PhonePe",
        paymentStatus: "paid",

        transactionId: "TXN-PHONEPE-452781",

        paymentDate: "2026-08-12",

        gstStatus: "Paid"
    },


    {
        date: "2026-08-09",
        bookingId: "SBG-100121",
        trackingId: "SBGN100121",

        parcelName: "Clothing",
        parcelType: "Other",
        parcelWeight: "2.5 kg",

        customerName: "Rajesh Kumar",
        customerPhone: "9876543210",
        customerEmail: "rajesh@gmail.com",

        receiverName: "Vijay Kumar",
        receiverPhone: "9112233445",
        receiverEmail: "vijay@gmail.com",

        pickup: "Hubballi, Karnataka",
        delivery: "Chennai, Tamil Nadu",

        serviceCharge: 500,
        gst: 90,

        amount: 590,

        paymentMethod: "Pending",
        paymentStatus: "pending",

        transactionId: "",

        paymentDate: "",

        gstStatus: "Pending"
    }

];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentFilter = "all";

let currentPaymentOrder = null;

let currentReceiptOrder = null;


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializePaymentPage();

});


function initializePaymentPage() {

    sortOrdersNewestFirst();

    displayPaymentOrders();

    updatePaymentSummary();

    setupSearch();

    setupFilters();

    setupPaymentMethods();

}


/* =========================================================
   SORT ORDERS
   Newest order first
========================================================= */

function sortOrdersNewestFirst() {

    paymentOrders.sort(function (a, b) {

        return new Date(b.date) - new Date(a.date);

    });

}


/* =========================================================
   DISPLAY PAYMENT ORDERS
========================================================= */

function displayPaymentOrders() {

    const paymentList =
        document.getElementById("paymentList");

    const noPayments =
        document.getElementById("noPayments");


    if (!paymentList) {
        return;
    }


    paymentList.innerHTML = "";


    const searchInput =
        document.getElementById("paymentSearch");


    const searchValue =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const filteredOrders =
        paymentOrders.filter(function (order) {

            const matchesFilter =
                currentFilter === "all" ||
                order.paymentStatus === currentFilter;


            const matchesSearch =
                order.trackingId
                    .toLowerCase()
                    .includes(searchValue) ||

                order.bookingId
                    .toLowerCase()
                    .includes(searchValue);


            return matchesFilter && matchesSearch;

        });


    if (filteredOrders.length === 0) {

        if (noPayments) {
            noPayments.style.display = "block";
        }

        return;
    }


    if (noPayments) {
        noPayments.style.display = "none";
    }


    filteredOrders.forEach(function (order) {

        paymentList.appendChild(
            createPaymentCard(order)
        );

    });

}


/* =========================================================
   CREATE PAYMENT CARD
========================================================= */

function createPaymentCard(order) {

    const card =
        document.createElement("div");

    card.className = "payment-card";


    const statusText =
        getPaymentStatusText(
            order.paymentStatus
        );


    const statusClass =
        getPaymentStatusClass(
            order.paymentStatus
        );


    const formattedDate =
        formatDate(order.date);


    let actionButton = "";


    /* -----------------------------------------------------
       UNPAID
    ----------------------------------------------------- */

    if (order.paymentStatus === "unpaid") {

        actionButton = `

            <button
                type="button"
                class="pay-now-btn"
                onclick="openPaymentModal('${order.trackingId}')">

                Pay Now

            </button>

        `;

    }


    /* -----------------------------------------------------
       PAID
    ----------------------------------------------------- */

    else if (order.paymentStatus === "paid") {

        actionButton = `

            <button
                type="button"
                class="download-receipt-btn"
                onclick="openReceipt('${order.trackingId}')">

                Download Receipt

            </button>

        `;

    }


    /* -----------------------------------------------------
       COD
    ----------------------------------------------------- */

    else if (order.paymentStatus === "cod") {

        actionButton = `

            <button
                type="button"
                class="view-details-btn"
                onclick="openReceipt('${order.trackingId}')">

                View Details

            </button>

        `;

    }


    /* -----------------------------------------------------
       PENDING
    ----------------------------------------------------- */

    else if (order.paymentStatus === "pending") {

        actionButton = `

            <button
                type="button"
                class="pay-now-btn"
                onclick="openPaymentModal('${order.trackingId}')">

                Complete Payment

            </button>

        `;

    }


    card.innerHTML = `

        <div class="payment-card-header">

            <div>

                <div class="payment-date">
                    ${formattedDate}
                </div>

                <h3>
                    ${escapeHTML(order.trackingId)}
                </h3>

            </div>


            <span class="payment-status ${statusClass}">
                ${statusText}
            </span>

        </div>


        <div class="payment-details-grid">


            <div class="payment-detail">

                <span>
                    Booking ID
                </span>

                <strong>
                    ${escapeHTML(order.bookingId)}
                </strong>

            </div>


            <div class="payment-detail">

                <span>
                    Parcel
                </span>

                <strong>
                    ${escapeHTML(order.parcelName)}
                </strong>

            </div>


            <div class="payment-detail">

                <span>
                    Payment Method
                </span>

                <strong>
                    ${escapeHTML(order.paymentMethod)}
                </strong>

            </div>


            <div class="payment-detail">

                <span>
                    GST
                </span>

                <strong>
                    ₹${order.gst}
                </strong>

            </div>

        </div>


        <div class="payment-card-footer">


            <div class="payment-amount">

                <span>
                    Total Amount
                </span>

                <strong>
                    ₹${order.amount}
                </strong>

            </div>


            <div class="payment-actions">

                ${actionButton}

            </div>

        </div>

    `;


    return card;
}


/* =========================================================
   PAYMENT STATUS TEXT
========================================================= */

function getPaymentStatusText(status) {

    switch (status) {

        case "paid":
            return "Paid";

        case "unpaid":
            return "Unpaid";

        case "pending":
            return "Pending";

        case "cod":
            return "Cash on Delivery";

        default:
            return "Unknown";

    }

}


/* =========================================================
   PAYMENT STATUS CSS CLASS
========================================================= */

function getPaymentStatusClass(status) {

    switch (status) {

        case "paid":
            return "status-paid";

        case "unpaid":
            return "status-unpaid";

        case "pending":
            return "status-pending";

        case "cod":
            return "status-cod";

        default:
            return "";

    }

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const search =
        document.getElementById("paymentSearch");


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        function () {

            displayPaymentOrders();

        }
    );

}


/* =========================================================
   FILTERS
========================================================= */

function setupFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                displayPaymentOrders();

            }
        );

    });

}


/* =========================================================
   PAYMENT SUMMARY
========================================================= */

function updatePaymentSummary() {

    const total =
        paymentOrders.length;


    const paid =
        paymentOrders.filter(
            function (order) {

                return order.paymentStatus === "paid";

            }
        ).length;


    const unpaid =
        paymentOrders.filter(
            function (order) {

                return (
                    order.paymentStatus === "unpaid" ||
                    order.paymentStatus === "pending"
                );

            }
        ).length;


    const amountDue =
        paymentOrders
            .filter(function (order) {

                return (
                    order.paymentStatus === "unpaid" ||
                    order.paymentStatus === "pending"
                );

            })
            .reduce(function (total, order) {

                return total + order.amount;

            }, 0);


    const totalElement =
        document.getElementById(
            "totalPayments"
        );


    const paidElement =
        document.getElementById(
            "paidPayments"
        );


    const unpaidElement =
        document.getElementById(
            "unpaidPayments"
        );


    const amountElement =
        document.getElementById(
            "amountDue"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }


    if (paidElement) {
        paidElement.textContent = paid;
    }


    if (unpaidElement) {
        unpaidElement.textContent = unpaid;
    }


    if (amountElement) {

        amountElement.textContent =
            formatCurrency(amountDue);

    }

}


/* =========================================================
   OPEN PAYMENT MODAL
========================================================= */

function openPaymentModal(trackingId) {

    const order =
        paymentOrders.find(function (item) {

            return item.trackingId === trackingId;

        });


    if (!order) {

        alert(
            "Payment order could not be found."
        );

        return;
    }


    currentPaymentOrder = order;


    const modal =
        document.getElementById(
            "paymentModal"
        );


    const modalTracking =
        document.getElementById(
            "modalTrackingId"
        );


    const modalAmount =
        document.getElementById(
            "modalAmount"
        );


    if (modalTracking) {

        modalTracking.textContent =
            order.trackingId;

    }


    if (modalAmount) {

        modalAmount.textContent =
            formatCurrency(order.amount);

    }


    /* Reset payment selections */

    const paymentMethods =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );


    paymentMethods.forEach(
        function (radio) {

            radio.checked = false;

        }
    );


    hideAdditionalPaymentBoxes();


    if (modal) {

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";

    }

}


/* =========================================================
   CLOSE PAYMENT MODAL
========================================================= */

function closePaymentModal() {

    const modal =
        document.getElementById(
            "paymentModal"
        );


    if (modal) {

        modal.style.display = "none";

    }


    document.body.style.overflow = "";

    currentPaymentOrder = null;

}


/* =========================================================
   PAYMENT METHOD SELECTION
========================================================= */

function setupPaymentMethods() {

    const methods =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );


    methods.forEach(function (method) {

        method.addEventListener(
            "change",
            function () {

                hideAdditionalPaymentBoxes();


                switch (method.value) {

                    case "upi":
                    case "phonepe":
                    case "googlepay":
                    case "paytm":

                        showElement(
                            "upiPaymentBox"
                        );

                        break;


                    case "debit-card":
                    case "credit-card":

                        showElement(
                            "cardPaymentBox"
                        );

                        break;


                    case "bank-transfer":

                        showElement(
                            "bankPaymentBox"
                        );

                        break;


                    case "cod":

                        showElement(
                            "codPaymentBox"
                        );

                        break;

                }


                updatePaymentButtonText(
                    method.value
                );

            }
        );

    });

}


/* =========================================================
   HIDE ADDITIONAL PAYMENT BOXES
========================================================= */

function hideAdditionalPaymentBoxes() {

    const boxes = [

        "upiPaymentBox",

        "cardPaymentBox",

        "bankPaymentBox",

        "codPaymentBox"

    ];


    boxes.forEach(function (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.style.display =
                "none";

        }

    });

}


/* =========================================================
   SHOW ELEMENT
========================================================= */

function showElement(id) {

    const element =
        document.getElementById(id);


    if (element) {

        element.style.display =
            "block";

    }

}


/* =========================================================
   PAYMENT BUTTON TEXT
========================================================= */

function updatePaymentButtonText(method) {

    const button =
        document.getElementById(
            "confirmPaymentBtn"
        );


    if (!button) {
        return;
    }


    if (method === "cod") {

        button.textContent =
            "Confirm Cash on Delivery";

    }

    else if (method === "bank-transfer") {

        button.textContent =
            "Confirm Bank Transfer";

    }

    else {

        button.textContent =
            "Pay Now";

    }

}


/* =========================================================
   PROCESS PAYMENT
========================================================= */

function processPayment() {

    if (!currentPaymentOrder) {

        alert(
            "Please select an order first."
        );

        return;
    }


    const selectedMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!selectedMethod) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    const method =
        selectedMethod.value;


    /* =====================================================
       COD
    ===================================================== */

    if (method === "cod") {

        currentPaymentOrder.paymentMethod =
            "Cash on Delivery";

        currentPaymentOrder.paymentStatus =
            "cod";

        closePaymentModal();

        displayPaymentOrders();

        updatePaymentSummary();


        alert(
            "Cash on Delivery has been selected for this order."
        );


        return;
    }


    /* =====================================================
       UPI / PHONEPE / GOOGLE PAY / PAYTM
    ===================================================== */

    if (
        method === "upi" ||
        method === "phonepe" ||
        method === "googlepay" ||
        method === "paytm"
    ) {

        const upiInput =
            document.getElementById(
                "upiId"
            );


        if (
            upiInput &&
            upiInput.value.trim() !== ""
        ) {

            if (
                !isValidUPI(
                    upiInput.value.trim()
                )
            ) {

                alert(
                    "Please enter a valid UPI ID."
                );

                return;
            }

        }


        /*
         * DEMO PAYMENT SUCCESS
         *
         * Real application:
         * This is where your payment gateway
         * will be called.
         */

        completeDemoPayment(
            getPaymentMethodName(method)
        );


        return;
    }


    /* =====================================================
       CARD
    ===================================================== */

    if (
        method === "debit-card" ||
        method === "credit-card"
    ) {

        if (!validateCardDetails()) {

            return;
        }


        /*
         * DEMO PAYMENT SUCCESS
         *
         * Real card processing must happen
         * through a PCI-compliant payment gateway.
         */

        completeDemoPayment(
            getPaymentMethodName(method)
        );


        return;
    }


    /* =====================================================
       BANK TRANSFER
    ===================================================== */

    if (method === "bank-transfer") {

        const reference =
            document.getElementById(
                "bankReference"
            );


        if (
            !reference ||
            reference.value.trim() === ""
        ) {

            alert(
                "Please enter the bank transaction reference number."
            );

            return;
        }


        currentPaymentOrder.paymentMethod =
            "Direct Bank Transfer";

        currentPaymentOrder.paymentStatus =
            "pending";

        currentPaymentOrder.transactionId =
            reference.value.trim();

        currentPaymentOrder.paymentDate =
            getTodayDate();


        closePaymentModal();

        displayPaymentOrders();

        updatePaymentSummary();


        alert(
            "Bank transfer details submitted. Payment will be verified."
        );

    }

}


/* =========================================================
   DEMO PAYMENT SUCCESS
========================================================= */

function completeDemoPayment(methodName) {

    const transactionId =
        generateTransactionId();


    currentPaymentOrder.paymentMethod =
        methodName;


    currentPaymentOrder.paymentStatus =
        "paid";


    currentPaymentOrder.transactionId =
        transactionId;


    currentPaymentOrder.paymentDate =
        getTodayDate();


    currentPaymentOrder.gstStatus =
        "Paid";


    closePaymentModal();


    displayPaymentOrders();

    updatePaymentSummary();


    alert(
        "Payment successful!\n\n" +
        "Transaction ID: " +
        transactionId
    );


    /*
     * Automatically open the receipt
     */

    openReceipt(
        currentPaymentOrder.trackingId
    );

}


/* =========================================================
   VALIDATE UPI
========================================================= */

function isValidUPI(upiId) {

    const upiPattern =
        /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;


    return upiPattern.test(upiId);

}


/* =========================================================
   VALIDATE CARD
========================================================= */

function validateCardDetails() {

    const holder =
        document.getElementById(
            "cardHolderName"
        );


    const number =
        document.getElementById(
            "cardNumber"
        );


    const expiry =
        document.getElementById(
            "cardExpiry"
        );


    const cvv =
        document.getElementById(
            "cardCvv"
        );


    if (
        !holder ||
        holder.value.trim() === ""
    ) {

        alert(
            "Please enter the card holder name."
        );

        return false;
    }


    if (
        !number ||
        number.value.replace(/\s/g, "").length < 12
    ) {

        alert(
            "Please enter a valid card number."
        );

        return false;
    }


    if (
        !expiry ||
        !/^\d{2}\/\d{2}$/.test(
            expiry.value.trim()
        )
    ) {

        alert(
            "Please enter expiry date in MM/YY format."
        );

        return false;
    }


    if (
        !cvv ||
        !/^\d{3,4}$/.test(
            cvv.value.trim()
        )
    ) {

        alert(
            "Please enter a valid CVV."
        );

        return false;
    }


    return true;

}


/* =========================================================
   PAYMENT METHOD NAME
========================================================= */

function getPaymentMethodName(method) {

    switch (method) {

        case "phonepe":
            return "PhonePe";

        case "googlepay":
            return "Google Pay";

        case "paytm":
            return "Paytm";

        case "upi":
            return "UPI";

        case "debit-card":
            return "Debit Card";

        case "credit-card":
            return "Credit Card";

        default:
            return method;

    }

}


/* =========================================================
   OPEN RECEIPT
========================================================= */

function openReceipt(trackingId) {

    const order =
        paymentOrders.find(function (item) {

            return item.trackingId === trackingId;

        });


    if (!order) {

        alert(
            "Receipt information could not be found."
        );

        return;
    }


    currentReceiptOrder = order;


    populateReceipt(order);


    const receiptPreview =
        document.getElementById(
            "receiptPreview"
        );


    if (receiptPreview) {

        receiptPreview.style.display =
            "block";

        document.body.style.overflow =
            "hidden";

        receiptPreview.scrollTop = 0;

    }

}


/* =========================================================
   CLOSE RECEIPT
========================================================= */

function closeReceiptPreview() {

    const receiptPreview =
        document.getElementById(
            "receiptPreview"
        );


    if (receiptPreview) {

        receiptPreview.style.display =
            "none";

    }


    document.body.style.overflow = "";

}


/* =========================================================
   POPULATE A4 RECEIPT
========================================================= */

function populateReceipt(order) {


    setText(
        "receiptNumber",
        generateReceiptNumber(order)
    );


    setText(
        "receiptDate",
        formatDate(
            order.paymentDate ||
            order.date
        )
    );


    setText(
        "receiptBookingId",
        order.bookingId
    );


    setText(
        "receiptTrackingId",
        order.trackingId
    );


    /* Customer */

    setText(
        "receiptCustomerName",
        order.customerName
    );


    setText(
        "receiptCustomerPhone",
        order.customerPhone
    );


    setText(
        "receiptCustomerEmail",
        order.customerEmail || "Not provided"
    );


    /* Receiver */

    setText(
        "receiptReceiverName",
        order.receiverName
    );


    setText(
        "receiptReceiverPhone",
        order.receiverPhone
    );


    setText(
        "receiptReceiverEmail",
        order.receiverEmail || "Not provided"
    );


    /* Route */

    setText(
        "receiptPickup",
        order.pickup
    );


    setText(
        "receiptDelivery",
        order.delivery
    );


    /* Parcel */

    setText(
        "receiptParcelName",
        order.parcelName
    );


    setText(
        "receiptParcelType",
        order.parcelType
    );


    setText(
        "receiptParcelWeight",
        order.parcelWeight
    );


    /* Payment table */

    setText(
        "receiptDescription",
        order.parcelName +
        " - Parcel Delivery Service"
    );


    setText(
        "receiptTableTrackingId",
        order.trackingId
    );


    setText(
        "receiptMethod",
        order.paymentMethod
    );


    setText(
        "receiptTableAmount",
        formatCurrency(order.amount)
    );


    /* Amount */

    setText(
        "receiptServiceCharge",
        formatCurrency(order.serviceCharge)
    );


    setText(
        "receiptGST",
        formatCurrency(order.gst)
    );


    setText(
        "receiptGSTStatus",
        order.gstStatus
    );


    setText(
        "receiptAmount",
        formatCurrency(order.amount)
    );


    /* Payment information */

    setText(
        "receiptPaymentStatus",
        getPaymentStatusText(
            order.paymentStatus
        ).toUpperCase()
    );


    setText(
        "receiptPaymentMethod",
        order.paymentMethod
    );


    setText(
        "receiptTransactionId",
        order.transactionId ||
        "Not available"
    );


    /*
     * Change payment-status color
     */

    const statusElement =
        document.getElementById(
            "receiptPaymentStatus"
        );


    if (statusElement) {

        statusElement.style.color =
            getReceiptStatusColor(
                order.paymentStatus
            );

    }

}


/* =========================================================
   RECEIPT STATUS COLOR
========================================================= */

function getReceiptStatusColor(status) {

    switch (status) {

        case "paid":
            return "#15803d";

        case "unpaid":
            return "#dc2626";

        case "pending":
            return "#7c3aed";

        case "cod":
            return "#b45309";

        default:
            return "#111827";

    }

}


/* =========================================================
   DOWNLOAD RECEIPT
   ---------------------------------------------------------
   Browser print dialog allows:
   Print -> Save as PDF
========================================================= */

function downloadReceipt() {

    if (!currentReceiptOrder) {

        alert(
            "Please open a receipt first."
        );

        return;
    }


    /*
     * Open browser print dialog.
     *
     * The CSS @media print section
     * automatically makes the receipt A4.
     */

    window.print();

}


/* =========================================================
   PRINT RECEIPT
========================================================= */

function printReceipt() {

    if (!currentReceiptOrder) {

        alert(
            "Please open a receipt first."
        );

        return;
    }


    window.print();

}


/* =========================================================
   GENERATE RECEIPT NUMBER
========================================================= */

function generateReceiptNumber(order) {

    return (
        "SSR-" +
        order.bookingId.replace(
            /[^0-9]/g,
            ""
        )
    );

}


/* =========================================================
   GENERATE TRANSACTION ID
========================================================= */

function generateTransactionId() {

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    return (
        "TXN-" +
        Date.now().toString().slice(-6) +
        "-" +
        randomNumber
    );

}


/* =========================================================
   TODAY DATE
========================================================= */

function getTodayDate() {

    const date =
        new Date();


    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0")
    );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(dateString);


    if (Number.isNaN(date.getTime())) {

        return dateString;

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


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return (
        "₹" +
        Number(amount || 0).toLocaleString(
            "en-IN"
        )
    );

}


/* =========================================================
   SET TEXT SAFELY
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "—";

    }

}


/* =========================================================
   ESCAPE HTML
   Prevents unsafe text from being inserted
   into payment cards.
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   GO BACK
========================================================= */

function goBack() {

    if (window.history.length > 1) {

        window.history.back();

    } else {

        window.location.href =
            "dashboard.html";

    }

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            const modal =
                document.getElementById(
                    "paymentModal"
                );


            const receipt =
                document.getElementById(
                    "receiptPreview"
                );


            if (
                modal &&
                modal.style.display === "flex"
            ) {

                closePaymentModal();

            }


            if (
                receipt &&
                receipt.style.display === "block"
            ) {

                closeReceiptPreview();

            }

        }

    }
);


/* =========================================================
   CARD NUMBER FORMATTING
========================================================= */

const cardNumberInput =
    document.getElementById(
        "cardNumber"
    );


if (cardNumberInput) {

    cardNumberInput.addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(/\D/g, "")
                    .substring(0, 16);


            value =
                value.match(
                    /.{1,4}/g
                );


            this.value =
                value
                    ? value.join(" ")
                    : "";

        }
    );

}


/* =========================================================
   CARD EXPIRY FORMATTING
========================================================= */

const cardExpiryInput =
    document.getElementById(
        "cardExpiry"
    );


if (cardExpiryInput) {

    cardExpiryInput.addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(/\D/g, "")
                    .substring(0, 4);


            if (value.length >= 3) {

                value =
                    value.substring(0, 2) +
                    "/" +
                    value.substring(2);

            }


            this.value = value;

        }
    );

}


/* =========================================================
   CVV — NUMBERS ONLY
========================================================= */

const cardCvvInput =
    document.getElementById(
        "cardCvv"
    );


if (cardCvvInput) {

    cardCvvInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

        }
    );

}


/* =========================================================
   BANK REFERENCE
========================================================= */

const bankReference =
    document.getElementById(
        "bankReference"
    );


if (bankReference) {

    bankReference.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(
                        /[^a-zA-Z0-9-_]/g,
                        ""
                    )
                    .substring(0, 40);

        }
    );

}


/* =========================================================
   BEFORE PRINT
========================================================= */

window.addEventListener(
    "beforeprint",
    function () {

        if (!currentReceiptOrder) {

            return;

        }

    }
);


/* =========================================================
   AFTER PRINT
========================================================= */

window.addEventListener(
    "afterprint",
    function () {

        /*
         * Nothing is changed after printing.
         * User can continue using the payment page.
         */

    }
);