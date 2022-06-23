const e=require('express');
const app=e();

console.log("hello world");
var a=11;
var b=-1;
console.log(a+b);

//using a module for adding two numbers
var abc=require('./add')
console.log('the sum '+abc.add_feature(12,-2));

app.get('/',function(req,res){
    res.json({
        success:1,
        message:"hoi"
    });
})

app.get('/alien/:id',function(req,res){
    const id=req.params.id;
    if(id==1){
        res.send('number '+id);
    }
    else if(id==2){
        res.send('number '+id);
    }
    else{
        res.send('number (other than 1 and 2) is '+id);
    }
})


app.get('/alien',function(req,res){
    const user_name=req.query.name;
    const user_role=req.query.role;
    res.send('user name value is '+user_name+' AND user role is '+user_role);
})


//File handling

var fs=require('fs')
fs.readFile('add.js','utf8',function(err,data){
  console.log('file data red '); 
});


fs.appendFile('add.js','console.log("appended statement")',function(err,data){
  console.log('statement appended ');
});

