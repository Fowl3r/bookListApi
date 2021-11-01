const createError = require('http-errors')

let booksList = [];
let idno = 0;
let author = "";
let readStatus = Boolean;



exports.index = function (req, res) {
    res.send({booksList})
}

exports.create = function (req, res, next) {
    if(!req.body.name) {
        return(next(createError(400, "name is required")))
    }
    
    booksList.push({id: idno, Title: req.body.name, author: req.body.author, read: req.body.readStatus})
    res.send({result: true})
    idno++
}

exports.show = function (req, res, next) {
    const bookItem = booksList.find((book) => book.id == req.params.id)
    if(!bookItem) {
        return(next(createError(404, "No Book with that id" )))
    }
    res.send(bookItem)
}
exports.delete = function (req, res, next) {
    const bookItem = booksList.find((book) => book.id == req.params.id)
    if(!bookItem) {
        return(next(createError(404, "No Book with that id")))
    }
    booksList = booksList.filter((book) => book.id != req.params.id)
    res.send({result: true})
}

exports.update = function (req, res, next) {
    const bookItem = booksList.find((book) => book.id == req.params.id)
    if(!req.body.name) {
        return (next(createError(400, "Name is required")))
    }
    if(!bookItem) {
        return (next(createError(404, "No Book with that ID")))
    }
    booksList = booksList.map((book) => {
        if (book.id == req.params.id) {
            book.name = req.body.name
        }
        return book
    })
    res.send({ result: true})
}