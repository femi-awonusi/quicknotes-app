const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");

  if (savedNotes !== null) {
    notes = JSON.parse(savedNotes);
  }
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render(notesToRender = notes) {
  notesList.textContent = "";

  if (notesToRender.length === 0) {
    updateCount();
    return;
  }

  notesToRender.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.classList.add("note");
    listItem.classList.add(
      `category-${note.category.toLowerCase()}`
    );

    const noteText = document.createElement("p");
    noteText.classList.add("note-text");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("note-category");
    categoryLabel.textContent = note.category;

    const dateLabel = document.createElement("span");
    dateLabel.classList.add("note-date");
    dateLabel.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = note.id;

    listItem.append(
      noteText,
      categoryLabel,
      dateLabel,
      deleteButton
    );

    notesList.appendChild(listItem);
  });

  updateCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  errorMessage.textContent = "";

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  saveNotes();
  render();

  noteInput.value = "";
});

notesList.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const noteId = event.target.dataset.id;

  notes = notes.filter((note) => note.id !== noteId);

  saveNotes();
  render();
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    notesList.textContent = "";

    const message = document.createElement("li");
    message.textContent = "No notes match your search.";

    notesList.appendChild(message);
    return;
  }

  render(filteredNotes);
});

loadNotes();
render();