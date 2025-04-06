const express = require("express");

let books = [
    {id: 1, title: 1984, author: "George Orwell"},
    {id: 2, title: "The Hobbit", author: "J.R.R. Tolkien"},
    {id: 3, title: "The Catcher in the Rye", author: "J.D. Salinger"},
]

const app = express();

app.use(express.json());

//Get all books
app.get("/books", (req, res) => {
    res.json(books);
});

//Get a book by id
app.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ message: "Book not found"});
    }
    return res.json(book);
});

//Add a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books[books.length - 1].id + 1,
        title,
        author
    }
    books.push(newBook);
    res.status(201).send(newBook);
});

//Update a user
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found"});
    }

    const {title, author} = req.body;
    if (!title || !author) {
        return res.status(404).json({ error: "Bad request"});
    }

    book.title = title;
    book.author = author;
    res.json(book);
});

app.delete("/books/:id", (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.json({ message: "Book deleted"});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${ PORT }`);
});