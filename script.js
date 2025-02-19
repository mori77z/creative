document.addEventListener("DOMContentLoaded", function () {
    const moritzElement = document.querySelector(".moritz");
    let isFlipping = false;

    function randomChar() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function glitchText(element, originalText, duration = 300) {
        if (isFlipping) return;
        isFlipping = true;

        let scrambledText = originalText.split("").map(char => 
            char === " " ? " " : randomChar()
        ).join("");

        element.textContent = scrambledText;

        setTimeout(() => {
            element.textContent = originalText;
            isFlipping = false;
        }, duration);
    }

    // Glitch bei Scrollbewegung (> 50px Unterschied)
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;
        if (Math.abs(currentScroll - lastScrollTop) > 50) {
            glitchText(moritzElement, "Mritz Gauss");
            lastScrollTop = currentScroll;
        }
    });

// Select images and create a zoom container
const images = document.querySelectorAll(".img-container img");
const zoomedContainer = document.createElement("div");
const zoomedImage = document.createElement("img");

zoomedContainer.classList.add("zoomed-container");
zoomedImage.classList.add("zoomed-image");
zoomedContainer.appendChild(zoomedImage);
document.body.appendChild(zoomedContainer);

// Function to open zoomed image
function openZoomedImage(src) {
    zoomedImage.src = src;
    zoomedImage.classList.add("active"); // Hinzufügen der aktiven Klasse für Animation
    zoomedContainer.classList.add("active");
}

// Function to close zoomed image
function closeZoomedImage() {
    zoomedImage.classList.remove("active"); // Entfernen der aktiven Klasse
    zoomedContainer.classList.remove("active");
}

// Add event listeners to images to open in zoom
images.forEach((img) => {
    img.addEventListener("click", () => {
        openZoomedImage(img.src);
    });
});

// Close zoomed image when clicking outside the image
zoomedContainer.addEventListener("click", (e) => {
    if (e.target === zoomedContainer || e.target === zoomedImage) {
        closeZoomedImage();
    }
});

// Arrow scroll functionality for left/right arrows outside the carousel
const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");

arrowLeft.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
});

arrowRight.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});
