import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'

import router from './Routes/routes.js'
import './Database/models.js'


const app = express();
const PORT = process.env.PORT || 8000;


config();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

const DB = process.env.MONGO_URL

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DataBase Connected")).catch((errr) => {
    console.log(errr);
})

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
