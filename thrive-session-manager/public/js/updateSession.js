document.addEventListener("DOMContentLoaded", () => {
  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editSessionForm");


  window.openEditModal = async (sessionId) => {
    try {
      const token = localStorage.getItem("mentorToken");
      if (!token) throw new Error("You must be logged in");

      const res = await fetch(`http://localhost:5000/thrive/sessions/${sessionId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch session");

      const session = await res.json();

      document.getElementById("editSessionId").value = session._id;
      document.getElementById("editName").value = session.name;
      document.getElementById("editDescription").value = session.description;
      document.getElementById("editDate").value = new Date(session.date).toISOString().split("T")[0];
      document.getElementById("editInstructor").value = session.instructorName;

      editModal.classList.add("active");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  window.closeEditModal = () => {editModal.classList.remove("active");};


  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
               const token = localStorage.getItem("mentorToken");
           if (!token) throw new Error("You must be logged in");

      const sessionId = document.getElementById("editSessionId").value;

      const formData = new FormData(editForm);


      const fileInput = document.getElementById("editCoverImage");
      if (fileInput?.files[0]) {
        formData.set("coverImage", fileInput.files[0]);
      }

      const res = await fetch(`http://localhost:5000/thrive/sessions/${sessionId}`, {
        method: "PATCH", headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update session");

      alert("Session updated successfully!");
      closeEditModal();

      if (window.loadSessions) window.loadSessions();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });
});
