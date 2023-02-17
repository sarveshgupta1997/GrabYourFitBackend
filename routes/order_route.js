const express = require("express");
const {OrderModel} = require("../model/orderModel");
const {ProductModel} = require("../model/productModel");
const {productRoute} = require("../routes/product_route");

const orderRoute=express.Router();

orderRoute.get("/",async(req,res)=>{
    try {
        const data = await OrderModel.find({user_id:req.body.user_id});
        res.send(data);
    } catch (error) {
        res.send({err:"Eroor while getting orders"});
        console.log({err:error})
    }
})

// For Admin only
orderRoute.get("/all",async(req,res)=>{
    try {
        const data = await OrderModel.find();
        res.send(data);
    } catch (error) {
        res.send({err:"Eroor while getting orders"});
        console.log({err:error})
    }
})

orderRoute.post("/create",async(req,res)=>{
    let payload=req.body;
    console.log(payload)
    payload.order_date=get_date();
    payload.order_time=get_time();
    payload.order_status="In Progress"; 
    payload.order_delivery_date="Not Delivered"; 
    try {
        await ProductModel.updateOne({_id:payload.product_id},{$inc:{purchases:1}});
        const orders = new OrderModel(payload);
        await orders.save   ();
        res.send({Message:` Order Sucessfull-${payload.title}`});
    } catch (error) {
        res.send({err:"Eroor while creating order"})
        console.log({err:error})
    }
})

orderRoute.patch("/update",async(req,res)=>{
    console.log("hi")
    let payload={
        order_status:"Delivered", 
        order_delivery_date:get_date()
    }
    ID=req.headers.order_to_update;
    try {
        await OrderModel.findByIdAndUpdate({_id:ID},payload);
        res.send({"message":`Order Updated with id:${ID}`});
    } catch (error) {
        console.log({err:error})
        res.send({err:"Error while updating order"})
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

module.exports={orderRoute};