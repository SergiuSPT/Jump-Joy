import express from "express"
import bodyParser from "body-parser"
import axios from "axios";
import pg from "pg";
import env from "dotenv";
import nodemailer from "nodemailer";

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
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sergiuspatar19@gmail.com",
    pass: "tkbt wvhp hvbb rfes",
  },
});

//Render main page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const fname = req.body["fname"];
  const lname = req.body["lname"];
  const email = req.body["email"];
  const course_link = "https://www.canva.com/design/DAGdzCVtloU/JAw4NhGOxandFcOEFQzuoA/view?utm_content=DAGdzCVtloU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he715c0cd12";
  const message = `Hi ${fname},\n\nCongratulations on taking the first step towards learning jump rope! 🎉 This course is packed with everything you need to get started and level up your skills.
\nHere’s your access link to the course: ${course_link}\n\nEnjoy the course, and feel free to reach out if you need any help!\n\nBest,\nPaul\n\nP.S. If you have any questions or need help, feel free to reply to this email. I’m here to help you!`;
  try {
    await db.query(
      "INSERT INTO client (fname,lname,email) VALUES ($1,$2,$3)",
      [fname, lname, email]
    );
    try {
      const info = await transporter.sendMail({
        from: '"Jump&Joy 🪢" <pauljumps@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Free Jump Rope Course", // Subject line
        text: message
      });
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.log(err);
    }
    res.render("validation.ejs", { name: fname });
  } catch (err) {
    console.log(err);
    res.render("index.ejs");
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});