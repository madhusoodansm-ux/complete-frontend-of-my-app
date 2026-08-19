/* =====================================================
   TRACK PARCEL PAGE
   Sri Sadguru Parcel Service
===================================================== */


/* =====================================================
   DEMO PARCEL DATA
   Temporary frontend data only.
   Later this will come from your backend/database.
===================================================== */

const parcelData = {

    "SBG-100245": {
        bookingId: "SBG-100245",
        parcelName: "Birthday Gift",
        parcelType: "Gifts",
        weight: "2 kg",
        pickupLocation: "Bengaluru",
        deliveryLocation: "Mysuru",
        pickupDate: "19 Aug 2026",
        expectedDelivery: "21 Aug 2026",
        status: "in-transit",
        statusText: "In Transit",
        statusMessage:
            "Your parcel is currently on the way to the destination."
    },

    "SBG-100244": {
        bookingId: "SBG-100244",
        parcelName: "Important Documents",
        parcelType: "Document",
        weight: "0.5 kg",
        pickupLocation: "Hubballi",
        deliveryLocation: "Bengaluru",
        pickupDate: "18 Aug 2026",
        expectedDelivery: "19 Aug 2026",
        status: "delivered",
        statusText: "Delivered",
        statusMessage:
            "Your parcel has been successfully delivered."
    },

    "SBG-100243": {
        bookingId: "SBG-100243",
        parcelName: "Medicine",
        parcelType: "Medicine",
        weight: "1 kg",
        pickupLocation: "Dharwad",
        deliveryLocation: "Bengaluru",
        pickupDate: "17 Aug 2026",
        expectedDelivery: "19 Aug 2026",
        status: "out-for-delivery",
        statusText: "Out for Delivery",
        statusMessage:
            "Your parcel is out for delivery and will reach the receiver soon."
    },

    "SBG-100242": {
        bookingId: "SBG-100242",
        parcelName: "Electronics",
        parcelType: "Electronics",
        weight: "3 kg",
        pickupLocation: "Bengaluru",
        deliveryLocation: "Ballari",
        pickupDate: "15 Aug 2026",
        expectedDelivery: "18 Aug 2026",
        status: "cancelled",
        statusText: "Cancelled",
        statusMessage:
            "This parcel booking was cancelled."
    },

    "SBG-100241": {
        bookingId: "SBG-100241",
        parcelName: "Books",
        parcelType: "Books",
        weight: "2.5 kg",
        pickupLocation: "Mysuru",
        deliveryLocation: "Bengaluru",
        pickupDate: "12 Aug 2026",
        expectedDelivery: "15 Aug 2026",
        status: "not-delivered",
        statusText: "Not Delivered",
        statusMessage:
            "Delivery is currently pending for this parcel."
    }

};


/* =====================================================
   DOM ELEMENTS
===================================================== */

const trackingForm =
    document.getElementById("trackingForm");

const trackingIdInput =
    document.getElementById("trackingId");

const trackingError =
    document.getElementById("trackingError");

const trackingResult =
    document.getElementById("trackingResult");

const orderHistoryList =
    document.getElementById("orderHistoryList");

const noHistoryMessage =
    document.getElementById("noHistoryMessage");

const closeTrackingResult =
    document.getElementById("closeTrackingResult");

const historyFilters =
    document.querySelectorAll(".history-filter");

const orderCards =
    document.querySelectorAll(".order-card");

const viewOrderButtons =
    document.querySelectorAll(".view-order-button");


/* =====================================================
   TRACKING RESULT ELEMENTS
===================================================== */

const currentStatus =
    document.getElementById("currentStatus");

const statusBadge =
    document.getElementById("statusBadge");

const statusMessage =
    document.getElementById("statusMessage");

const displayBookingId =
    document.getElementById("displayBookingId");

const displayParcelName =
    document.getElementById("displayParcelName");

const displayParcelType =
    document.getElementById("displayParcelType");

