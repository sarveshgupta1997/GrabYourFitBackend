const mongoose = require("mongoose");

const adminSchema =mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    pass:String
});

const AdminModel = mongoose.model("admin",adminSchema);

module.exports={AdminModel};