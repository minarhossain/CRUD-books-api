const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const bookSchema = require('../schemas/bookSchema');
const Book = new mongoose.model("Book", bookSchema); // create a books collection an database

// model

// get all the books
router.get('/', async (req, res) => {
    const query = await Book.find({});
    const author = query.map(a => a.author)
    res.send(query)

});

// get a book by id
router.get('/:id', async (req, res) => {
    try {
        const onePice = await Book.findOne({ _id: req.params.id })
        res.send(onePice);
    } catch (error) {
        console.error("Find Failed")
    }
})


//post books
router.post('/', async (req, res) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        console.log("Saved Successfully");

    } catch (error) {
        console.error("Saved Fail", error)
    }

})

// post multiple books

router.post('/all', async (req, res) => {

    try {
        Book.insertMany(req.body);
        console.log("Saved Successfully");

    } catch (error) {
        console.error("Saved Fail", error)
    }
})


// put books

router.put('/:id', async (req, res) => {
    try {
        await Book.updateOne({ _id: req.params.id }, {
            $set: {
                title: "MERN Stack Web Development",
                author: "Minar Hossain",
                description: "Learning Period"
            }
        })
        console.log("Update Succfully Put Field");
    } catch (error) {
        console.error("Update Failed")
    }

})

//delete books

router.delete('/:id', async (req, res) => {
    try {
        const deleteId = await Book.deleteOne({ _id: req.params.id })
        console.log("Delete Successfully", deleteId);
    } catch (error) {
        console.error("Delete Failed")
    }
})

module.exports = router;