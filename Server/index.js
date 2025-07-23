const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: path.join(__dirname, "/.env") });
const connectDb = require("./db/connectdb");
const userRoute = require('./Routes/UserRoute');
const Product = require("./Routes/ProductRoute");
const admin = require("./Routes/AdminRoute");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "../Client/dist")));

connectDb();

app.use("/api/user", userRoute);
app.use("/api/product", Product);
app.use("/api/admin", admin);



app.use((err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || "Internal server error";
    res.status(errStatus).send({ success: false, message: errMessage });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist", "index.html")); // or "client/build"
});

app.listen(port, (err) => {
    console.log(err || "server run on port " + port)
})