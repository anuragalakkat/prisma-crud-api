const express=require("express");

const app=express();

const cors=require("cors");

app.use(express.json());

app.use(cors());

app.use('/api/books', require('./routes/books'));

app.listen(5000, function(req, res){
    console.log("server is running on port 3000");
});