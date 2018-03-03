var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
app.get("/",function(req,res){
    res.send("hello world");
    var url = 'mongodb://localhost:27017/test';

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
    //回调函数是数据库连接成功后要做的事情
    //db参数是数据库实体
    if(err){
        console.log("数据库连接失败");
        return;
    }
    console.log("数据库连接成功");
    db.collection("student").insertOne({

    },function(err,result){
        
    })
    // 插入数据
    
    db.close();
})
})
app.listen(8888,()=>console.log("Example app listening on port http://127.0.0.1:8888"))
