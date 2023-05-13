const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  imageURL: { type: String, required: true },
});

const Photos = new mongoose.model("Photos", imageSchema);

app.get("/", (req, res) => {
  Photos.find({}, (err, found) => {
    if (!err) {
      res.send(found);
    }
    console.log(err);
    res.send("Some error occured!");
  }).catch((err) => console.log("Error occured, " + err));
});


app.post("/image", (req, res) => {
    console.log(req)
  const pic = new Photos({
    id: req.body.id,
    label: req.body.label,
    imageURL: req.body.imageURL,
  });

  pic.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );
});



app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT::", PORT);
});