const displayWeight =
    document.getElementById("displayWeight");

const displayPickupLocation =
    document.getElementById("displayPickupLocation");

const displayDeliveryLocation =
    document.getElementById("displayDeliveryLocation");

const displayPickupDate =
    document.getElementById("displayPickupDate");

const displayExpectedDelivery =
    document.getElementById("displayExpectedDelivery");

const routePickup =
    document.getElementById("routePickup");

const routeDelivery =
    document.getElementById("routeDelivery");


/* =====================================================
   TRACKING FORM
===================================================== */

if (trackingForm) {

    trackingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const enteredId =
            trackingIdInput.value.trim().toUpperCase();


        /* Clear previous error */

        trackingError.textContent = "";
        trackingError.style.display = "none";


        /* Check empty input */

        if (enteredId === "") {

            showTrackingError(
                "Please enter your Tracking or Booking ID."
            );

            return;
        }


        /* Search parcel */

        const parcel =
            parcelData[enteredId];


        if (!parcel) {

            showTrackingError(
                "Parcel not found. Please check your Tracking or Booking ID."
            );

            trackingResult.style.display = "none";

            return;
        }


        /* Display parcel */

        displayTrackingResult(parcel);

    });

}


/* =====================================================
   SHOW TRACKING ERROR
===================================================== */

function showTrackingError(message) {

    trackingError.textContent = message;
    trackingError.style.display = "block";

}


/* =====================================================
   DISPLAY TRACKING RESULT
===================================================== */

