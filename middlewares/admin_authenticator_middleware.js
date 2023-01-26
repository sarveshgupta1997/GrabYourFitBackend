const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuthenticator = (req, res, next) => {
    // console.log(req.url)
  if (
    req.url == "/users/" ||
    req.url == "/orders/all" ||
    req.url == "/orders/update" ||
    req.url == "/products/create" ||
    req.url == "/products/update" ||
    req.url == "/products/delete" ||
    req.url == "/products/all_for_admin"
  ) {
    const adminToken = req.headers.admintoken;
    if (adminToken) {
      const decode = jwt.verify(
        adminToken,
        process.env.secretKeyAdmin,
        (err, decode) => {
          if (decode) {
            next();
          } else {
            res.send({ err: "You are not authorized: Proctected Route" });
          }
        }
      );
    } else {
      res.send({ err: "You are not authorized: Proctected Route" });
    }
  } else {
    next();
  }
};

module.exports = { adminAuthenticator };
