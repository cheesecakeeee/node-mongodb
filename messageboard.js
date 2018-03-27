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
    // res.render("index");
    // 后台读取数量，/每页数量 向上取整得到页数,传递给前端渲染页码
    db1.getAllCount("liuyanban",function(count){
        res.render("index",{
            "pageNum":Math.ceil(count/5)
        });
    })
    
    // 新增留言
})
// 读取留言 读取的集合，条件，排序方式（决定了页面留言从数据库读取的排序方式展示方式），回调
app.get("/du",function(req,res,next){
    // 查（读取）数据库
    var page = parseInt(req.query.page);
    db1.find("liuyanban",{},{"sort":{"sub_time":-1},"pageAmount":5,"page":page},function (err,result) {
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
            "message":fields.message,
            "sub_time":new Date()   //时间存入数据库
        },function(err,r){  
            if(err){
                res.json(-1);   //-1返回给ajax 前端
            }
            res.json(1);
        })
        // console.log("收到留言"+fields.name+ fields.message);
    });
})
// 获取留言总数

// 删除留言]



app.listen(8888,()=>{console.log("server running at http://127.0.0.1:8888")});