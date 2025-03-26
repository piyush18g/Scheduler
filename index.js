import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

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
  const date_r = Date.now();
  //console.log(Date(date_r));
  var data = req.body;
  data.c_date = date_r;
  console.log(data);
  var file = fs.readFileSync("todo.json", 'utf-8');
  var data_file = JSON.parse(file);
  console.log(data_file);
  data_file.push(data);
  fs.writeFileSync("todo.json", JSON.stringify(data_file, null, 2));
  console.log("Done writing");

  res.render("index.ejs")
});

app.get("/view", (req, res) => {
  var file_res = JSON.parse(fs.readFileSync("todo.json", 'utf-8'));
  let i = parseInt(req.query.i) || 0;
  let l=file_res.length;
  res.render("view.ejs", { file_res, i ,l});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
