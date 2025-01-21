import express from "express"
import bodyParser from "body-parser"
import axios from "axios";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "PaulJumps",
    password: "Utaser3107*",
    port: 5432,
});
db.connect();
const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


//Render main page

app.get("/", (req, res)=>{
    res.render("index.ejs");
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});