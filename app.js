const express = require("express"); //import
const app = express(); //function
const morgan = require("morgan"); //log
const mongoose = require("mongoose"); //connect to MongoDB
const port = 3000;
const note = require("./routes/note");
const helmet = require("helmet");

app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));

mongoose
  .connect("mongodb://localhost:27017/", { dbName: "Notetest" })
  .then(() => console.log("Connect to mongoDB"))
  .catch((err) => console.log("Erorr", err));

// app.use("/home", note);
app.use("/api/notes", note);

app.get("/", (req, res) => {
  res.status(200).json({
    resultCode: 20000,
    resultData: "Hello",
  });
});

app.listen(port, () => {
  console.log(`Port: ${port}`);
});
