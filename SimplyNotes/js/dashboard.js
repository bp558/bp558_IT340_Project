// dashboard.js — SimplyNotes dashboard logic

// When the page loads, run our setup code
document.addEventListener("DOMContentLoaded", () => {
  const notesGrid = document.getElementById("notesGrid");
  const btnNewNote = document.getElementById("btnNewNote");
  const logoutBtn = document.getElementById("logout");
  const categoryButtons = document.querySelectorAll("[data-category]");
  const searchInput = document.getElementById("searchInput");

  // Simulate logged-in user data
  const userEmail = localStorage.getItem("userEmail") || "you@example.com";
  document.getElementById("userEmail").textContent = userEmail;

  // Get saved notes (or empty array if none exist)
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");

  // Function to render all notes to the grid
  function renderNotes(filter = "all", search = "") {
    notesGrid.innerHTML = ""; // Clear grid first

    // Filter notes by category and search text
    const filteredNotes = notes.filter(note => {
      const matchesCategory = filter === "all" || note.category === filter;
      const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                            note.content.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // If there are no notes, show a message
    if (filteredNotes.length === 0) {
      notesGrid.innerHTML = `<p style="color:#78909c; font-size:14px;">No notes yet.</p>`;
      return;
    }

    // Create a card for each note
    filteredNotes.forEach(note => {
      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <small>${note.category}</small>
      `;
      // Clicking a note will open the note.html page (later)
      card.addEventListener("click", () => {
        localStorage.setItem("activeNote", JSON.stringify(note));
        window.location.href = "note.html";
      });
      notesGrid.appendChild(card);
    });
  }

  // Create a new note when user clicks "+ New Note"
  btnNewNote.addEventListener("click", () => {
    const title = prompt("Enter note title:");
    if (!title) return;

    const content = prompt("Enter note content:");
    const category = prompt("Enter category (personal, work, archive):", "personal");

    const newNote = {
      id: Date.now(),
      title,
      content,
      category,
      owner: userEmail
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  });

  // Logout button clears user info and goes to login
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
  });

  // Category filter buttons
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      renderNotes(category, searchInput.value);
    });
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value;
    renderNotes("all", searchTerm);
  });

  // Initial render of notes
  renderNotes();
});
