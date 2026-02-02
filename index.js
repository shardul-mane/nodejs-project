

const express = require('express');
const app = express();




app.get('/', function (req,res){
   res.send("hi from server ")
});



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})