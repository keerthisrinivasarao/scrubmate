Library
/
script.txt


"use strict";

/* =========================================================
   SCRUBMATE PAGE FLOW
   Splash → Login → Location → Home → Bookings
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const splashPage = document.getElementById("splashPage");
    const loginPage = document.getElementById("loginPage");
    const locationPage = document.getElementById("locationPage");
    const homePage = document.getElementById("homePage");
    const bookingsPage = document.getElementById("bookingsPage");
    const bottomBar = document.getElementById("bottomBar");

    const skipLoginBtn = document.querySelector(".skip-btn");

    const mobileInput = document.getElementById("mobileInput");
    const continueBtn = document.getElementById("continueBtn");
    const mobileBox = document.getElementById("mobileBox");
    const mainPage = document.getElementById("mainPage");

    const showNumber = document.getElementById("showNumber");
    const backBtn = document.getElementById("backBtn");
    const otpInputs = document.querySelectorAll(".otp-input");
    const verifyBtn = document.getElementById("verifyBtn");
    const otpBox = document.getElementById("otpBox");
    const errorMsg = document.getElementById("errorMsg");
    const resendBtn = document.getElementById("resendBtn");
    const successBox = document.getElementById("successBox");

    const currentLocationBtn =
        document.getElementById("currentLocationBtn");

    const currentButtonText =
        document.getElementById("currentButtonText");

    const manualLocationBtn =
        document.getElementById("manualLocationBtn");

    const overlay = document.getElementById("overlay");
    const locationSheet = document.getElementById("locationSheet");
    const closeSheetBtn = document.getElementById("closeSheetBtn");
    const locationForm = document.getElementById("locationForm");

    const successPopup = document.getElementById("successPopup");
    const selectedLocationText =
        document.getElementById("selectedLocationText");

    const statusMessage =
        document.getElementById("statusMessage");

    const correctOtp = "123456";

    /* =====================================================
       HIDE ALL PAGES
    ===================================================== */

    function hideAllPages() {

        document.querySelectorAll(".flow-screen").forEach(function (screen) {
            screen.classList.remove("flow-active");
            screen.style.display = "none";
        });

        document.querySelectorAll(".page").forEach(function (page) {
            page.classList.remove("active");
            page.style.display = "none";
        });
    }

    /* =====================================================
       SPLASH PAGE
    ===================================================== */

    function showSplashPage() {

        hideAllPages();

        splashPage.classList.add("flow-active");
        splashPage.style.display = "flex";

        document.body.classList.remove("main-nav-visible");

        if (bottomBar) {
            bottomBar.hidden = true;
            bottomBar.style.display = "none";
        }

        window.scrollTo(0, 0);
    }

    /* =====================================================
       LOGIN PAGE
    ===================================================== */

    function showLoginPage() {

        hideAllPages();

        loginPage.classList.add("flow-active");
        loginPage.style.display = "block";

        document.body.classList.remove("main-nav-visible");

        if (bottomBar) {
            bottomBar.hidden = true;
            bottomBar.style.display = "none";
        }

        window.scrollTo(0, 0);
    }

    /* =====================================================
       LOCATION PAGE
    ===================================================== */

    function showLocationPage() {

        hideAllPages();

        locationPage.classList.add("flow-active");
        locationPage.style.display = "block";

        document.body.classList.remove("main-nav-visible");

        if (bottomBar) {
            bottomBar.hidden = true;
            bottomBar.style.display = "none";
        }

        window.scrollTo(0, 0);
    }

    /* =====================================================
       HOME PAGE
    ===================================================== */

    function showHomePage() {

        hideAllPages();

        homePage.classList.add("active");
        homePage.style.display = "block";

        document.body.classList.add("main-nav-visible");

        if (bottomBar) {
            bottomBar.hidden = false;
            bottomBar.style.display = "flex";
        }

        updateBottomNavigation("homePage");

        window.scrollTo(0, 0);
    }

    /* =====================================================
       BOOKINGS PAGE
    ===================================================== */

    function showBookingsPage() {

        hideAllPages();

        bookingsPage.classList.add("active");
        bookingsPage.style.display = "block";

        document.body.classList.add("main-nav-visible");

        if (bottomBar) {
            bottomBar.hidden = false;
            bottomBar.style.display = "flex";
        }

        updateBottomNavigation("bookingsPage");

        window.scrollTo(0, 0);
    }

    /* Make functions available to HTML onclick attributes */

    window.showSplashPage = showSplashPage;
    window.showLoginPage = showLoginPage;
    window.showLocationPage = showLocationPage;
    window.showHomePage = showHomePage;
    window.showBookingsPage = showBookingsPage;

    /* =====================================================
       GENERAL MAIN APP PAGE OPENING
    ===================================================== */

    window.openPage = function (pageId) {

        if (pageId === "homePage") {
            showHomePage();
            return;
        }

        if (pageId === "bookingsPage") {
            showBookingsPage();
            return;
        }

        const targetPage = document.getElementById(pageId);

        if (!targetPage) {
            console.error("Page not found:", pageId);
            return;
        }

        hideAllPages();

        targetPage.classList.add("active");
        targetPage.style.display = "block";

        document.body.classList.remove("main-nav-visible");

        if (bottomBar) {
            bottomBar.hidden = true;
            bottomBar.style.display = "none";
        }

        window.scrollTo(0, 0);
    };

    /* =====================================================
       BOTTOM NAVIGATION
    ===================================================== */

    function updateBottomNavigation(pageId) {

        const bottomItems =
            document.querySelectorAll(".bottom-item");

        const bottomPill =
            document.getElementById("bottomPill");

        bottomItems.forEach(function (item) {

            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );
        });

        if (bottomPill) {

            bottomPill.style.transform =
                pageId === "bookingsPage"
                    ? "translateX(100%)"
                    : "translateX(0)";
        }
    }

    window.updateBottomNavigation =
        updateBottomNavigation;

    /* =====================================================
       MOBILE NUMBER
    ===================================================== */

    if (mobileInput && continueBtn) {

        mobileInput.addEventListener("input", function () {

            this.value =
                this.value.replace(/\D/g, "").slice(0, 10);

            continueBtn.classList.toggle(
                "active",
                this.value.length === 10
            );
        });
    }

    /* =====================================================
       CONTINUE TO OTP
    ===================================================== */

    if (continueBtn) {

        continueBtn.addEventListener("click", function () {

            if (!mobileInput || mobileInput.value.length !== 10) {

                mobileBox?.classList.remove("shake");

                if (mobileBox) {
                    void mobileBox.offsetWidth;
                    mobileBox.classList.add("shake");
                }

                mobileInput?.focus();
                return;
            }

            localStorage.setItem(
                "scrubmateMobileNumber",
                mobileInput.value
            );

            if (showNumber) {
                showNumber.textContent =
                    "+91 " + mobileInput.value;
            }

            mainPage?.classList.add("otp-open");

            if (errorMsg) {
                errorMsg.textContent = "";
            }

            if (successBox) {
                successBox.style.display = "none";
            }

            otpInputs.forEach(function (input) {
                input.value = "";
            });

            setTimeout(function () {
                otpInputs[0]?.focus();
            }, 150);
        });
    }

    /* =====================================================
       OTP BACK
    ===================================================== */

    backBtn?.addEventListener("click", function () {

        mainPage?.classList.remove("otp-open");

        if (errorMsg) {
            errorMsg.textContent = "";
        }

        if (successBox) {
            successBox.style.display = "none";
        }

        otpInputs.forEach(function (input) {
            input.value = "";
        });
    });

    /* =====================================================
       OTP AUTO MOVE
    ===================================================== */

    otpInputs.forEach(function (input, index) {

        input.addEventListener("input", function () {

            this.value =
                this.value.replace(/\D/g, "").slice(0, 1);

            if (
                this.value &&
                index < otpInputs.length - 1
            ) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", function (event) {

            if (
                event.key === "Backspace" &&
                !this.value &&
                index > 0
            ) {
                otpInputs[index - 1].focus();
            }
        });
    });

    /* =====================================================
       VERIFY OTP
    ===================================================== */

    verifyBtn?.addEventListener("click", function () {

        let enteredOtp = "";

        otpInputs.forEach(function (input) {
            enteredOtp += input.value;
        });

        if (enteredOtp.length !== 6) {

            if (errorMsg) {
                errorMsg.textContent =
                    "Please enter the 6-digit OTP.";
            }

            otpBox?.classList.remove("shake");

            if (otpBox) {
                void otpBox.offsetWidth;
                otpBox.classList.add("shake");
            }

            return;
        }

        if (enteredOtp !== correctOtp) {

            if (errorMsg) {
                errorMsg.textContent =
                    "Invalid OTP. Demo OTP is 123456.";
            }

            otpInputs.forEach(function (input) {
                input.value = "";
            });

            otpInputs[0]?.focus();
            return;
        }

        localStorage.setItem(
            "scrubmateLogin",
            "verified"
        );

        if (successBox) {
            successBox.style.display = "block";
        }

        verifyBtn.disabled = true;
        verifyBtn.textContent = "Verified ✓";

        setTimeout(function () {

            mainPage?.classList.remove("otp-open");

            showLocationPage();

        }, 700);
    });

    /* =====================================================
       RESEND OTP
    ===================================================== */

    resendBtn?.addEventListener("click", function () {

        if (errorMsg) {
            errorMsg.style.color = "#18c5c8";
            errorMsg.textContent =
                "OTP resent. Demo OTP is 123456.";
        }

        otpInputs.forEach(function (input) {
            input.value = "";
        });

        otpInputs[0]?.focus();
    });

    /* =====================================================
       SKIP LOGIN
    ===================================================== */

    skipLoginBtn?.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.setItem(
            "scrubmateLogin",
            "skipped"
        );

        showLocationPage();
    });

    /* =====================================================
       MANUAL LOCATION SHEET
    ===================================================== */

    function openLocationSheet() {

        overlay?.classList.add("show");
        locationSheet?.classList.add("show");

        document.body.style.overflow = "hidden";
    }

    function closeLocationSheet() {

        overlay?.classList.remove("show");
        locationSheet?.classList.remove("show");

        document.body.style.overflow = "";
    }

    manualLocationBtn?.addEventListener(
        "click",
        openLocationSheet
    );

    closeSheetBtn?.addEventListener(
        "click",
        closeLocationSheet
    );

    overlay?.addEventListener(
        "click",
        closeLocationSheet
    );

    /* =====================================================
       SAVE LOCATION AND OPEN HOME
    ===================================================== */

    function saveLocationAndOpenHome(locationText) {

        localStorage.setItem(
            "scrubmateLocation",
            locationText
        );

        localStorage.setItem(
            "scrubmateSelectedLocation",
            locationText
        );

        const navbarLocation =
            document.getElementById("selectedLocation");

        if (navbarLocation) {
            navbarLocation.textContent = locationText;
        }

        if (selectedLocationText) {
            selectedLocationText.textContent =
                locationText;
        }

        successPopup?.classList.add("show");

        setTimeout(function () {

            successPopup?.classList.remove("show");

            showHomePage();

        }, 800);
    }

    locationForm?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const house =
                document
                    .getElementById("houseNumber")
                    ?.value.trim() || "";

            const street =
                document
                    .getElementById("street")
                    ?.value.trim() || "";

            const landmark =
                document
                    .getElementById("landmark")
                    ?.value.trim() || "";

            const city =
                document
                    .getElementById("city")
                    ?.value.trim() || "";

            const pincode =
                document
                    .getElementById("pincode")
                    ?.value.trim() || "";

            if (
                !house ||
                !street ||
                !city ||
                !/^\d{6}$/.test(pincode)
            ) {
                alert(
                    "Enter complete address and valid 6-digit pincode."
                );

                return;
            }

            const fullAddress = [
                house,
                street,
                landmark,
                city + " - " + pincode
            ]
                .filter(Boolean)
                .join(", ");

            closeLocationSheet();
            locationForm.reset();

            saveLocationAndOpenHome(fullAddress);
        }
    );

    /* =====================================================
       CURRENT LOCATION
    ===================================================== */

    currentLocationBtn?.addEventListener(
        "click",
        function () {

            if (!navigator.geolocation) {

                alert(
                    "Geolocation is not supported."
                );

                return;
            }

            currentLocationBtn.classList.add("loading");

            if (currentButtonText) {
                currentButtonText.textContent =
                    "Getting location...";
            }

            navigator.geolocation.getCurrentPosition(

                function (position) {

                    currentLocationBtn.classList.remove(
                        "loading"
                    );

                    if (currentButtonText) {
                        currentButtonText.textContent =
                            "Use current location";
                    }

                    const locationText =
                        "Current location (" +
                        position.coords.latitude.toFixed(5) +
                        ", " +
                        position.coords.longitude.toFixed(5) +
                        ")";

                    saveLocationAndOpenHome(
                        locationText
                    );
                },

                function () {

                    currentLocationBtn.classList.remove(
                        "loading"
                    );

                    if (currentButtonText) {
                        currentButtonText.textContent =
                            "Use current location";
                    }

                    if (statusMessage) {

                        statusMessage.className =
                            "status-message show error";

                        statusMessage.textContent =
                            "Location permission denied.";
                    }
                }
            );
        }
    );

    /* =====================================================
       START APPLICATION
    ===================================================== */

    document.body.classList.remove("main-nav-visible");

    if (bottomBar) {
        bottomBar.hidden = true;
        bottomBar.style.display = "none";
    }

    showSplashPage();

    setTimeout(function () {

        showLoginPage();

    }, 3500);
});
/* ==========================================================
   SCRUBMATE AI SUPPORT CHATBOT
========================================================== */

