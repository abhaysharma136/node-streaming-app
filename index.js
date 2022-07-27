const express=require("express");
const app=express();
app.get("/",function(request,responce){
    responce.send("Welcome to Onstream");
});
app.listen(3000);