document.addEventListener("DOMContentLoaded", function () {
	// DOM Elements
	const signInForm = document.getElementById("signin-form");
	const signUpForm = document.getElementById("signup-form");
	const authTabs = document.querySelectorAll(".auth-tab");
	const switchFormLinks = document.querySelectorAll(".switch-form");
	const passwordInputs = document.querySelectorAll('input[type="password"]');
	const togglePasswordBtns = document.querySelectorAll(".toggle-password");
	const signUpPassword = document.getElementById("signup-password");
	const passwordStrengthBars = document.querySelectorAll(".strength-bar");
	const passwordStrengthText = document.querySelector(".strength-text");

	// Toggle between sign in and sign up forms
	function switchForm(formType) {
		// Update active tab
		authTabs.forEach((tab) => {
			if (tab.dataset.tab === formType) {
				tab.classList.add("active");
			} else {
				tab.classList.remove("active");
			}
		});

		// Update indicator position
		const indicator = document.querySelector(".tab-indicator");
		if (formType === "signin") {
			indicator.style.transform = "translateX(0)";
			indicator.style.background =
				"linear-gradient(135deg, #f7971e 0%, #ffd200 100%)";
		} else {
			indicator.style.transform = "translateX(calc(100% - 4px))";
			indicator.style.background =
				"linear-gradient(135deg, #ffd200 0%, #f7971e 100%)";
		}

		// Show/hide forms with animation
		if (formType === "signin") {
			signInForm.classList.add("active");
			signUpForm.classList.remove("active");
		} else {
			signUpForm.classList.add("active");
			signInForm.classList.remove("active");
		}
	}

	// Toggle password visibility
	function togglePasswordVisibility(input, button) {
		const type =
			input.getAttribute("type") === "password" ? "text" : "password";
		input.setAttribute("type", type);
		const icon = button.querySelector("i");
		icon.classList.toggle("fa-eye");
		icon.classList.toggle("fa-eye-slash");
	}

	// Check password strength
	function checkPasswordStrength(password) {
		let strength = 0;
		const strengthText = ["Weak", "Fair", "Strong"];

		// Check length
		if (password.length >= 8) strength++;

		// Check for numbers
		if (/\d/.test(password)) strength++;

		// Check for special characters
		if (/[!@#$%^&*(),.?\":{}|<>]/.test(password)) strength++;

		// Update strength meter
		if (passwordStrengthBars && passwordStrengthBars.length > 0) {
			passwordStrengthBars.forEach((bar, index) => {
				if (index < strength) {
					bar.style.background = getStrengthColor(strength);
				} else {
					bar.style.background = "rgba(255, 255, 255, 0.1)";
				}
			});

			// Update strength text
			if (password.length === 0) {
				passwordStrengthText.textContent = "Password strength";
				passwordStrengthText.style.color = "rgba(255, 255, 255, 0.5)";
			} else {
				const strengthIndex = Math.min(strength - 1, 2);
				passwordStrengthText.textContent =
					strengthText[strengthIndex] || "Weak";
				passwordStrengthText.style.color = getStrengthColor(strength);
			}
		}
	}

	// Get color based on password strength
	function getStrengthColor(strength) {
		const colors = {
			1: "#ff4d4f", // Red for weak
			2: "#faad14", // Orange for medium
			3: "#52c41a", // Green for strong
		};
		return colors[strength] || "#ff4d4f";
	}

	// Form validation
	function validateForm(form) {
		let isValid = true;
		const inputs = form.querySelectorAll("input[required]");

		// For fake auth, we'll just check if the fields are not empty
		inputs.forEach((input) => {
			if (!input.value.trim()) {
				isValid = false;
				input.classList.add("error");
			} else {
				input.classList.remove("error");
			}
		});

		return isValid;
	}

	// Show notification
	function showNotification(message, type = "info") {
		// Create notification element if it doesn't exist
		let notification = document.querySelector(".notification");
		if (!notification) {
			notification = document.createElement("div");
			notification.className = "notification";
			document.body.appendChild(notification);
		}

		notification.textContent = message;
		notification.className = `notification show ${type}`;

		// Auto-hide after 3 seconds
		setTimeout(() => {
			notification.classList.remove("show");
		}, 3000);
	}

	// Redirect after login
	function redirectAfterLogin() {
		const redirectTo = localStorage.getItem("redirectAfterLogin");
		if (redirectTo) {
			localStorage.removeItem("redirectAfterLogin");
			window.location.href = redirectTo;
		} else {
			// Redirect to onboarding page after login
			window.location.href = "onboarding.html";
		}
	}

	// Handle form submission
	function handleSubmit(e, formType) {
		e.preventDefault();
		const form = e.target;
		const submitBtn = form.querySelector('button[type="submit"]');
		const originalBtnText = submitBtn.innerHTML;

		// Show loading state
		submitBtn.disabled = true;
		submitBtn.innerHTML =
			'<i class="fas fa-spinner fa-spin"></i> Processing...';

		// Get form values
		const email = form.querySelector('input[type="email"]').value.trim();
		const password = form
			.querySelector('input[type="password"]')
			.value.trim();

		setTimeout(() => {
			try {
				// Check if email and password are not empty
				if (!email || !password) {
					throw new Error("Please enter both email and password");
				}

				if (formType === "Sign up") {
					// Handle sign up
					const users = JSON.parse(
						localStorage.getItem("rentifyUsers") || "{}"
					);
					const userId = "user_" + Date.now();

					users[userId] = {
						id: userId,
						email,
						// In a real app, never store passwords in localStorage
						// This is just for demo purposes
						password: btoa(password), // Simple encoding, not secure for production
						createdAt: new Date().toISOString(),
					};

					localStorage.setItem("rentifyUsers", JSON.stringify(users));

					// Set authentication state
					localStorage.setItem("isAuthenticated", "true");
					localStorage.setItem(
						"currentUser",
						JSON.stringify({
							id: userId,
							email: email,
							name: email.split("@")[0],
						})
					);

					showNotification(
						"Account created successfully!",
						"success"
					);
				} else {
					// Handle sign in - for demo, any non-empty email/password will work
					localStorage.setItem("isAuthenticated", "true");
					localStorage.setItem(
						"currentUser",
						JSON.stringify({
							id: "demo_user",
							email: email,
							name: email.split("@")[0],
						})
					);
					showNotification("Sign in successful!", "success");
					redirectAfterLogin();
				}

				// Redirect to onboarding page after a short delay
				setTimeout(() => {
					window.location.href = "onboarding.html";
				}, 1000);
			} catch (error) {
				showNotification(error.message || "An error occurred", "error");
				submitBtn.disabled = false;
				submitBtn.innerHTML = originalBtnText;
			}
		}, 1000);
	}

	// Event Listeners
	authTabs.forEach((tab) => {
		tab.addEventListener("click", () => switchForm(tab.dataset.tab));
	});

	switchFormLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			switchForm(link.dataset.tab);
			// Scroll to top of form
			document
				.querySelector(".auth-container")
				.scrollIntoView({ behavior: "smooth" });
		});
	});

	togglePasswordBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const input = btn
				.closest(".input-with-icon")
				.querySelector("input");
			togglePasswordVisibility(input, btn);
		});
	});

	// Password strength checker
	if (signUpPassword) {
		signUpPassword.addEventListener("input", (e) => {
			checkPasswordStrength(e.target.value);
		});
	}

	// Form submissions
	if (signInForm) {
		signInForm.addEventListener("submit", (e) =>
			handleSubmit(e, "Sign in")
		);
	}

	if (signUpForm) {
		signUpForm.addEventListener("submit", (e) =>
			handleSubmit(e, "Sign up")
		);
	}

	// Initialize password strength meter as empty
	if (passwordStrengthBars && passwordStrengthBars.length > 0) {
		checkPasswordStrength("");
	}

	// Add CSS for notification
	const style = document.createElement("style");
	style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #1a1a1a;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            background: #52c41a;
        }
        
        .notification.error {
            background: #ff4d4f;
        }
        
        .notification.info {
            background: #1890ff;
        }
    `;
	document.head.appendChild(style);

    // Logout function
    function handleLogout() {
        // Clear authentication data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }

    // Add click event to all logout buttons
    document.querySelectorAll('.btn-logout').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    });
});
