import express from "express"
import bodyParser from "body-parser"
import axios from "axios";
import pg from "pg";
import env from "dotenv";

env.config();
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "PaulJumps",
    password: process.env.DB_PASSWORD,
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

app.post("/submit", async (req, res)=>{
    const fname= req.body["fname"];
    const lname= req.body["lname"];
    const email= req.body["email"];
    const message = "This is a where the course will be displayed";
    console.log("email Submitted");
    try {
        await db.query(
          "INSERT INTO client (fname,lname,email) VALUES ($1,$2,$3)",
          [fname, lname, email]
        );
        try{
            await axios.post("https://dashboard.emailjs.com/admin/account?service_id=service_pvuj9te&template_id=my_template&user_id=vuAIrw63ShERTOrnd&accessToken=s8XpmtgYbu1vLdOdbxYD_",{
                to_email: email,
                to_name: fname,
                message: message,
            });
          }catch(err){
            console.log(err);
          }
        res.render("validation.ejs", {name: fname});
      } catch (err) {
        console.log(err);
        res.render("index.ejs");
      }
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});