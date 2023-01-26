const express = require("express");
const {AdminModel} = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

const adminRoute=express.Router();

adminRoute.post("/register",async(req,res)=>{
    let {fname,lname,email,pass}=req.body;
    try {
        saltRoute = +process.env.saltRoute;
        // Hashing - encrypting using bcrypt
        bcrypt.hash(pass, saltRoute, async function(err, secure_pass) {
            if(err){
                console.log(err);
            }else{
                const admin = new AdminModel({fname,lname,email,pass:secure_pass});
                await admin.save();
                res.send({Message:`Registration Sucessful`});
            }
        });
    } catch (error) {
        res.send("Eroor while registering admin")
        console.log({err:error})
    }
})

adminRoute.post("/login",async(req,res)=>{
    try {
        const {email,pass} = req.body;
        let admin = await AdminModel.find({email});
        if(admin.length>0){
            // Hashing - decrypting using bcrypt
            bcrypt.compare(pass, admin[0].pass, (err,result)=> {
                if(result){
                    const adminToken = jwt.sign({ admin_id: admin[0]["_id"] }, process.env.secretKeyAdmin);
                    // console.log({"msg":`${admin[0].fname}'s Login Successful`,"adminToken":adminToken}) 
                    res.send({"msg":`${admin[0].fname}'s Login Successful`,"adminToken":adminToken}); 
                }else{
                    res.send({err:"Wrong Admin Credentials"});
                }               
            })
        }else{
            res.send({err:"Wrong Admin Credentials"});
        }
    } catch (error) {
        console.log({err:error})
        res.send({err:"Eroor while Admin login"})
    }
})

// adminRoute.patch("/update/:id",async(req,res)=>{
//     let {fname,lname,email,pass}=req.body;
//     let ID=req.params.id;
//     try {
//         saltRoute = +process.env.saltRoute;
//         //for case when admin is not upaditng pass but bcrypt is working two times
//         if(pass.length>15){
//             await AdminModel.findByIdAndUpdate({_id:ID},{fname,lname,email,pass  });
//             res.send({Message:`Profile Updated`});
//         }else{
//             bcrypt.hash(pass, saltRoute, async function(err, secure_pass) {
//                 if(err){
//                     console.log(err);
//                 }else{
//                     await AdminModel.findByIdAndUpdate({_id:ID},{fname,lname,email,pass:secure_pass});
//                     res.send({Message:`Profile Updated`});
//                 }
//             });
//         }
//     } catch (error) {
//         res.send("Eroor while updating admin")
//         console.log({err:error})
//     }
// })

module.exports={adminRoute};