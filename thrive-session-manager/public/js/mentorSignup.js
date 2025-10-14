document.getElementById("mentorSignupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const profilePicture = document.getElementById("profilePicture").files[0];

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profilePicture", profilePicture);

  try {
    const res = await fetch("http://localhost:5000/thrive/mentors/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Mentor registered successfully!");
      window.location.href = "/mentor-login"; 
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});
