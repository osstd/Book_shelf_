import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';


const app = express();

dotenv.config();

const mongoUrl = process.env.REST_DB_URI;
const PORT = process.env.PORT; 

app.use(express.json());
 
app.use(cors());

app.get('/', (request, response) => { 
    console.log('BackEnd Server')
    return response.status(200).send('Welcome')
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoUrl)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error) 
    })    