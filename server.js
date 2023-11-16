require("dotenv").config(0);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(cors());

//routes
app.use("/api/users", require("./api/users/routes"));
app.use("/api/news", require("./api/news/routes"));

// return the client
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

if (process.env.NODE_ENV === "dev"){
  mongoose.set("debug", true); // useful to know what mongodb requests are made
}

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB successfully!")
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT);
    })
    
  })
  .catch((err) => console.error(err));
