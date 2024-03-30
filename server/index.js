// imports
require('dotenv').config();
const express = require('express')
const { connectdb } = require('./src/database/connectdb');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const authRouter = require('./src/routes/authRoutes.js')
const app = express();

// forma de ler JSON 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST"],
    credentials: true
}));
// app.use(express.urlencoded({ extended: true }));
app.use("/auth",authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));