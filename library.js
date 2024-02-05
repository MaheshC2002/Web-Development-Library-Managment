document.addEventListener("DOMContentLoaded", function () {
    getBooks();
});

function addBook() {
    console.log('Attempting to add book...');

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    if (title && author) {
        const book = {
            title: title,
            author: author
        };

        console.log('Book data:', book);

        fetch('backend/addBook.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);

            if (data.success) {
                getBooks();
                clearForm();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please enter both title and author.');
    }
}

function getBooks() {
    fetch('backend/getBooks.php')
        .then(response => response.json())
        .then(data => {
            displayBooks(data.books);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayBooks(books) {
    const bookListContainer = document.getElementById('book-list');
    bookListContainer.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        bookListContainer.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
}
