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
  const date_r=Date.now();
  //console.log(Date(date_r));
  var data=req.body;
  data.c_date=date_r;
  console.log(data);
  var file=fs.readFileSync("todo.json",'utf-8');
  var data_file=JSON.parse(file);
  console.log(data_file);
  data_file.push(data);
  fs.writeFile(
    "todo.json",
    JSON.stringify(data_file),
    err => {
        // Checking for errors 
        if (err) throw err;

        // Success 
        console.log("Done writing");
    }); 
  res.render("index.ejs" )
});

app.get("/view", (req, res) => {
  var file_res=JSON.parse(fs.readFileSync("todo.json",'utf-8'));
  var i=0;
  console.log(req.rawHeaders);
  res.render("view.ejs",{file_res,i});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


