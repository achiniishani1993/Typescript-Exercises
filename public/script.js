let currentPage = 1;
let currentLimit = 10;
let totalBooks = 0;




function showError(message) {
  const error = document.getElementById("errorMessage");

  error.textContent = message;
  error.style.display = "block";

  document.getElementById("successMessage").style.display = "none";
}

function showSuccess(message) {
  const success = document.getElementById("successMessage");

  success.textContent = message;
  success.style.display = "block";

  document.getElementById("errorMessage").style.display = "none";
}

function clearMessages() {
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
}


// books

async function loadBooks(page = 1) {

  clearMessages();

  const search = document.getElementById("search").value;
  const genre = document.getElementById("genreFilter").value;
  const sort = document.getElementById("sort").value;

  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", currentLimit);

  if (search) {
    params.set("search", search);
  }

  if (genre) {
    params.set("genre", genre);
  }

  if (sort) {
    params.set("sort", sort);
  }

  try {

    const response = await fetch(`/books?${params}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to load books"
      );
    }

    currentPage = data.page;
    totalBooks = data.total;

    displayBooks(data.data);

    document.getElementById("pageInfo").textContent =
      `Page ${data.page} | ${data.total} total books`;

  } catch (error) {

    showError(error.message);

  }
}


function displayBooks(books) {

  const container = document.getElementById("bookList");

  container.innerHTML = "";

  if (books.length === 0) {
    container.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach(book => {

    const div = document.createElement("div");

    div.className = "book";

    div.innerHTML = `
      <div class="book-info">

        <h3>${escapeHtml(book.title)}</h3>

        <p>
          <strong>ID:</strong> ${book.id}
        </p>

        <p>
          <strong>Genre:</strong>
          ${escapeHtml(book.genre ?? "Not specified")}
        </p>

        <p>
          <strong>Published:</strong>
          ${book.published_year ?? "Unknown"}
        </p>

        <p>
          <strong>Author ID:</strong>
          ${book.author_id ?? "None"}
        </p>

      </div>

      <div class="book-actions">

        <button
          onclick="openEditForm(
            ${book.id},
            '${escapeJs(book.title)}',
            '${escapeJs(book.genre ?? "")}',
            '${book.published_year ?? ""}'
          )"
        >
          Edit
        </button>

        <button
          class="danger"
          onclick="deleteBook(${book.id})"
        >
          Delete
        </button>

      </div>
    `;

    container.appendChild(div);

  });
}




function nextPage() {

  const maxPage = Math.ceil(totalBooks / currentLimit);

  if (currentPage < maxPage) {
    loadBooks(currentPage + 1);
  }

}


function previousPage() {

  if (currentPage > 1) {
    loadBooks(currentPage - 1);
  }

}


function clearFilters() {

  document.getElementById("search").value = "";
  document.getElementById("genreFilter").value = "";
  document.getElementById("sort").value = "";

  loadBooks(1);
}


// add book

document
  .getElementById("bookForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    clearMessages();

    const title =
      document.getElementById("bookTitle").value;

    const genre =
      document.getElementById("bookGenre").value;

    const year =
      document.getElementById("bookYear").value;

    const authorId =
      document.getElementById("bookAuthor").value;

    try {

      const response = await fetch("/books", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          genre,
          published_year: year
            ? Number(year)
            : null,
          author_id: authorId
            ? Number(authorId)
            : null
        })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to add book"
        );
      }

      showSuccess("Book added successfully!");

      document.getElementById("bookForm").reset();

      loadBooks(1);

    } catch (error) {

      showError(error.message);

    }

  });


// edit book

function openEditForm(id, title, genre, year) {

  document.getElementById("editFormContainer").style.display =
    "block";

  document.getElementById("editBookId").value = id;
  document.getElementById("editTitle").value = title;
  document.getElementById("editGenre").value = genre;
  document.getElementById("editYear").value = year;

  window.scrollTo({
    top: document.getElementById("editFormContainer").offsetTop,
    behavior: "smooth"
  });
}


function closeEditForm() {

  document.getElementById("editFormContainer").style.display =
    "none";

}


document
  .getElementById("editBookForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const id =
      document.getElementById("editBookId").value;

    const title =
      document.getElementById("editTitle").value;

    const genre =
      document.getElementById("editGenre").value;

    const year =
      document.getElementById("editYear").value;

    try {

      const response = await fetch(`/books/${id}`, {

        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title: title || undefined,
          genre: genre || undefined,
          published_year: year
            ? Number(year)
            : undefined
        })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to update book"
        );
      }

      showSuccess("Book updated successfully!");

      closeEditForm();

      loadBooks(currentPage);

    } catch (error) {

      showError(error.message);

    }

  });


// delet book

async function deleteBook(id) {

  if (!confirm("Are you sure you want to delete this book?")) {
    return;
  }

  try {

    const response = await fetch(`/books/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to delete book"
      );
    }

    showSuccess("Book deleted successfully!");

    loadBooks(currentPage);

  } catch (error) {

    showError(error.message);

  }

}


// books authors

