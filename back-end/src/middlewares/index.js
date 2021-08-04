import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
const __dirname = path.resolve();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "src/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
})

// const storage = multer.memoryStorage()
export const upload = multer({ storage: storage });