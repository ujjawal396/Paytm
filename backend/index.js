const express = require("express");
const router = require("./routes/index.js");
const cors=require("cors");



const app=express();
const PORT=3000;
app.use(express.cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",router);


app.listen(PORT);




