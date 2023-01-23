const mongoose = require("mongoose");

const usersSchema =mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    pass:String
});

const UserModel = mongoose.model("user",usersSchema);

module.exports={UserModel};