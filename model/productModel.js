const mongoose = require("mongoose");

const productSchema =mongoose.Schema({
    title:String,
    price:String,
    desc:String,    
    brand:String,    
    category:String,
    img1_src:String,
    img2_src:String,
    status:String,
    created_date:String,
    created_time:String,
    last_updated_date:String,
    last_updated_time:String
});

const ProductModel = mongoose.model("product",productSchema);

module.exports={ProductModel};