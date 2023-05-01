const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/error');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const JobTypesRoute = require("./routes/jobsTypeRoutes");
const jobRoutes = require("./routes/jobsRoutes")
// MongoDb Connecting
mongoose
    .connect(process.env.DATABASE, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("DataBase Connected SuccessFully");
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({
    limit: "5mb"
}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser())
app.use(cors())

app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", JobTypesRoute)
app.use("/api", jobRoutes)
// error middleware

app.use(errorHandler)
// Port Running
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
