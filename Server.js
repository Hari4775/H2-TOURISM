
const express = require('express');
const connectDB = require('./Config/DBconnect');
const userRouter = require('./Router/UserRouter');
const errorHandler = require('./Middleware/ErrorHandler');
const adminRoute = require('./Router/AdminRouter');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload')
const cors= require('cors')

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;
app.use(cors())

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(fileUploader({
    useTempFiles:true
}))

app.use('/user', userRouter);
app.use('/admin', adminRoute);


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});