import express from 'express';
import { Book } from '../models/bookModel.js';
import dotenv from "dotenv";

const router = express.Router();
// The routes:

// post route to save a new book

dotenv.config();
const previewUrl= process.env.previewUrl;

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            imageUrl: request.body.imageUrl || previewUrl,
            extraInfo: request.body.extraInfo,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// get route for all books

router.get('/', async(request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } 
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

// get route for a particular book

router.get('/:id', async(request, response) => {
    try {
        
        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } 
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

// put route; find and update a particular book

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({message: "Didn't find book in database"});
        }
        
        return response.status(200).send({message:'Book update successful!'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// delete route to delete a book

router.delete('/:id', async(request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found'});
        }

        return response.status(200).send({ message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;