var express = require("express");
var app = express();

var db1 = require("./model/db1.js");

var formidable = require('formidable'); //文件上传
// 设置后台模板引擎
app.set("view engine","ejs");

// 静态
app.use(express.static("./public"));
// 显示留言列表
app.get("/",function(req,res,next){
    res.render("index");
    // 新增留言
})

app.get("/du",function(req,res,next){
    // 查（读取）数据库
    db1.find("liuyanban",{},function (err,result) {
        res.json({"result":result});
    })
})

// 处理留言
app.post("/liuyan",function(req,res,next){          
    // 文件上传组件
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields) {
        // 收到请求后写入数据库
        db1.insertOne("liuyanban",{
            "name":fields.name,
            "message":fields.message
        },function(err,r){  
            if(err){
                res.json(-1);   //-1返回给ajax 前端
            }
            res.json(1);
        })
        // console.log("收到留言"+fields.name+ fields.message);
    });
})

// 删除留言]



app.listen(8888,()=>{console.log("server running at http://127.0.0.1:8888")});