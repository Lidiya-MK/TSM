async function deleteSession(sessionId) {
  if (!confirm("Are you sure you want to delete this session?")) return;

  try {
    const token = localStorage.getItem("mentorToken");
    const res = await fetch(`http://localhost:5000/thrive/sessions/${sessionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete session");

    alert("Session deleted successfully!");
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
