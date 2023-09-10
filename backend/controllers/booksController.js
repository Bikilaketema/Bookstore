const Book = require('../model/book');


const getAllBooks = async (req,res,next) => {
    //Fetches all the books
    let books;
    try {
        books = await Book.find();
    } catch (err) {
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({message:'No books found!'})
    }

    return res.status(200).json({ books })
}

const getById = async (req,res,next) => {
    const id = req.params.id
    let book;
    try {
        book = await Book.findById(id);
    } catch(err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({message:'No book found that matches the id'})
    }
    return res.status(200).json({ book });
}

const addBook = async (req,res,next) => {

    const { title, author, genre, coverPage, price,description} = req.body;

    let book;
    try {
        book = new Book({
           title,
           author,
           genre,
           coverPage,
           price,
           description
        });

        await book.save();
    } catch (err) {
        console.log(err);
    }

    if(!book) {
        return res.status(500).json({message:'Unable to add the book.'})
    }

    return res.status(201).json({book})
};

const updateBook = async (req,res,next) => {
    const id = req.params.id;
    const { title, author, genre, coverPage, price,description} = req.body;
    let book;

    try {
        book = await Book.findByIdAndUpdate(id,{
            title,
            author,
            genre,
            coverPage,
            price,
            description
        });

        book = await book.save();
    } catch (err) {
        console.log(err);
    }

    if(!book) {
        return res.status(500).json({message:'Unable to update.'})
    }

    return res.status(200).json({book})
}

const deleteBook = async (req,res,next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
        console.log(err)
    }

    if(!book) {
        return res.status(404).json({message:'Unable to delete.'})
    }

    return res.status(200).json({message: 'Book deleted'})
}

exports.deleteBook =deleteBook;
exports.addBook = addBook;
exports.getAllBooks = getAllBooks;
exports.getById = getById;
exports.updateBook = updateBook; 