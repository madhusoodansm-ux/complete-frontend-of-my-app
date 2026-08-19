/* =========================================================
   SRI SADGURU PARCEL SERVICE
   CUSTOMER NOTIFICATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SAMPLE NOTIFICATION DATA
       -----------------------------------------------------
       Later, these values will come from your backend.
    ===================================================== */

    let notifications = [

        {
            id: 1,
            type: "booking",
            icon: "📦",
            title: "Parcel Booking Confirmed",
            message:
                "Your parcel booking has been successfully created. Your parcel is ready for pickup.",
            date: "2026-08-15T10:30:00",
            trackingId: "SSPS100001",
            amount: "",
            read: false,
            action: "track"
        },

        {
            id: 2,
            type: "payment",
            icon: "💳",
            title: "Payment Amount Assigned",
            message:
                "The service charge for your parcel has been assigned. Please complete the payment.",
            date: "2026-08-14T15:20:00",
            trackingId: "SSPS100002",
            amount: "₹450",
            read: false,
            action: "payment"
        },

        {
            id: 3,
            type: "delivery",
            icon: "🚚",
            title: "Parcel Picked Up",
            message:
                "Your parcel has been successfully collected from the pickup location.",
            date: "2026-08-14T11:10:00",
            trackingId: "SSPS100001",
            amount: "",
            read: true,
            action: "track"
        },

        {
            id: 4,
            type: "delivery",
            icon: "🚛",
            title: "Parcel In Transit",
            message:
                "Your parcel is currently in transit to the destination district.",
            date: "2026-08-13T18:45:00",
            trackingId: "SSPS100001",
            amount: "",
            read: true,
            action: "track"
        },

        {
            id: 5,
            type: "payment",
            icon: "✅",
            title: "Payment Successful",
            message:
                "Your payment has been received successfully. Your payment receipt is available.",
            date: "2026-08-13T14:25:00",
            trackingId: "SSPS100003",
            amount: "₹650",
            read: true,
            action: "payment"
        },

        {
            id: 6,
            type: "delivery",
            icon: "🎉",
            title: "Parcel Delivered",
            message:
                "Your parcel has been successfully delivered to the receiver.",
            date: "2026-08-12T16:40:00",
            trackingId: "SSPS100004",
            amount: "",
            read: true,
            action: "track"
        },

        {
            id: 7,
            type: "service",
            icon: "ℹ️",
            title: "Service Update",
            message:
                "Thank you for using Sri Sadguru Parcel Service. We are committed to providing safe and reliable delivery.",
            date: "2026-08-11T09:00:00",
            trackingId: "",
            amount: "",
            read: true,
            action: "none"
        }

    ];


    /* =====================================================
       HTML ELEMENTS
    ===================================================== */

    const notificationsList =
        document.getElementById("notificationsList");

    const noNotifications =
        document.getElementById("noNotifications");

    const totalNotifications =
        document.getElementById("totalNotifications");

    const unreadNotifications =
        document.getElementById("unreadNotifications");

    const paymentNotifications =
        document.getElementById("paymentNotifications");

    const deliveryNotifications =
        document.getElementById("deliveryNotifications");

    const markAllReadButton =
        document.getElementById("markAllReadButton");

    const backButton =
        document.getElementById("backButton");

    const filterButtons =
        document.querySelectorAll(".notification-filter");


    /* =====================================================
       MODAL ELEMENTS
    ===================================================== */

    const notificationModal =
        document.getElementById("notificationModal");

    const notificationModalOverlay =
        document.getElementById("notificationModalOverlay");

    const closeNotificationModal =
        document.getElementById("closeNotificationModal");

    const modalNotificationIcon =
        document.getElementById("modalNotificationIcon");

    const modalNotificationType =
        document.getElementById("modalNotificationType");

    const modalNotificationTitle =
        document.getElementById("modalNotificationTitle");

    const modalNotificationMessage =
        document.getElementById("modalNotificationMessage");

    const modalNotificationDate =
        document.getElementById("modalNotificationDate");

    const modalTrackingId =
        document.getElementById("modalTrackingId");

    const modalAmount =
        document.getElementById("modalAmount");

    const modalAmountRow =
        document.getElementById("modalAmountRow");

    const modalActionButton =
        document.getElementById("modalActionButton");


    /* =====================================================
       CURRENT FILTER
    ===================================================== */

    let currentFilter = "all";


    /* =====================================================
       LOAD SAVED READ STATUS
    ===================================================== */

    loadReadStatus();


    function loadReadStatus() {

        const savedStatus =
            localStorage.getItem(
                "sadguruNotificationReadStatus"
            );

        if (!savedStatus) {
            return;
        }

        try {

            const readStatus =
                JSON.parse(savedStatus);

            notifications.forEach(function (notification) {

                if (
                    readStatus[notification.id] !== undefined
                ) {

                    notification.read =
                        readStatus[notification.id];

                }

            });

        } catch (error) {

            console.log(
                "Notification read status could not be loaded."
            );

        }

    }


    /* =====================================================
       SAVE READ STATUS
    ===================================================== */

    function saveReadStatus() {

        const readStatus = {};

        notifications.forEach(function (notification) {

            readStatus[notification.id] =
                notification.read;

        });

        localStorage.setItem(
            "sadguruNotificationReadStatus",
            JSON.stringify(readStatus)
        );

    }


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(dateString) {

        const date =
            new Date(dateString);

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
       FORMAT TIME
    ===================================================== */

    function formatTime(dateString) {

        const date =
            new Date(dateString);

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =====================================================
       GET TYPE NAME
    ===================================================== */

    function getTypeName(type) {

        const typeNames = {

            booking: "Booking",

            delivery: "Delivery",

            payment: "Payment",

            service: "Service"

        };

        return (
            typeNames[type] ||
            "Notification"
        );

    }


    /* =====================================================
       UPDATE SUMMARY
    ===================================================== */

    function updateSummary() {

        const total =
            notifications.length;

        const unread =
            notifications.filter(
                function (notification) {
                    return !notification.read;
                }
            ).length;

        const payments =
            notifications.filter(
                function (notification) {
                    return notification.type === "payment";
                }
            ).length;

        const deliveries =
            notifications.filter(
                function (notification) {
                    return notification.type === "delivery";
                }
            ).length;


        totalNotifications.textContent =
            total;

        unreadNotifications.textContent =
            unread;

        paymentNotifications.textContent =
            payments;

        deliveryNotifications.textContent =
            deliveries;


        if (unread === 0) {

            markAllReadButton.textContent =
                "All notifications read";

        } else {

            markAllReadButton.textContent =
                "Mark all as read";

        }

    }


    /* =====================================================
       FILTER NOTIFICATIONS
    ===================================================== */

    function getFilteredNotifications() {

        let filtered =
            [...notifications];


        if (currentFilter === "unread") {

            filtered =
                filtered.filter(
                    function (notification) {
                        return !notification.read;
                    }
                );

        } else if (
            currentFilter !== "all"
        ) {

            filtered =
                filtered.filter(
                    function (notification) {
                        return (
                            notification.type ===
                            currentFilter
                        );
                    }
                );

        }


        /* Newest first */

        filtered.sort(
            function (a, b) {

                return (
                    new Date(b.date) -
                    new Date(a.date)
                );

            }
        );


        return filtered;

    }


    /* =====================================================
       DISPLAY NOTIFICATIONS
    ===================================================== */

    function displayNotifications() {

        const filteredNotifications =
            getFilteredNotifications();


        notificationsList.innerHTML = "";


        if (
            filteredNotifications.length === 0
        ) {

            noNotifications.style.display =
                "flex";

            return;

        }


        noNotifications.style.display =
            "none";


        filteredNotifications.forEach(
            function (notification) {

                const card =
                    createNotificationCard(
                        notification
                    );

                notificationsList.appendChild(
                    card
                );

            }
        );

    }


    /* =====================================================
       CREATE NOTIFICATION CARD
    ===================================================== */

    function createNotificationCard(
        notification
    ) {

        const card =
            document.createElement("article");


        card.className =
            "notification-card";


        if (!notification.read) {

            card.classList.add("unread");

        }


        const icon =
            document.createElement("div");

        icon.className =
            "notification-icon " +
            notification.type;

        icon.textContent =
            notification.icon;


        const content =
            document.createElement("div");

        content.className =
            "notification-content";


        const topRow =
            document.createElement("div");

        topRow.className =
            "notification-top-row";


        const title =
            document.createElement("h3");

        title.className =
            "notification-title";

        title.textContent =
            notification.title;


        const time =
            document.createElement("span");

        time.className =
            "notification-time";

        time.textContent =
            formatDate(notification.date) +
            " • " +
            formatTime(notification.date);


        topRow.appendChild(title);

        topRow.appendChild(time);


        const message =
            document.createElement("p");

        message.className =
            "notification-message";

        message.textContent =
            notification.message;


        const meta =
            document.createElement("div");

        meta.className =
            "notification-meta";


        const type =
            document.createElement("span");

        type.className =
            "notification-type";

        type.textContent =
            getTypeName(notification.type);


        meta.appendChild(type);


        if (notification.trackingId) {

            const tracking =
                document.createElement("span");

            tracking.className =
                "notification-tracking";

            tracking.textContent =
                "Tracking ID: " +
                notification.trackingId;

            meta.appendChild(tracking);

        }


        content.appendChild(topRow);

        content.appendChild(message);

        content.appendChild(meta);


        /* Unread indicator */

        if (!notification.read) {

            const unreadDot =
                document.createElement("span");

            unreadDot.className =
                "unread-dot";

            unreadDot.setAttribute(
                "aria-label",
                "Unread"
            );

            card.appendChild(unreadDot);

        }


        /* View button */

        const action =
            document.createElement("div");

        action.className =
            "notification-action";


        const viewButton =
            document.createElement("button");

        viewButton.type =
            "button";

        viewButton.className =
            "notification-view-button";

        viewButton.textContent =
            "View";


        viewButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openNotification(
                    notification.id
                );

            }
        );


        action.appendChild(
            viewButton
        );


        card.appendChild(icon);

        card.appendChild(content);

        card.appendChild(action);


        /* Click notification */

        card.addEventListener(
            "click",
            function () {

                openNotification(
                    notification.id
                );

            }
        );


        return card;

    }


    /* =====================================================
       OPEN NOTIFICATION
    ===================================================== */

    function openNotification(
        notificationId
    ) {

        const notification =
            notifications.find(
                function (item) {
                    return item.id === notificationId;
                }
            );


        if (!notification) {
            return;
        }


        /* Mark as read */

        notification.read = true;

        saveReadStatus();

        updateSummary();


        /* Fill modal */

        modalNotificationIcon.textContent =
            notification.icon;

        modalNotificationIcon.className =
            "modal-notification-icon";


        modalNotificationType.textContent =
            getTypeName(notification.type);


        modalNotificationTitle.textContent =
            notification.title;


        modalNotificationMessage.textContent =
            notification.message;


        modalNotificationDate.textContent =
            formatDate(notification.date) +
            " • " +
            formatTime(notification.date);


        if (notification.trackingId) {

            modalTrackingId.textContent =
                notification.trackingId;

        } else {

            modalTrackingId.textContent =
                "Not applicable";

        }


        if (notification.amount) {

            modalAmountRow.style.display =
                "flex";

            modalAmount.textContent =
                notification.amount;

        } else {

            modalAmountRow.style.display =
                "none";

        }


        /* Action button */

        if (
            notification.action ===
            "payment"
        ) {

            modalActionButton.textContent =
                "Go to Payment";

            modalActionButton.style.display =
                "block";

        } else if (
            notification.action ===
            "track"
        ) {

            modalActionButton.textContent =
                "Track Parcel";

            modalActionButton.style.display =
                "block";

        } else {

            modalActionButton.style.display =
                "none";

        }


        modalActionButton.onclick =
            function () {

                handleNotificationAction(
                    notification
                );

            };


        notificationModal.style.display =
            "flex";

        document.body.style.overflow =
            "hidden";


        displayNotifications();

    }


    /* =====================================================
       NOTIFICATION ACTION
    ===================================================== */

    function handleNotificationAction(
        notification
    ) {

        if (
            notification.action ===
            "payment"
        ) {

            window.location.href =
                "payment.html";

            return;

        }


        if (
            notification.action ===
            "track"
        ) {

            window.location.href =
                "track-parcel.html";

            return;

        }

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        notificationModal.style.display =
            "none";

        document.body.style.overflow =
            "";

    }


    closeNotificationModal.addEventListener(
        "click",
        closeModal
    );


    notificationModalOverlay.addEventListener(
        "click",
        closeModal
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                notificationModal.style.display !==
                "none"
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       MARK ALL AS READ
    ===================================================== */

    markAllReadButton.addEventListener(
        "click",
        function () {

            notifications.forEach(
                function (notification) {

                    notification.read = true;

                }
            );


            saveReadStatus();

            updateSummary();

            displayNotifications();

        }
    );


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter;


                    displayNotifications();

                }
            );

        }
    );


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    backButton.addEventListener(
        "click",
        function () {

            if (
                document.referrer &&
                document.referrer.indexOf(
                    window.location.hostname
                ) !== -1
            ) {

                window.history.back();

            } else {

                window.location.href =
                    "dashboard.html";

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    updateSummary();

    displayNotifications();

});

