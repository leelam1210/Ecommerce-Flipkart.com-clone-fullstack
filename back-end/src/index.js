import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/index.js';
import path from 'path';
const __dirname = path.resolve();
// import bodyParser from 'body-parser';

//env
dotenv.config();

// Middleware
const app = express();
app.use(express.json());
app.use('/public/image', express.static(path.join(__dirname, 'src/uploads')));
// app.use(bodyParser());
app.use(cors());

//router
//routes init
route(app);



//connect Db
const PORT = process.env.PORT || 5500;
const URI = process.env.MONGODB_URL;

mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on Port: http://localhost:${PORT}`);
        });
    })
    .catch(() => {
        console.log('Ket noi that bai!!!');
        process.exit(1);
    });


