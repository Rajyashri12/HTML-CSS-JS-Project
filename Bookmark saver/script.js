const form = document.getElementById("bookmark-form");
const nameInput = document.getElementById("bookmark-name");
const urlInput = document.getElementById("bookmark-url");
const list = document.getElementById("bookmark-list");

// Load bookmarks from localStorage
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
  saved.forEach(addBookmarkToUI);
};

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (!name || !url) return;

  const bookmark = { name, url };

  addBookmarkToUI(bookmark);
  saveBookmark(bookmark);

  form.reset();
});

// Save bookmark to localStorage
function saveBookmark(bookmark) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Add a bookmark to the DOM
function addBookmarkToUI(bookmark) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = bookmark.url;
  link.textContent = bookmark.name;
  link.target = "_blank";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.onclick = function () {
    li.remove();
    removeBookmark(bookmark.url);
  };

  li.appendChild(link);
  li.appendChild(removeBtn);
  list.appendChild(li);
}

// Remove bookmark from localStorage
function removeBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter(b => b.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
