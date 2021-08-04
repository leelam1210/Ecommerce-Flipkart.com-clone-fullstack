import mongoose from 'mongoose';

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        app.listen(PORT, () => {
            console.log(`Server Running on Port: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Ket noi that bai!!!');
        console.log(error);
        process.exit(1);
    }
}

export default ConnectDB;