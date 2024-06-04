const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const maindata = require("./maindata");
const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/leavemanagementdb");


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/create",(req,res)=>{
    console.log("1st step completed");
    res.render("front");
})

app.post("/create", async(req,res)=>{
   let userdata = req.body;
   const check = await maindata.findOne({ employeeName: req.body.employeeName});
   let bool = 0;
   if(check == null){
    bool = 0;
   }
   else{
    bool = 1; 
   }
   if(bool==0){
    let result = await maindata.insertMany(userdata);
    // console.log(result);
    res.redirect("/");
   }
   else{
    res.send("employee already exist, email, username ,id already taken");
   }
   console.log("connected");
});

    app.get("/delete",(req,res)=>{
        res.render("delete");
    });

    app.post("/delete", async(req,res)=>{
        let userdata = req.body;
        let check = await maindata.findOne({ employeeName: req.body.employeeName});
        let bool = 0;
        if(check == null){
         bool = 0;
        }
        else{
         bool = 1; 
        }
        if(bool==0){
            res.send("enter the valid info of employee , no employee of this name and id exist");
        }
        else{
        let result = await maindata.deleteOne(userdata);
         console.log(result);
        res.redirect("/");
        }
        
    });

    app.get("/", async (req,res)=>{
        const alldata = await maindata.find({});
        // console.log(alldata);
        // await maindata.save();
        // alldata.exec(function(error,data){
        //     if(error){
        //         console.log(error);
        //     }
            res.render('status',{record: alldata})
        // })
        // res.render('front');
    });

    app.get("/assign",(req,res)=>{
        res.render('assign');
    })

    app.post("/assign",async(req,res)=>{
        let employeeData = req.body.employeeName;
        let leave = req.body.assignLeave;
        let result = await maindata.findOne({employeeName : employeeData});
        console.log(employeeData);
        console.log(leave);
        console.log(result);
        if(result==null){
            res.send("enter the valid employee Name , this employee does not exist");
        }
        else{
            await maindata.updateOne({
                employeeName:employeeData
            }, {
                $set: {
                    assignLeave: leave,
                }
            })
            res.redirect('/');
        }
    })





// app.get("/login", (req,res)=>{
//     res.render("login");
// });

// app.post("/login", async (req, res) => {
//         const check = await User.findOne({ name: req.body.name });
//         if (!check) {
//             res.send("User name cannot found");
//         }
//         else if(req.body.password != check.password) {
//             res.send("wrong Password");
//         }
//         else {
//             res.send(check);
//         }
// });


app.listen(8000);