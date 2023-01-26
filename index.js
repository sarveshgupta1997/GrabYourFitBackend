const express = require("express");
const {connection} = require("./config/db")
const {userRoute} = require("./routes/user_route");
const {productRoute} = require("./routes/product_route");
const {orderRoute} = require("./routes/order_route");
const {adminRoute} = require("./routes/admin_route");
const {authenticator} = require("./middlewares/authenticator_middleware");
const {adminAuthenticator} = require("./middlewares/admin_authenticator_middleware");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// app.use(fileUpload({
//     useTempFiles:true
// }))

app.use(adminAuthenticator);
app.use(authenticator);
app.use("/users",userRoute);
app.use("/products",productRoute);

app.use("/orders",orderRoute);
app.use("/admin",adminRoute);

app.get("/username",(req,res)=>{
})



app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log("Error while connection to database");
        console.log({err:error})
    }
    console.log("Server is running at port:"+process.env.port)
})