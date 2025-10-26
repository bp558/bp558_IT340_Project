// note.js — Handles viewing and editing a single note

document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("noteTitle");
  const contentArea = document.getElementById("noteContent");
  const saveButton = document.getElementById("saveNote");
  const deleteButton = document.getElementById("deleteNote");

  // Get the current note from localStorage
  const activeNote = JSON.parse(localStorage.getItem("activeNote"));
  let allNotes = JSON.parse(localStorage.getItem("notes") || "[]");

  // If no note is found, go back to dashboard
  if (!activeNote) {
    alert("No note selected!");
    window.location.href = "dashboard.html";
    return;
  }

  // Fill in the fields
  titleInput.value = activeNote.title;
  contentArea.value = activeNote.content;

  // Save changes
  saveButton.addEventListener("click", () => {
    const updatedTitle = titleInput.value.trim();
    const updatedContent = contentArea.value.trim();

    if (updatedTitle === "" || updatedContent === "") {
      alert("Title and content cannot be empty.");
      return;
    }

    // Find the note in the list and update it
    allNotes = allNotes.map(note => 
      note.id === activeNote.id 
        ? { ...note, title: updatedTitle, content: updatedContent }
        : note
    );

    // Save back to localStorage
    localStorage.setItem("notes", JSON.stringify(allNotes));

    alert("Note saved successfully!");
    window.location.href = "dashboard.html";
  });

  // Delete the note
  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this note?")) {
      allNotes = allNotes.filter(note => note.id !== activeNote.id);
      localStorage.setItem("notes", JSON.stringify(allNotes));
      localStorage.removeItem("activeNote");
      window.location.href = "dashboard.html";
    }
  });
});