function displayTrackingResult(parcel) {

    /* Hide error */

    trackingError.textContent = "";
    trackingError.style.display = "none";


    /* Basic information */

    displayBookingId.textContent =
        parcel.bookingId;

    displayParcelName.textContent =
        parcel.parcelName;

    displayParcelType.textContent =
        parcel.parcelType;

    displayWeight.textContent =
        parcel.weight;

    displayPickupLocation.textContent =
        parcel.pickupLocation;

    displayDeliveryLocation.textContent =
        parcel.deliveryLocation;

    displayPickupDate.textContent =
        parcel.pickupDate;

    displayExpectedDelivery.textContent =
        parcel.expectedDelivery;


    /* Current status */

    currentStatus.textContent =
        parcel.statusText;

    statusBadge.textContent =
        parcel.statusText;

    statusMessage.textContent =
        parcel.statusMessage;


    /* Route */

    routePickup.textContent =
        parcel.pickupLocation;

    routeDelivery.textContent =
        parcel.deliveryLocation;


    /* Update status badge */

    updateStatusBadge(parcel.status);


    /* Update timeline */

    updateTimeline(parcel.status);


    /* Show tracking result */

    trackingResult.style.display = "flex";


    /* Scroll to result */

    setTimeout(function () {

        trackingResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =====================================================
   UPDATE STATUS BADGE
===================================================== */

function updateStatusBadge(status) {

    statusBadge.className = "status-badge";


    switch (status) {

        case "in-transit":

            statusBadge.classList.add(
                "status-in-transit"
            );

            break;


        case "delivered":

            statusBadge.classList.add(
                "status-delivered"
            );

            break;


        case "out-for-delivery":

            statusBadge.classList.add(
                "status-out-for-delivery"
            );

            break;


        case "not-delivered":

            statusBadge.classList.add(
                "status-not-delivered"
            );

            break;


        case "cancelled":

            statusBadge.classList.add(
                "status-cancelled"
            );

            break;

    }

}


/* =====================================================
   UPDATE TRACKING TIMELINE
===================================================== */

function updateTimeline(status) {

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    /* Reset all timeline items */

    timelineItems.forEach(function (item) {

        item.classList.remove(
            "completed",
            "active"
        );

    });


    /*
       Timeline order:
       0 = Booking Confirmed
       1 = Pickup Scheduled
       2 = Parcel Picked Up
       3 = In Transit
       4 = Out for Delivery
       5 = Delivered
    */

    let currentStep = 3;


    switch (status) {

        case "in-transit":

            currentStep = 3;

            break;


        case "out-for-delivery":

            currentStep = 4;

            break;


        case "delivered":

            currentStep = 5;

            break;


        case "not-delivered":

            currentStep = 3;

            break;


        case "cancelled":

            currentStep = 0;

            break;

    }


    timelineItems.forEach(function (item, index) {

        if (status === "cancelled") {

            if (index === 0) {

                item.classList.add("completed");

            }

        } else {

            if (index < currentStep) {

                item.classList.add("completed");

            }

            if (index === currentStep) {

                item.classList.add("active");

            }

        }

    });


    /*
       Change timeline icons
    */

    timelineItems.forEach(function (item) {

        const icon =
            item.querySelector(".timeline-icon");

        if (!icon) {
            return;
        }

        if (item.classList.contains("completed")) {

            icon.textContent = "✓";

        } else if (item.classList.contains("active")) {

            icon.textContent = "●";

        } else {

            icon.textContent = "○";

        }

    });

}


/* =====================================================
   ORDER HISTORY FILTERS
===================================================== */

historyFilters.forEach(function (filterButton) {

    filterButton.addEventListener(
        "click",
        function () {

            /* Remove active from all */

            historyFilters.forEach(function (button) {

                button.classList.remove("active");

            });


            /* Add active to selected */

            filterButton.classList.add("active");


            /* Get selected filter */

            const filter =
                filterButton.dataset.filter;


            filterOrderHistory(filter);

        }
    );

});


/* =====================================================
   FILTER ORDER HISTORY
===================================================== */

function filterOrderHistory(filter) {

    let visibleOrders = 0;


    orderCards.forEach(function (card) {

        const status =
            card.dataset.status;


        const shouldShow =
            filter === "all" ||
            filter === "recent" ||
            status === filter;


        if (shouldShow) {

            card.style.display = "block";

            visibleOrders++;

        } else {

            card.style.display = "none";

        }

    });


    /*
       Recent means the latest orders.
       Since the HTML is already arranged
       newest → oldest, all orders are shown
       in that same order.
    */


    if (visibleOrders === 0) {

        noHistoryMessage.style.display =
            "block";

    } else {

        noHistoryMessage.style.display =
            "none";

    }

}


/* =====================================================
   ORDER HISTORY TRACK BUTTONS
===================================================== */

viewOrderButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const trackingId =
                button.dataset.trackingId;


            if (!trackingId) {
                return;
            }


            const parcel =
                parcelData[trackingId];


            if (!parcel) {

                showTrackingError(
                    "Tracking information is not available."
                );

                return;
            }


            /* Put ID into search box */

            trackingIdInput.value =
                trackingId;


            /* Display result */

            displayTrackingResult(parcel);

        }
    );

});


/* =====================================================
   CLOSE TRACKING RESULT
===================================================== */

if (closeTrackingResult) {

    closeTrackingResult.addEventListener(
        "click",
        function () {

            trackingResult.style.display =
                "none";


            /* Clear search */

            trackingIdInput.value = "";


            /* Scroll back to history */

            document.querySelector(
                ".order-history-section"
            ).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* =====================================================
   INITIAL PAGE STATE
===================================================== */

/*
   Recent is selected by default.

   The HTML order is already arranged:
   newest → oldest.

   Therefore Recent initially displays
   the latest orders.
*/

filterOrderHistory("recent");


/* =====================================================
   ENTER KEY SUPPORT
===================================================== */

if (trackingIdInput) {

    trackingIdInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                trackingForm.dispatchEvent(
                    new Event("submit")
                );

            }

        }
    );

}


/* =====================================================
   DEMO INFORMATION
===================================================== */

/*
   IMPORTANT:

   The parcel information above is only demo data
   for frontend development.

   Later, when your backend/database is ready,
   parcelData will be replaced with real customer
   booking and tracking data from your backend API.
*/