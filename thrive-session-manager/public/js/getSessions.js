document.addEventListener("DOMContentLoaded", async () => {
  const sessionsContainer = document.getElementById("sessionsContainer");
  const noSessionsMessage = document.getElementById("noSessionsMessage");

  try {
    const token = localStorage.getItem("mentorToken");
    if (!token) throw new Error("You must be logged in");

    const res = await fetch("http://localhost:5000/thrive/sessions/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    sessionsContainer.innerHTML = "";

    if (!res.ok) throw new Error(data.message || "Failed to fetch sessions");

    if (!data.length) {
      noSessionsMessage.classList.remove("hidden");
      return;
    }

    noSessionsMessage.classList.add("hidden");

    data.forEach(session => {
      const card = document.createElement("div");
      card.className = "bg-black border border-[#873ac2]/60 rounded-xl overflow-hidden shadow-lg hover:shadow-[#873ac2]/30 hover:shadow-2xl transition duration-300 relative";

      const coverImageUrl = session.coverImage
        ? `http://localhost:5000/${session.coverImage.replace(/\\/g, "/")}`
        : '/images/ml.png';

      card.innerHTML = `
        <img src="${coverImageUrl}" alt="Session" class="w-full h-40 object-cover">
        <div class="p-5">
          <h3 class="text-xl font-display text-[#873ac2] mb-2">${session.name}</h3>
          <p class="text-white/80 text-sm mb-3">${session.description}</p>
          <div class="text-white/60 text-sm mb-4">
            <p>Date: <span class="text-white">${new Date(session.date).toLocaleDateString()}</span></p>
            <p>Instructor: <span class="text-white">${session.instructorName}</span></p>
          </div>
          <div class="flex space-x-3">
            <button onclick="openEditModal('${session._id}')" class="px-4 py-1.5 bg-[#873ac2]/20 text-[#873ac2] border border-[#873ac2]/50 rounded hover:bg-[#873ac2]/30 transition">Edit</button>
            <button onclick="deleteSession('${session._id}')" class="px-4 py-1.5 bg-red-500/20 text-red-400 border border-red-400/40 rounded hover:bg-red-500/30 transition">Delete</button>
          </div>
        </div>
      `;
      sessionsContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    sessionsContainer.innerHTML = `<p class="text-red-500">Error loading sessions: ${err.message}</p>`;
  }
});
