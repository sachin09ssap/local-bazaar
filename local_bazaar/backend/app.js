require('dotenv').config();


const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
// DB Connection

mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED....");
});

// myfun.run().then().catch()
// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);

// Port
const port = 8000;

// Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});