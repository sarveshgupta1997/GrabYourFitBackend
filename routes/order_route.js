const express = require("express");
const {OrderModel} = require("../model/orderModel");

const orderRoute=express.Router();

orderRoute.get("/",async(req,res)=>{
    console.log(req.body.user_id)
    try {
        const data = await OrderModel.find({user_id:req.body.user_id});
        res.send(data);
    } catch (error) {
        res.send({err:"Eroor while getting products"});
        console.log({err:error})
    }
})

orderRoute.get("/all",async(req,res)=>{
    try {
        const data = await OrderModel.find();
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

orderRoute.post("/create",async(req,res)=>{
    let payload=req.body;
    console.log(payload)
    payload.order_date=get_date();
    payload.order_time=get_time();
    try {
        const product = new OrderModel(payload);
        await product.save();
        res.send({Message:` Order Sucessfull-${payload.title}`});
    } catch (error) {
        res.send({err:"Eroor while creating order"})
        console.log({err:error})
    }
})


module.exports={orderRoute};