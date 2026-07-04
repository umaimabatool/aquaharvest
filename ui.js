//==================================================
// ui.js
// AquaHarvest UI Engine
//==================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeUI();

});

//==================================================
// Initialize
//==================================================

function initializeUI() {

    navbarEffects();
    activeNavigation();
    searchOverlay();
    newsletterForm();
    videoControls();
    animateStats();
    pageLoader();
    lazyReveal();
    floatingElements();
    smoothButtons();

}

//==================================================
// Navbar Active Link
//==================================================

function activeNavigation() {

    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach(link => {

        const href = link.getAttribute("href");

        if (href === current) {

            link.classList.add("active");

        }

    });

}

//==================================================
// Navbar Background
//==================================================

function navbarEffects() {

    const navbar = document.querySelector(".glass-nav");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.style.background = "rgba(6,18,29,.92)";
            navbar.style.backdropFilter = "blur(25px)";
            navbar.style.padding = "12px 0";

        } else {

            navbar.style.background = "rgba(6,18,29,.65)";
            navbar.style.padding = "18px 0";

        }

    });

}

//==================================================
// Search Overlay
//==================================================

function searchOverlay() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("focus", () => {

        input.parentElement.classList.add("shadow-lg");

    });

    input.addEventListener("blur", () => {

        input.parentElement.classList.remove("shadow-lg");

    });

}

//==================================================
// Newsletter
//==================================================

function newsletterForm() {

    const button = document.querySelector("#newsletterBtn");

    if (!button) return;

    button.addEventListener("click", () => {

        const email = document.querySelector("#newsletterEmail");

        if (!email.value.trim()) {

            showToast("Enter your email", "error");

            return;

        }

        showToast("Subscribed Successfully!");

        email.value = "";

    });

}

//==================================================
// Hero Video
//==================================================

function videoControls() {

    const video = document.querySelector(".hero-video");

    if (!video) return;

    video.play().catch(() => {});

}

//==================================================
// Counter Animation
//==================================================

function animateStats() {

    const stats = document.querySelectorAll("[data-count]");

    if (!stats.length) return;

    stats.forEach(stat => {

        const target = Number(stat.dataset.count);

        let value = 0;

        const speed = Math.ceil(target / 120);

        const timer = setInterval(() => {

            value += speed;

            if (value >= target) {

                value = target;

                clearInterval(timer);

            }

            stat.innerHTML = value;

        }, 20);

    });

}

//==================================================
// Loader
//==================================================

function pageLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 800);

    });

}

//==================================================
// Reveal Elements
//==================================================

function lazyReveal() {

    const cards = document.querySelectorAll(".reveal");

    if (!cards.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    cards.forEach(card => observer.observe(card));

}

//==================================================
// Floating Animation
//==================================================

function floatingElements() {

    document.querySelectorAll(".floating").forEach((element, index) => {

        element.style.animationDuration = (4 + index % 3) + "s";

    });

}

//==================================================
// Button Click Animation
//==================================================

function smoothButtons() {

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mousedown", () => {

            button.style.transform = "scale(.96)";

        });

        button.addEventListener("mouseup", () => {

            button.style.transform = "";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}

//==================================================
// Modal Utility
//==================================================

function openModal(id) {

    const modal = new bootstrap.Modal(document.getElementById(id));

    modal.show();

}

function closeModal(id) {

    bootstrap.Modal.getInstance(document.getElementById(id)).hide();

}

//==================================================
// Copy Text
//==================================================

function copyText(text) {

    navigator.clipboard.writeText(text);

    showToast("Copied Successfully");

}

//==================================================
// Scroll To Section
//==================================================

function goTo(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth"

    });

}

//==================================================
// Export
//==================================================

window.openModal = openModal;
window.closeModal = closeModal;
window.copyText = copyText;
window.goTo = goTo;