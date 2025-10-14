document.addEventListener("DOMContentLoaded", () => {
  const createForm = document.querySelector("#createModal form");

  if (!createForm) return;

  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("mentorToken");
      if (!token) throw new Error("You must be logged in");

      const formData = new FormData(createForm); 


      const sessionData = new FormData();
      sessionData.append("name", formData.get("name"));
      sessionData.append("description", formData.get("description"));
      sessionData.append("date", formData.get("date"));
      sessionData.append("instructorName", formData.get("instructor")); 

      const fileInput = createForm.querySelector('input[name="coverImage"]');
      if (fileInput?.files[0]) {
        sessionData.append("coverImage", fileInput.files[0]);
      }

    
      const res = await fetch("http://localhost:5000/thrive/sessions/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: sessionData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create session");

      alert("Session created successfully!");
      closeCreateModal();
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });
});
