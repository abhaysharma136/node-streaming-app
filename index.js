const express=require("express");
const app=express();
app.get("/",function(request,responce){
    responce.send("Hello World");
});
app.listen(3000);