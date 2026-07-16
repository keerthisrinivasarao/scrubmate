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