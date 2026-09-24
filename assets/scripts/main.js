document.addEventListener("DOMContentLoaded", () => {
	// Mobile Menu Toggle
	const hamburger = document.getElementById("hamburger");
	const navLinks = document.getElementById("navLinks");
	const navbar = document.querySelector(".navbar");
	const body = document.body;

	// Profile Dropdown Toggle for Mobile
	const profileBtn = document.querySelector(".profile-btn");
	const profileNav = document.querySelector(".profile-nav");

	// Close dropdown when clicking outside
	document.addEventListener("click", (e) => {
		if (!profileNav.contains(e.target)) {
			profileNav.classList.remove("active");
		}
	});

	// Toggle dropdown on profile button click
	if (profileBtn) {
		profileBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			profileNav.classList.toggle("active");
		});
	}

	// Navbar scroll effect
	let lastScroll = 0;
	function handleScroll() {
		const currentScroll = window.pageYOffset;
		// Always keep visible (sticky) but add scrolled style after 50px
		if (currentScroll > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
		// Force centered position at all times
		navbar.style.transform = "translateX(-50%) translateY(0)";

		lastScroll = currentScroll;
	}

	// Handle window resize
	function handleResize() {
		if (window.innerWidth > 992) {
			// Close menu when resizing to desktop
			hamburger.classList.remove("active");
			navLinks.classList.remove("active");
			body.classList.remove("menu-open");
			hamburger.setAttribute("aria-expanded", "false");
		}
	}

	// Handle click outside menu
	function handleClickOutside(event) {
		if (
			navLinks.classList.contains("active") &&
			!navLinks.contains(event.target) &&
			!hamburger.contains(event.target)
		) {
			closeMenu();
		}
	}

	// Close menu function
	function closeMenu() {
		hamburger.classList.remove("active");
		navLinks.classList.remove("active");
		body.classList.remove("menu-open");
		hamburger.setAttribute("aria-expanded", "false");
		// Accessibility: ensure nav is hidden when closed
		if (navLinks) navLinks.setAttribute("aria-hidden", "true");
	}

	// Initial check
	handleScroll();

	// Add event listeners
	window.addEventListener("scroll", handleScroll, { passive: true });
	window.addEventListener("resize", handleResize, { passive: true });
	document.addEventListener("click", handleClickOutside);

	// Mobile menu toggle
	if (hamburger && navLinks) {
		hamburger.addEventListener("click", (e) => {
			e.stopPropagation();
			const isActive = !hamburger.classList.contains("active");

			hamburger.classList.toggle("active", isActive);
			navLinks.classList.toggle("active", isActive);
			body.classList.toggle("menu-open", isActive);

			// Toggle aria-expanded for accessibility
			hamburger.setAttribute("aria-expanded", isActive);
			// Sync aria-hidden on nav links
			navLinks.setAttribute("aria-hidden", (!isActive).toString());
		});

		// Close menu when clicking on a nav link
		document.querySelectorAll(".nav-links a").forEach((link) => {
			link.addEventListener("click", () => {
				closeMenu();
			});
		});
	}

	// Prevent zoom on double-tap (mobile)
	let lastTouchEnd = 0;
	document.addEventListener(
		"touchend",
		(event) => {
			const now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		},
		false
	);

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		const href = anchor.getAttribute("href");
		if (href === "#" || href === "#!") return;

		anchor.addEventListener("click", function (e) {
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();

				// Close mobile menu if open
				if (navLinks && navLinks.classList.contains("active")) {
					closeMenu();
				}

				// Smooth scroll to target
				const headerOffset = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});

				// Update URL without adding to history
				history.pushState(null, null, href);
			}
		});
	});

	// Scroll down button
	const scrollDown = document.querySelector(".scroll-down");
	if (scrollDown) {
		scrollDown.addEventListener("click", (e) => {
			e.preventDefault();
			window.scrollTo({
				top: window.innerHeight,
				behavior: "smooth",
			});
		});
	}

	// Remove duplicate navbar logic block; handled by handleScroll above

	// Add animation classes on scroll
	const animateOnScroll = () => {
		const elements = document.querySelectorAll(".animate-on-scroll");

		elements.forEach((element) => {
			const elementPosition = element.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (elementPosition < windowHeight - 100) {
				element.classList.add("animate");
			}
		});
	};

	// Run once on page load
	animateOnScroll();

	// Run on scroll
	window.addEventListener("scroll", animateOnScroll);

	// Toggle functionality for How It Works section
	const toggleItems = document.querySelectorAll('.toggle-item');

	toggleItems.forEach(item => {
	    const header = item.querySelector('.toggle-header');
	    const content = item.querySelector('.toggle-content');
	    const icon = item.querySelector('.toggle-icon');

	    header.addEventListener('click', () => {
	        // Close all other items
	        toggleItems.forEach(otherItem => {
	            if (otherItem !== item) {
	                otherItem.classList.remove('active');
	                const otherContent = otherItem.querySelector('.toggle-content');
	                const otherIcon = otherItem.querySelector('.toggle-icon');
	                otherContent.style.maxHeight = null;
	                otherIcon.textContent = '+';
	            }
	        });

	        // Toggle current item
	        item.classList.toggle('active');

	        if (item.classList.contains('active')) {
	            content.style.maxHeight = content.scrollHeight + 'px';
	            icon.textContent = '−';
	        } else {
	            content.style.maxHeight = null;
	            icon.textContent = '+';
	        }
	    });

	    // Removed auto-open for first item
	});

	console.log("Rentify is ready!");
});
