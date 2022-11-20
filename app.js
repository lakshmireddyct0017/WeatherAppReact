const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

   
})
app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const apiKey="a625656858c0622edf73deaff9c73741";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
   
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data)
            const temp=weatherdata.weather[0].description
            const temp1=weatherdata.main.temp;
            const icon=weatherdata.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Current Weather is"+temp+"</h1>");
            res.write("<h1> temperature in"+query+"is"+temp1+"</h1>");
            res.write("<img src="+imageurl+">");
            res.send();

        })
    }) 

})



app.listen(3000,function(){
    console.log("lsitening to server");
})