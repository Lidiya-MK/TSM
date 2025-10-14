
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Enter your name"]').value.trim();
    const email = form.querySelector('input[placeholder="Enter your email"]').value.trim();
    const password = form.querySelector('input[placeholder="Enter your password"]').value.trim();
    const confirmPassword = form.querySelector('input[placeholder="Confirm password"]').value.trim();
    const profilePicture = form.querySelector('input[type="file"]').files[0];


    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    try {
      const response = await fetch("http://localhost:5000/thrive/trainees/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "/trainee-login";
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    }
  });
});
