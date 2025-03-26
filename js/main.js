//open and close popup
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.width = "100%";
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.width = "0";
    }
}

// add class to fixed header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});

// slideshow

// Object to store slide indices for multiple slideshows
const slideshowStates = {};

// Initialize all slideshows on page load
document.addEventListener("DOMContentLoaded", function () {
    const slideshows = document.getElementsByClassName("slideshow-container");
    Array.from(slideshows).forEach((slideshow, index) => {
        const slideshowId = slideshow.id || `slideshow-${index}`;
        slideshow.id = slideshowId; // Ensure each has an ID
        slideshowStates[slideshowId] = 1; // Initialize index
        showSlides(slideshowId, 1); // Show first slide
    });
});

// Move slides forward or backward
function plusSlides(n, slideshowId) {
    const currentIndex = slideshowStates[slideshowId] || 1;
    const newIndex = currentIndex + n;
    showSlides(slideshowId, newIndex);
}

// Go to specific slide
function currentSlide(n, slideshowId) {
    showSlides(slideshowId, n);
}

// Main slideshow function
function showSlides(slideshowId, n) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) {
        console.error(`Slideshow with ID ${slideshowId} not found`);
        return;
    }

    const slides = slideshow.getElementsByClassName("mySlides");
    if (slides.length === 0) {
        console.error(`No slides found in slideshow ${slideshowId}`);
        return;
    }

    // Adjust slide index if out of bounds
    let slideIndex = n;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slideshowStates[slideshowId] = slideIndex;

    // Hide all slides
    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });

    // Show current slide
    slides[slideIndex - 1].style.display = "block";
}

// expand/collapse faq
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "flex") {
            panel.style.display = "none";
        } else {
            panel.style.display = "flex";
        }
    });
}

// running number
document.addEventListener('DOMContentLoaded', () => {
    const numberDisplays = document.querySelectorAll('.numberDisplay');
    const animationDuration = 1000; // Total animation duration in milliseconds
    const intervalDuration = 50; // Initial interval between number changes in milliseconds
    const maxRandomNumber = 100; // Maximum random number to display during animation

    // Intersection Observer to detect when each element is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                startAnimation(entry.target);
                entry.target.dataset.animated = 'true'; // Mark as animated to prevent re-triggering
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Observe each number display element
    numberDisplays.forEach(display => observer.observe(display));

    function startAnimation(numberDisplay) {
        const finalNumber = parseInt(numberDisplay.dataset.finalNumber, 10); // Get the final number from data attribute
        let startTime = null;
        let animationFrame;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            // Calculate progress (0 to 1)
            const progress = Math.min(elapsed / animationDuration, 1);

            // Slow down the interval as we approach the end
            const dynamicInterval = intervalDuration * (1 + progress * 2);

            // Update the number
            if (elapsed < animationDuration) {
                // Display a random number
                const randomNumber = Math.floor(Math.random() * maxRandomNumber);
                numberDisplay.textContent = randomNumber;

                // Add animation class for visual effect
                numberDisplay.classList.remove('animate');
                void numberDisplay.offsetWidth; // Trigger reflow to restart animation
                numberDisplay.classList.add('animate');

                // Schedule the next update
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Stop at the final number
                numberDisplay.textContent = finalNumber;
                numberDisplay.classList.remove('animate');
                void numberDisplay.offsetWidth;
                numberDisplay.classList.add('animate');
                cancelAnimationFrame(animationFrame);
            }
        }

        // Start the animation
        animationFrame = requestAnimationFrame(animate);
    }
});

// slide up and fade in sentence
document.addEventListener('DOMContentLoaded', () => {
    const sentences = document.querySelectorAll('.sentence');

    // Intersection Observer to detect when each sentence is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Trigger the animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Observe each sentence
    sentences.forEach(sentence => observer.observe(sentence));
});

// back to top
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    });
});

// tabs
function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// scroll to div
function scrollToDiv(divId) {
    const element = document.getElementById(divId);
    const offset = 100; // Adjust scroll position 100px before the div
    const topPos = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: topPos, behavior: 'smooth' });
}