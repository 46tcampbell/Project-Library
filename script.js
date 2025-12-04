class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
    this.toggleReadStatus = function () {
      if (this.read === 'Not Read Yet') {
        return (this.read = 'Read');
      }
      return (this.read = 'Not Read Yet');
    };
  }
}

class Library extends Book {
  myLibrary = [];
  table = document.querySelector('#book-table');
  addBookBtn = document.querySelector('#new-book-btn');
  closeModalBtn = document.querySelector('#close-modal-btn');
  submitModalBtn = document.querySelector('#submit-modal-btn');
  dialog = document.querySelector('dialog');
  form = document.querySelector('#form');
  allErrorSpans = document.querySelectorAll('span.error');

  constructor() {
    super();
    this.initializeListeners();
  }
  openModal() {
    this.dialog.showModal();
  }

  closeModal() {
    this.dialog.close();
  }

  closeAndClearModal(e) {
    e.preventDefault();
    this.form.reset();
    this.allErrorSpans.forEach((span) => {
      span.textContent = '';
    });
    this.form.classList.remove('submitted');
    this.closeModal();
  }

  submitModal(e) {
    this.form.classList.add('submitted');
    const bookTitle = document.querySelector('#title');
    const bookAuthor = document.querySelector('#author');
    const bookPages = document.querySelector('#pages');
    const bookRead = document.querySelector(
      'input[name="read-status"]:checked'
    );
    const bookReadStatus = document.querySelector('#read');
    const titleError = document.querySelector('span.error.title');
    const authorError = document.querySelector('span.error.author');
    const pagesError = document.querySelector('span.error.pages');
    const readStatusError = document.querySelector('span.error.read-status');
    if (bookTitle.checkValidity()) {
      titleError.textContent = '';
      e.preventDefault();
    } else {
      titleError.textContent = 'Please enter a Book Title';
      e.preventDefault();
      // return;
    }

    if (bookAuthor.checkValidity()) {
      authorError.textContent = '';
      e.preventDefault();
    } else {
      authorError.textContent = 'Please enter a Book Author';
      e.preventDefault();
      // return;
    }

    if (bookPages.checkValidity()) {
      pagesError.textContent = '';
      e.preventDefault();
    } else {
      pagesError.textContent = 'Please enter the amount of Book Pages';
      e.preventDefault();
      // return;
    }
    console.log(bookReadStatus.checkValidity());
    if (bookReadStatus.checkValidity()) {
      readStatusError.textContent = '';
      e.preventDefault();
    } else {
      readStatusError.textContent =
        'Please choose if you have read this book or not';
      e.preventDefault();
    }

    if (
      titleError.textContent ||
      authorError.textContent ||
      pagesError.textContent ||
      readStatusError.textContent
    ) {
      return;
    }
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const read = bookRead.value;

    console.dir(bookTitle.checkValidity());
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    this.myLibrary.push(newBook);
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    this.addBookToTable();
    this.form.classList.remove('submitted');
    this.dialog.close();
  }

  showError() {}

  addBookToTable() {
    this.clearBookTable();
    for (const book of this.myLibrary) {
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
      const update = document.createElement('td');
      const updateBtn = document.createElement('button');
      updateBtn.textContent = 'Update Read Status';
      updateBtn.setAttribute('id', book.id);
      updateBtn.classList.add('updateBtn');
      updateBtn.addEventListener('click', () => {
        const book = this.myLibrary.find(
          (book) => book.id === updateBtn.attributes.id.value
        );
        book.toggleReadStatus();
        this.addBookToTable();
      });
      update.appendChild(updateBtn);
      newRow.appendChild(update);
      const remove = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove Book';
      removeBtn.setAttribute('id', book.id);
      removeBtn.classList.add('removeBtn');
      removeBtn.addEventListener('click', () => {
        const newLibrary = this.myLibrary.filter(
          (book) => book.id !== removeBtn.attributes.id.value
        );
        this.myLibrary = newLibrary;
        this.addBookToTable();
      });
      remove.appendChild(removeBtn);
      newRow.appendChild(remove);
      this.table.appendChild(newRow);
    }
  }

  clearBookTable() {
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
  }

  initializeListeners() {
    this.closeModalBtn.addEventListener(
      'click',
      this.closeAndClearModal.bind(this)
    );
    this.addBookBtn.addEventListener('click', this.openModal.bind(this));
    this.form.addEventListener('submit', this.submitModal.bind(this));
  }

  addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    return this.myLibrary.push(newBook);
  }
}

const library = new Library();
