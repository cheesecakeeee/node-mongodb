var express = require("express");
var app = express();

var db1 = require("./model/db1.js");

app.get("/",function(req,res){
    db1.insertOne("student",{"name":"小A","age":22,"hobby":"美术"},function(err,r){
        // if(err){
        //     console.log("插入失败");
        //     return;
        // }
        res.send(r);
        console.log("插入成功");
    })
})


// app.get("/cha",function(req,res){
//     var page = req.query.page;
//     db1.find("student",{},function(err,r){
//         res.send(r);
//         console.log("查找成功");
//     })
// })

app.get("/cha",function(req,res){
    var page = parseInt(req.query.page);
    db1.find("student",{},{"pageAmount":4||{$lt:4},"page":page},function(err,r){
        res.send(r);
    })
})


app.get("/del",function(req,res){
    var name = req.query.name;
    db1.deleteMany("student",{"name":name},function(err,results){
        res.send(results);
    })
})

app.get("/xiugai",function(req,res){
    var name = req.query.name;
    db1.updateMany("student",{"name":name},{$set:{"name":"eve"}},function(err,r){
        res.send(r)
    })
})


app.listen(8888,()=>{console.log("server running at http://127.0.0.1:8888")})