(function () {
    "use strict";

    const CHAT_STORAGE_KEY = "scrubmateSupportChatHistory";

    function getChatElement(id) {
        return document.getElementById(id);
    }

    function getCurrentChatTime() {
        return new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function scrollChatToBottom() {
        const chatBody = getChatElement("chatBody");

        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    function saveChatHistory() {
        const chatBody = getChatElement("chatBody");

        if (!chatBody) {
            return;
        }

        localStorage.setItem(
            CHAT_STORAGE_KEY,
            chatBody.innerHTML
        );
    }

    function addChatMessage(message, sender) {
        const chatBody = getChatElement("chatBody");

        if (!chatBody) {
            console.error("chatBody element is missing.");
            return;
        }

        const messageBox = document.createElement("div");

        messageBox.className = "msg " + sender;

        if (sender === "bot") {
            const botName = document.createElement("div");

            botName.className = "bot-message-name";
            botName.textContent = "ScrubMate Assistant";

            messageBox.appendChild(botName);
        }

        const messageText = document.createElement("div");

        messageText.textContent = message;
        messageBox.appendChild(messageText);

        const messageTime = document.createElement("span");

        messageTime.className = "chat-message-time";
        messageTime.textContent = getCurrentChatTime();

        messageBox.appendChild(messageTime);
        chatBody.appendChild(messageBox);

        scrollChatToBottom();
        saveChatHistory();
    }

    function showChatTyping() {
        const chatBody = getChatElement("chatBody");

        if (!chatBody) {
            return;
        }

        const oldTyping =
            getChatElement("scrubMateTypingIndicator");

        if (oldTyping) {
            oldTyping.remove();
        }

        const typingBox = document.createElement("div");

        typingBox.id = "scrubMateTypingIndicator";
        typingBox.className = "msg bot chat-typing";

        typingBox.innerHTML =
            "<span></span>" +
            "<span></span>" +
            "<span></span>";

        chatBody.appendChild(typingBox);

        scrollChatToBottom();
    }

    function removeChatTyping() {
        const typingBox =
            getChatElement("scrubMateTypingIndicator");

        if (typingBox) {
            typingBox.remove();
        }
    }

    function readStorageArray(key) {
        try {
            const value = JSON.parse(
                localStorage.getItem(key) || "[]"
            );

            return Array.isArray(value) ? value : [];
        } catch (error) {
            return [];
        }
    }

    function getUpcomingBookings() {
        const upcomingBookings =
            readStorageArray("scrubmateUpcomingBookings");

        const paidBookings =
            readStorageArray("scrubmateBookings");

        return [
            ...upcomingBookings,
            ...paidBookings
        ];
    }

    function getSavedLocation() {
        return (
            localStorage.getItem("scrubmateSelectedLocation") ||
            localStorage.getItem("scrubmateLocation") ||
            ""
        );
    }

    function generateChatReply(userMessage) {
        const message = String(userMessage || "")
            .toLowerCase()
            .trim();

        const bookings = getUpcomingBookings();
        const savedLocation = getSavedLocation();

        if (
            message === "hi" ||
            message.includes("hello") ||
            message.includes("hey")
        ) {
            return (
                "Hello! 👋 How can I help you with " +
                "your ScrubMate service today?"
            );
        }

        if (
            message.includes("how do i book") ||
            message.includes("book a service") ||
            message.includes("new booking")
        ) {
            return (
                "Open the Home page and select a service. " +
                "Enter your name, mobile number and preferred date. " +
                "Then pay the ₹50 advance amount to confirm the booking."
            );
        }

        if (
            message.includes("booking status") ||
            message.includes("my booking") ||
            message.includes("upcoming booking")
        ) {
            if (bookings.length === 0) {
                return (
                    "You currently have no upcoming bookings. " +
                    "Select a service from the Home page to create one."
                );
            }

            const latestBooking = bookings[0];

            const serviceName =
                latestBooking.name ||
                latestBooking.serviceName ||
                "ScrubMate service";

            const bookingStatus =
                latestBooking.status ||
                latestBooking.bookingStatus ||
                latestBooking.paymentStatus ||
                "Confirmed";

            const bookingDate =
                latestBooking.date ||
                latestBooking.preferredDate ||
                "your selected date";

            return (
                "Your latest booking is " +
                serviceName +
                " for " +
                bookingDate +
                ". Current status: " +
                bookingStatus +
                "."
            );
        }

        if (message.includes("cancel")) {
            return (
                "Open the Bookings page and select your upcoming booking. " +
                "Press the Cancel button. The cancelled booking will move " +
                "to the Past tab."
            );
        }

        if (message.includes("refund")) {
            return (
                "Refund eligibility depends on the booking and cancellation " +
                "status. Keep your payment transaction ID. Approved refunds " +
                "are returned to the original payment method."
            );
        }

        if (
            message.includes("₹50") ||
            message.includes("50") ||
            message.includes("advance")
        ) {
            return (
                "ScrubMate collects a ₹50 advance payment to confirm every " +
                "service booking. The remaining service amount is shown on " +
                "the payment page."
            );
        }

        if (
            message.includes("payment failed") ||
            message.includes("money deducted") ||
            message.includes("amount deducted")
        ) {
            return (
                "Check your bank or UPI transaction history first. " +
                "If money was deducted but the booking is not confirmed, " +
                "keep the transaction ID and avoid paying again immediately."
            );
        }

        if (message.includes("payment")) {
            return (
                "You can pay the ₹50 advance using the available payment " +
                "method. After successful payment, the booking will appear " +
                "in the Bookings page."
            );
        }

        if (
            message.includes("location") ||
            message.includes("address")
        ) {
            if (savedLocation) {
                return (
                    "Your saved service location is: " +
                    savedLocation +
                    ". You can change it using the location option " +
                    "in the Home page header."
                );
            }

            return (
                "No saved location was found. Use Current Location or " +
                "Enter Location Manually on the location page."
            );
        }

        if (message.includes("otp")) {
            return (
                "Enter the six-digit OTP sent to your mobile number. " +
                "For your current demo version, the OTP is 123456."
            );
        }

        if (
            message.includes("service") ||
            message.includes("cleaning")
        ) {
            return (
                "ScrubMate provides bathroom cleaning, kitchen cleaning, " +
                "sweeping and mopping, AC service, fridge cleaning, " +
                "window cleaning, ironing, packing and other household services."
            );
        }

        if (
            message.includes("price") ||
            message.includes("cost") ||
            message.includes("charge")
        ) {
            return (
                "The price is displayed below every service card. " +
                "Select a service card to view the full details."
            );
        }

        if (
            message.includes("contact") ||
            message.includes("human") ||
            message.includes("agent")
        ) {
            return (
                "Please describe your issue with the service name, booking " +
                "date and payment status. The ScrubMate assistant will guide you."
            );
        }

        if (message.includes("thank")) {
            return (
                "You’re welcome! 😊 I’m here whenever you need help " +
                "with ScrubMate."
            );
        }

        return (
            "I can help with bookings, cancellations, ₹50 advance payments, " +
            "refunds, locations, OTP, prices and service issues. " +
            "Please describe your problem in more detail."
        );
    }

    window.openScrubMateChat = function () {
        const chatPage = document.getElementById("chatPage");

        if (!chatPage) {
            console.error(
                "chatPage section is missing from HTML."
            );

            return;
        }

        if (typeof window.openPage === "function") {
            window.openPage("chatPage");
        } else {
            document
                .querySelectorAll(".flow-screen, .page")
                .forEach(function (page) {
                    page.classList.remove(
                        "flow-active",
                        "active"
                    );

                    page.style.display = "none";
                });

            chatPage.classList.add("active");
            chatPage.style.display = "block";
        }

        const savedChat =
            localStorage.getItem(CHAT_STORAGE_KEY);

        const chatBody =
            getChatElement("chatBody");

        if (savedChat && chatBody) {
            chatBody.innerHTML = savedChat;
        }

        const bottomBar =
            document.getElementById("bottomBar");

        if (bottomBar) {
            bottomBar.hidden = true;
            bottomBar.style.display = "none";
        }

        setTimeout(function () {
            scrollChatToBottom();

            const input =
                getChatElement("chatInput");

            if (input) {
                input.focus();
            }
        }, 100);
    };

    window.sendMessage = function (event) {
        if (event) {
            event.preventDefault();
        }

        const chatInput =
            getChatElement("chatInput");

        const sendButton =
            getChatElement("chatSendButton");

        if (!chatInput) {
            console.error("chatInput element is missing.");
            return;
        }

        const userMessage =
            chatInput.value.trim();

        if (!userMessage) {
            chatInput.focus();
            return;
        }

        addChatMessage(
            userMessage,
            "user"
        );

        chatInput.value = "";

        if (sendButton) {
            sendButton.disabled = true;
        }

        showChatTyping();

        setTimeout(function () {
            removeChatTyping();

            addChatMessage(
                generateChatReply(userMessage),
                "bot"
            );

            if (sendButton) {
                sendButton.disabled = false;
            }

            chatInput.focus();
        }, 700);
    };

    window.sendQuickChatMessage = function (message) {
        const chatInput =
            getChatElement("chatInput");

        if (!chatInput) {
            return;
        }

        chatInput.value = message;

        window.sendMessage();
    };

    window.clearScrubMateChat = function () {
        const chatBody =
            getChatElement("chatBody");

        if (!chatBody) {
            return;
        }

        chatBody.innerHTML = `
            <div class="msg bot">
                <div class="bot-message-name">
                    ScrubMate Assistant
                </div>

                <div>
                    Hello! 👋 I am your ScrubMate support assistant.
                    How can I help you today?
                </div>
            </div>

            <div class="chat-quick-actions">

                <button
                    type="button"
                    onclick="sendQuickChatMessage('How do I book a service?')"
                >
                    How to book?
                </button>

                <button
                    type="button"
                    onclick="sendQuickChatMessage('How can I cancel my booking?')"
                >
                    Cancel booking
                </button>

                <button
                    type="button"
                    onclick="sendQuickChatMessage('Tell me about the ₹50 advance payment')"
                >
                    ₹50 payment
                </button>

                <button
                    type="button"
                    onclick="sendQuickChatMessage('How can I get a refund?')"
                >
                    Refund
                </button>

            </div>
        `;

        localStorage.removeItem(
            CHAT_STORAGE_KEY
        );

        scrollChatToBottom();
    };

    window.rateScrubMateSupport = function (rating) {
        const ratingMessage =
            getChatElement("supportRatingMessage");

        if (!ratingMessage) {
            return;
        }

        if (rating === "like") {
            ratingMessage.textContent =
                "Thank you for your feedback!";
        } else {
            ratingMessage.textContent =
                "Thank you. We will improve the support experience.";
        }
    };

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            const chatButton =
                document.querySelector(".chat-btn");

            if (chatButton) {
                chatButton.addEventListener(
                    "click",
                    function (event) {
                        event.preventDefault();
                        window.openScrubMateChat();
                    }
                );
            }

            const savedChat =
                localStorage.getItem(
                    CHAT_STORAGE_KEY
                );

            const chatBody =
                getChatElement("chatBody");

            if (savedChat && chatBody) {
                chatBody.innerHTML =
                    savedChat;
            }
        }
    );

})();
