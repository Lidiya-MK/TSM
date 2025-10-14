// getMentor.js
document.addEventListener("DOMContentLoaded", async () => {
  try {

    const pathParts = window.location.pathname.split("/");
    const mentorId = pathParts[2];

  
    const token = localStorage.getItem("mentorToken");
    if (!token) throw new Error("No token found, please log in");

    const res = await fetch(`http://localhost:5000/thrive/mentors/${mentorId}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    const mentor = await res.json();
    if (!res.ok) throw new Error(mentor.message || "Failed to fetch mentor");

    
    const nameEl = document.getElementById("mentor-name");
    if (nameEl) nameEl.textContent = mentor.name;

    
    const imgEl = document.getElementById("mentor-profile-pic");
    if (imgEl) {
      imgEl.src = mentor.profilePicture
        ? `http://localhost:5000/${mentor.profilePicture.replace(/\\/g, "/")}`
        : "/images/placeholder.png";
    }

 
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("mentorToken");
        localStorage.removeItem("mentorRole");
        window.location.href = "/mentor-login"; 
      });
    }

  } catch (err) {
    console.error(err);
    alert("Could not load mentor information. Please log in again.");
  }
});
