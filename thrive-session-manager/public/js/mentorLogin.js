document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    try {
      const res = await fetch("http://localhost:5000/thrive/mentors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      
      localStorage.setItem("mentorToken", data.token);
      localStorage.setItem("mentorRole", data.role);

      
      const decoded = parseJwt(data.token);
      const mentorId = decoded.id;

      
      window.location.href = `/mentor/${mentorId}/dashboard`;
        // window.location.href = `/mentor-dashboard`;


    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  });

  
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
});
