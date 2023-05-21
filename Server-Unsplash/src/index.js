const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const URl = process.env.MONGO_DB_URL;
const PORT = 5000;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(URl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  label: { type: String, required: true },
  imageURL: { type: String, required: true },
  date: {  type: Date, required: true },
});

const Photos = new mongoose.model("Photos", imageSchema);

app.get("/", async (req, res) => {
  try {
    const pic = await Photos.find({}).sort({imageURL: -1});
    res.status(200).send(pic);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

app.post("/image", (req, res) => {
  const pic = new Photos({
    label: req.body.label,
    imageURL: req.body.imageURL,
    date: req.body.date,
  });

  pic.save().then(
    () => {
      console.log("One entry added");
      res.status(201).send({ message: "One entry added" });
    },
    (err) => {
      console.log(err);
      res.status(403).send({ message: "Failed to add entry" });
    }
  );
});

app.post("/delete", async (req, res) => {
  try {
    const Id = req.body._id
    await Photos.findByIdAndDelete(Id);
    res.status(202).send({message: "Photo deleted successfully"})
  } catch (err) {
    res.status(501).send({message: err.message})
    console.log(err);
  }
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT::", PORT);
});
