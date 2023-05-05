const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { log } = require("console");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){

    app.use(express.static(__dirname+"/public"));   

     res.sendFile(__dirname+"/public/signup.html");
});




app.post("/",function(req,res){

    
    console.log(req.body);
    
    const FName=req.body.fname;
    const LName=req.body.lname;
    const mail=req.body.email;
    const pasw=req.body.pwd;

    const data={
        members:[
           
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                       
                    FNAME:FName,
                    LNAME:LName
                }
            }
        
        ]
              
        
    };

    const jsonData=JSON.stringify(data);

    const URL="https://us11.api.mailchimp.com/3.0/lists/471c42fbee";
    const options={
            method:"POST",
            auth:"Ankit10:84601f003abcf290a656fccd562eabb9-us11"
    }


  const request= https.request(URL,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/public/success.html");
       }else{
        res.sendFile(__dirname+"/public/failure.html");
       } 

      
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
   
   });


  // request.write(jsonData);
   request.end();

    
   

   
});


app.listen(3000,function(){
    console.log("The server runs at port 3000");
});


app.post("/failure",function(req,res){
    res.redirect("/");
})

// List Id or Audience Id
// 471c42fbee


// API KEY
// 84601f003abcf290a656fccd562eabb9-us11