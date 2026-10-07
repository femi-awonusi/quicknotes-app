const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function render(notesToRender = notes) {
  notesList.textContent = "";

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

  notesList.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const noteId = event.target.dataset.id;

  notes = notes.filter((note) => note.id !== noteId);

  render();
});

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  render();

  noteInput.value = "";
});

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  render();
  updateCount();

  noteInput.value = "";
});