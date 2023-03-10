const mongoose = require("mongoose");

const orderSchema =mongoose.Schema({
    title:String,
    price:String,
    user_id:String,
    user:String,
    product_id:String,
    img1_src:String,
    order_date:String,
    order_time:String,
    order_status:String,
    order_delivery_date:String
});

const OrderModel = mongoose.model("order",orderSchema);

module.exports={OrderModel};