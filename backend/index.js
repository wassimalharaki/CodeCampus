const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/CodeCampus`)
.then(console.log("Connected to DB"))
.catch((err) => console.log(err));

const auth_route = require("./routes/authentication");
const prob_route = require("./routes/problem");
const user_route = require("./routes/user");
const sub_route = require("./routes/submission");
const exam_route = require("./routes/exam");
app.use("/api/auth", auth_route);
app.use("/api/problem", prob_route);
app.use("/api/user", user_route);
app.use("/api/submission", sub_route);
app.use("/api/exam", exam_route);

app.listen(3001, () => {
    console.log(`Listening on http://localhost:3001/`);
});