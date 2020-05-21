const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https");


const app = express();

//to use static file
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscibed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = `https://us18.api.mailchimp.com/3.0/lists/a2fef79412`;

    const options = {
        method: "POST",
        auth: `arjun:b9838e0f5fe695b4491358e3ca7ee42b-us18`
    };

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", (data) => {

        })

    });

    request.write(jsonData);
    request.end();
       
});

   
    
    


//redirection post after failure
app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 1000, function(){
    console.log("Running at 1000");
    
});


