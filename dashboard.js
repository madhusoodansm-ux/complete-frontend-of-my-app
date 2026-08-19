/* =========================================================
   SRI SADGURU SIDDAROODA PARCEL SERVICE
   CUSTOMER DASHBOARD JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CUSTOMER INFORMATION
    ====================================================== */

    const customerNameElement =
        document.getElementById("customerName");

    /*
       Temporary customer name for frontend testing.

       Later, when the backend/database is connected,
       this value will come from the logged-in customer.
    */

    const customerName = "Customer";

    if (customerNameElement) {
        customerNameElement.textContent =
            customerName + "!";
    }


    /* =====================================================
       TRACKING FORM
    ====================================================== */

    const trackingForm =
        document.getElementById("trackingForm");

    const trackingIdInput =
        document.getElementById("trackingId");

    const trackingMessage =
        document.getElementById("trackingMessage");


    if (trackingForm) {

        trackingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const trackingId =
                trackingIdInput.value.trim();


            /* ---------------------------------------------
               EMPTY TRACKING ID
            ---------------------------------------------- */

            if (trackingId === "") {

                trackingMessage.textContent =
                    "Please enter your tracking ID.";

                trackingIdInput.focus();

                return;
            }


            /* ---------------------------------------------
               BASIC TRACKING ID VALIDATION
            ---------------------------------------------- */

            if (trackingId.length < 4) {

                trackingMessage.textContent =
                    "Please enter a valid tracking ID.";

                trackingIdInput.focus();

                return;
            }


            /* ---------------------------------------------
               FRONTEND DEMO
            ---------------------------------------------- */

            trackingMessage.textContent =
                "Tracking parcel...";


            /*
               For now this is only frontend behavior.

               Later this section will connect to the
               backend/database and retrieve the real
               parcel tracking information.
            */

            setTimeout(function () {

                trackingMessage.textContent =
                    "Tracking ID accepted. Tracking details will be displayed here.";

            }, 700);

        });

    }


    /* =====================================================
       CLEAR TRACKING MESSAGE WHEN USER STARTS TYPING
    ====================================================== */

    if (trackingIdInput) {

        trackingIdInput.addEventListener("input", function () {

            if (trackingMessage) {
                trackingMessage.textContent = "";
            }

        });

    }


    /* =====================================================
       NOTIFICATION BUTTON
    ====================================================== */

    const notificationButton =
        document.getElementById("notificationButton");


    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            /*
               Notification page will be created later.
            */

            window.location.href =
                "notifications.html";

        });

    }


    /* =====================================================
       PROFILE BUTTON
    ====================================================== */

    const headerProfileButton =
        document.getElementById("headerProfileButton");


    if (headerProfileButton) {

        headerProfileButton.addEventListener("click", function () {

            /*
               Profile page will be created later.
            */

            window.location.href =
                "profile.html";

        });

    }


    /* =====================================================
       DASHBOARD STATISTICS
    ====================================================== */

    /*
       These values are temporary frontend demo values.

       Later they will come from the backend/database.
    */

    const dashboardData = {

        activeDeliveries: 2,

        totalOrders: 12,

        paymentDue: 450,

        deliveredOrders: 8

    };


    const activeDeliveries =
        document.getElementById("activeDeliveries");

    const totalOrders =
        document.getElementById("totalOrders");

    const paymentDue =
        document.getElementById("paymentDue");

    const deliveredOrders =
        document.getElementById("deliveredOrders");


    if (activeDeliveries) {

        activeDeliveries.textContent =
            dashboardData.activeDeliveries;

    }


    if (totalOrders) {

        totalOrders.textContent =
            dashboardData.totalOrders;

    }


    if (paymentDue) {

        paymentDue.textContent =
            "₹" + dashboardData.paymentDue;

    }


    if (deliveredOrders) {

        deliveredOrders.textContent =
            dashboardData.deliveredOrders;

    }


    /* =====================================================
       PAYMENT AMOUNT
    ====================================================== */

    const paymentAmount =
        document.getElementById("paymentAmount");


    if (paymentAmount) {

        paymentAmount.textContent =
            "₹" + dashboardData.paymentDue;

    }


    /* =====================================================
       NOTIFICATION BADGE
    ====================================================== */

    const notificationBadge =
        document.getElementById("notificationBadge");


    if (notificationBadge) {

        /*
           Temporary notification count.
           Later this will come from the database.
        */

        const notificationCount = 2;

        notificationBadge.textContent =
            notificationCount;

    }


    /* =====================================================
       BOOKING DETAILS LINKS
    ====================================================== */

    const bookingDetailLinks =
        document.querySelectorAll(".booking-details");


    bookingDetailLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            /*
               The actual parcel-details page will be
               created later.

               The tracking ID is already included in
               the URL by the HTML.
            */

            console.log(
                "Opening parcel details:",
                link.href
            );

        });

    });


    /* =====================================================
       BOTTOM NAVIGATION
    ====================================================== */

    const bottomNavigationItems =
        document.querySelectorAll(".bottom-nav-item");


    bottomNavigationItems.forEach(function (item) {

        item.addEventListener("click", function () {

            bottomNavigationItems.forEach(function (navItem) {

                navItem.classList.remove("active");

            });


            item.classList.add("active");

        });

    });


    /* =====================================================
       CONSOLE MESSAGE
    ====================================================== */

    console.log(
        "Sri Sadguru Customer Dashboard loaded successfully."
    );

});