async function loadAuthors() {

  try {

    const response = await fetch("/authors");

    const authors = await response.json();

    if (!response.ok) {
      throw new Error(
        authors.error || "Failed to load authors"
      );
    }

    const container =
      document.getElementById("authorList");

    container.innerHTML = "";

    if (authors.length === 0) {
      container.innerHTML = "<p>No authors found.</p>";
      return;
    }

    authors.forEach(author => {

      const div = document.createElement("div");

      div.className = "author";

      div.innerHTML = `
        <strong>${escapeHtml(author.name)}</strong>
        (ID: ${author.id})

        <button
          onclick="loadAuthorBooks(${author.id})"
        >
          View Books
        </button>
      `;

      container.appendChild(div);

    });

  } catch (error) {

    showError(error.message);

  }

}


document
  .getElementById("authorForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const name =
      document.getElementById("authorName").value;

    try {

      const response = await fetch("/authors", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name
        })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to add author"
        );
      }

      showSuccess("Author added successfully!");

      document.getElementById("authorForm").reset();

      loadAuthors();

    } catch (error) {

      showError(error.message);

    }

  });


async function loadAuthorBooks(authorId) {

  try {

    const response =
      await fetch(`/authors/${authorId}/books`);

    const books = await response.json();

    if (!response.ok) {
      throw new Error(
        books.error || "Failed to load author's books"
      );
    }

    const container =
      document.getElementById("authorBooks");

    container.innerHTML = `
      <h3>Books by Author ${authorId}</h3>
    `;

    if (books.length === 0) {
      container.innerHTML += "<p>No books found.</p>";
      return;
    }

    books.forEach(book => {

      container.innerHTML += `
        <div class="author">
          <strong>${escapeHtml(book.title)}</strong>
          - ${escapeHtml(book.genre ?? "No genre")}
        </div>
      `;

    });

  } catch (error) {

    showError(error.message);

  }

}


// members

document
  .getElementById("memberForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const name =
      document.getElementById("memberName").value;

    const email =
      document.getElementById("memberEmail").value;

    try {

      const response = await fetch("/members", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email
        })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to add member"
        );
      }

      showSuccess(
        `Member created! Member ID: ${data.id}`
      );

      document.getElementById("memberForm").reset();

    } catch (error) {

      showError(error.message);

    }

  });


// loans

document
  .getElementById("loanForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const bookId =
      Number(document.getElementById("loanBookId").value);

    const memberId =
      Number(document.getElementById("loanMemberId").value);

    try {

      const response = await fetch("/loans", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          book_id: bookId,
          member_id: memberId
        })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to borrow book"
        );
      }

      showSuccess(
        `Book borrowed successfully! Loan ID: ${data.id}`
      );

      document.getElementById("loanForm").reset();

    } catch (error) {

      showError(error.message);

    }

  });


// book return

document
  .getElementById("returnForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const loanId =
      document.getElementById("returnLoanId").value;

    try {

      const response =
        await fetch(`/loans/${loanId}/return`, {
          method: "PATCH"
        });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to return book"
        );
      }

      showSuccess("Book returned successfully!");

      document.getElementById("returnForm").reset();

    } catch (error) {

      showError(error.message);

    }

  });




document
  .getElementById("memberLoansForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const memberId =
      document.getElementById("memberLoansId").value;

    try {

      const response =
        await fetch(`/members/${memberId}/loans`);

      const loans = await response.json();

      if (!response.ok) {
        throw new Error(
          loans.error || loans.message || "Failed to load loans"
        );
      }

      const container =
        document.getElementById("memberLoans");

      container.innerHTML = "";

      if (loans.length === 0) {
        container.innerHTML =
          "<p>This member has no loans.</p>";
        return;
      }

      loans.forEach(loan => {

        const div = document.createElement("div");

        div.className = "loan";

        const returned =
          loan.returned_at
            ? `Returned: ${loan.returned_at}`
            : "Currently borrowed";

        div.innerHTML = `
          <strong>${escapeHtml(loan.title)}</strong>

          <br>
          Loan ID: ${loan.id}

          <br>
          Borrowed: ${loan.borrowed_at}

          <br>
          ${returned}
        `;

        container.appendChild(div);

      });

    } catch (error) {

      showError(error.message);

    }

  });


// stats

async function loadStats() {

  try {

    const response = await fetch("/stats");

    const stats = await response.json();

    if (!response.ok) {
      throw new Error(
        stats.error || "Failed to load statistics"
      );
    }

    const container =
      document.getElementById("stats");

    container.innerHTML = "";

    if (stats.length === 0) {
      container.innerHTML =
        "<p>No statistics available.</p>";
      return;
    }

    stats.forEach(stat => {

      const div = document.createElement("div");

      div.className = "stat";

      div.innerHTML = `
        <strong>
          ${escapeHtml(stat.genre ?? "No genre")}
        </strong>

        <br>

        ${stat.count} books
      `;

      container.appendChild(div);

    });

  } catch (error) {

    showError(error.message);

  }

}




function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeJs(value) {

  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\r");

}




loadBooks(1);
loadAuthors();