const myLibrary = [];
const table = document.querySelector('#book-table');
const addBookBtn = document.querySelector('#new-book-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const submitModalBtn = document.querySelector('#submit-modal-btn');
const dialog = document.querySelector('dialog');

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, pages, read, id);
  return myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('Test', 'J.R.R. Tolkien', 295, 'not read yet');

// Note from 10/22/25: Started the below function and did not have time to finish. Step 3 from Project

function addBookToTable() {
  for (const book of myLibrary) {
    const newRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = book.title;
    newRow.appendChild(title);
    const author = document.createElement('td');
    author.textContent = book.author;
    newRow.appendChild(author);
    const pages = document.createElement('td');
    pages.textContent = book.pages;
    newRow.appendChild(pages);
    const read = document.createElement('td');
    read.textContent = book.read;
    newRow.appendChild(read);
    table.appendChild(newRow);
  }
}

addBookToTable();

addBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

closeModalBtn.addEventListener('click', () => {
  dialog.close();
});

submitModalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const bookPages = document.querySelector('#pages');
  const bookRead = document.querySelector('input[name="read-status"]:checked');
  const newRow = document.createElement('tr');
  const title = document.createElement('td');
  title.textContent = bookTitle.value;
  newRow.appendChild(title);
  const author = document.createElement('td');
  author.textContent = bookAuthor.value;
  newRow.appendChild(author);
  const pages = document.createElement('td');
  pages.textContent = bookPages.value;
  newRow.appendChild(pages);
  const read = document.createElement('td');
  read.textContent = bookRead.value;
  newRow.appendChild(read);
  table.appendChild(newRow);
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
  bookRead.value = '';
  dialog.close();
});

/* <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Number of Pages</th>
          <th>Read Status</th>
        </tr>
      </thead>
      <tbody id="book-table"></tbody>
    </table> */
