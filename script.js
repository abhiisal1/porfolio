// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset if navbar is sticky
            const navbarHeight = document.querySelector('.navbar.sticky') ? document.querySelector('.navbar.sticky').offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10; // Added small offset

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// --- Sticky Navbar Scroll Effect (Using Classes) ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Add 'scrolled' class, CSS handles the background change
        navbar.classList.add('scrolled');
    } else {
        // Remove 'scrolled' class
        navbar.classList.remove('scrolled');
    }
});


// --- Light/Dark Mode Toggle (Simplified) ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Function to apply the theme (only toggles class and icon)
function applyTheme(theme) {
    body.classList.remove('light-mode', 'dark-mode'); // Clear previous classes
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = moonIcon; // Show moon in light mode
    } else {
        // No class needed for dark default, or add body.classList.add('dark-mode'); if preferred
        themeToggle.innerHTML = sunIcon; // Show sun in dark mode
    }
    localStorage.setItem('theme', theme);

     // Trigger scroll event slightly delayed to ensure CSS updates after theme class change
     // This helps the navbar background adjust correctly immediately after theme switch
    setTimeout(() => {
         window.dispatchEvent(new Event('scroll'));
    }, 50);
}

// Event Listener for the toggle button
themeToggle.addEventListener('click', () => {
    // Determine current theme based on class
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// Check for saved theme preference or system preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Prioritize saved theme, then system preference, default to dark
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

    // Apply the determined theme on initial load
    applyTheme(initialTheme);

    // --- Initialize AOS ---
    AOS.init({
        duration: 700, // Animation duration (ms)
        offset: 100, // Offset (in px) from the original trigger point
        once: true, // Whether animation should happen only once - while scrolling down
        easing: 'ease-in-out', // Default easing
    });

    // --- Mobile Menu Toggle (Uncomment if you add a hamburger icon) ---
    // const menuToggle = document.querySelector('.menu-toggle'); // Your hamburger button ID/Class
    // const navMenu = document.querySelector('.nav-menu');
    // if (menuToggle && navMenu) {
    //    menuToggle.addEventListener('click', () => {
    //        navMenu.classList.toggle('active'); // Toggle the .active class for display
    //        // Optional: Toggle ARIA attributes for accessibility
    //        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    //        menuToggle.setAttribute('aria-expanded', !isExpanded);
    //    });
    // }
});