const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const URl = process.env.MONGO_DB_URL
console.log(URl)
const PORT = 5000;
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(URl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  imageURL: { type: String, required: true },
});

const Photos = new mongoose.model("Photos", imageSchema);

app.get("/", async(req, res) => {
  try{
    const pic = await Photos.find({})
    res.status(200).send(pic);
  }
  catch(err) {
    res.status(401).send({message: err.message});
  }
});


app.post("/image", (req, res) => {
    console.log(req)
  const pic = new Photos({
    id: req.body.id,
    label: req.body.label,
    imageURL: req.body.imageURL,
  });

  pic.save().then(
    () => {
      console.log("One entry added")
      res.status(201).send({message: "One entry added"})
    },
    (err) => {
      console.log(err)
      res.status(402).send({message: "Failed to add entry"})
    }
  );
});



app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT::", PORT);
});
