const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req,res,next)=>{
    // console.log(req.url)
    if(req.url=="/orders/" || req.url=="/username" || req.url=="/orders/create"){
        const token = req.headers.token;
        if(token){
            const decode = jwt.verify(token,process.env.secretKey,(err,decode)=>{
                if(decode){
                    //for getting username
                    if(req.path=="/username"){
                        res.send({"user":`${decode.loggedUser}`});
                    }
                    
                    req.body.user_id=decode.user_id;

                    next();
                }else{
                    res.send({"err":"Please Login First"})
                }
            })
            
        }else{
            res.send({"err":"Please Login First"})
        }
    }
    else{
        next();
    }
}

module.exports={authenticator};