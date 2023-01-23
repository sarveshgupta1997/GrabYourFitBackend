const express = require("express");
const {ProductModel} = require("../model/productModel");

const productRoute=express.Router();
// var cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//     cloud_name: 'dbe2oyd2v', 
//     api_key: '311935573847851', 
//     api_secret: 'RxvdbSVK75Ti3lGWrHOo-BbNEXg',
//     secure: true
// });

productRoute.get("/",async(req,res)=>{
    try {
        const data = await ProductModel.find();
        res.send(data);
    } catch (error) {
        res.send({err:"Eroor while getting products"});
        console.log({err:error})
    }
})
function get_date(){
    let date= new Date();
    var year = date.getFullYear();
    var mes = date.getMonth()+1;
    var dia = date.getDate();
    var today =dia+"-"+mes+"-"+year;
    return today;
}
function get_time(){
    let date= new Date();    
    let hours= date.getHours();
    let mins= date.getMinutes();
    let sec= date.getSeconds();
    var time = hours+":"+mins+":"+sec;
    return time;
}
productRoute.post("/create",async(req,res)=>{
    let payload=req.body;
    payload.created_date=get_date();
    payload.created_time=get_time();
    try {
        const product = new ProductModel(payload);
        await product.save();
        res.send({Message:` Product-${payload.title} created`});
    } catch (error) {
        res.send({err:"Eroor while creating product"})
        console.log({err:error})
    }
})

// productRoute.post("/create",async(req,res)=>{
//     let payload=req.body;
//     console.log(payload)
//     console.log(req.files)
//     // console.log(payload,req.files.img_src.tempFilePath)
//     // req.files.tempFilePath
//                 // console.log(payload)
//     // console.log(req.files);
//     try {
//         // const file = req.files.img_src;
//         // cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{
//         cloudinary.uploader.upload("payload.img_src",async (err,result)=>{
//             if(result){
//                 // payload.img_src=result.url;
//                 console.log(result)
//                 const product = new ProductModel(payload);
//                 await product.save();
//                 res.send({Message:` Product-${payload.title} created`});
//             }else{
//                 res.send({err:err})
//             }
//         })
//         // const product = new ProductModel(payload);
//         // await product.save();
//         // res.send({Message:` Product-${payload.title} created`});
//     } catch (error) {
//         res.send({err:"Eroor while creating product"})
//         console.log({err:error})
//     }
// })

productRoute.patch("/update/:id",async(req,res)=>{
    let payload=req.body;
    
    payload.last_updated_date=get_date();
    payload.last_updated_time=get_time();
    ID=req.params.id;
    try {
        let product= await ProductModel.findByIdAndUpdate({_id:ID});
        let userID_in_product= product["user_id"];
        let userID_from_jwt= req.body["user_id"];
        if(userID_in_product==userID_from_jwt){
            await ProductModel.findByIdAndUpdate({_id:ID},payload);
            res.send({"message":`product Updated with id:${ID}`});
        }else{
            res.send({err:"You are not allowed to perform editing in someone's else products"});
        }
    } catch (error) {
        console.log({err:error})
        res.send("Error while updating product")
    }
})

productRoute.delete("/delete/:id",async(req,res)=>{
    ID=req.params.id;
    try {
        let product= await ProductModel.findByIdAndUpdate({_id:ID});
        let userID_in_product= product["user_id"];
        let userID_from_jwt= req.body["user_id"];
        if(userID_in_product==userID_from_jwt){
            await ProductModel.findByIdAndDelete({_id:ID});
        res.send({"message":`product Deleted with id:${ID}`});
        }else{
            res.send({err:"You are not allowed to perform editing in someone's else products"});
        }
        
    } catch (error) {
        console.log({err:error})
        res.send("Error while Deleting product")
    }
})




module.exports={productRoute};