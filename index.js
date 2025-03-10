import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  //console.log(req.body);
  //console.log(req.rawHeaders);
  const date_r=Date.now();
  //console.log(Date(date_r));
  
  res.render("index.ejs" )
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});