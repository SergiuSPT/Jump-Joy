import express from "express"
import bodyParser from "body-parser"
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


//Render main page

app.get("/", (req, res)=>{
    res.render("index.ejs");
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});