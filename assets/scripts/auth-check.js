// Check if user is authenticated
function checkAuth(redirectTo) {
	// Dapat i-replace 'currentUser' with your actual auth state check
	// Halimbawa: firebase.auth().currentUser
	const user = localStorage.getItem("user"); // Temporary solution for demo

	if (!user) {
		// If not logged in, redirect to login with return URL
		localStorage.setItem("redirectAfterLogin", redirectTo);
		window.location.href = "auth.html";
		return false;
	}
	return true;
}

// Handle Rent Button Click
document.getElementById("rentButton")?.addEventListener("click", function (e) {
	e.preventDefault();
	if (checkAuth("browse.html")) {
		window.location.href = "browse.html";
	}
});

// Handle Lend Button Click
document.getElementById("lendButton")?.addEventListener("click", function (e) {
	e.preventDefault();
	if (checkAuth("lender-dashboard.html")) {
		window.location.href = "lender-dashboard.html";
	}
});

// Add this to auth.js after successful login
function redirectAfterLogin() {
	const redirectTo = localStorage.getItem("redirectAfterLogin");
	if (redirectTo) {
		localStorage.removeItem("redirectAfterLogin");
		window.location.href = redirectTo;
	} else {
		window.location.href = "index.html";
	}
}
