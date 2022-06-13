const express = require("express");
const Model = require("../Model/loginModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// controla todos los metodos de un enrutado
const router = express.Router();
// User register/ REGISTRO DE USUARIO
router.post("/new", async (req, res)=>{
// POST document
    const data = new Model({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role
    });
    data.save()
    .then((data) => {
      res.status(201).json({
        status: "succeeded",
        data,
        error: null,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: "failed",
        error,
        error: error.message,
      });
    });
  //res.send("Post document");
  });

//   NUEVO LOGIN
router.post("/", (req, res)=>{
    Model.find({
        "email":req.body.email}).exec().then((result)=>{
            console.log(result);
            if(result.length > 0){
                bcrypt.compare(req.body.password, result[0].password, (error, response)=>{
                    if(error){
                        res.status(404).json({
                            status: "failed",
                            data: result[0],
                            error: error.message,
                          });
                    } else if(response){
                        res.status(201).json({
                            status: "succeeded",
                            // ROLE USUARIO y generar token
                            data: jwt.sign({
                                role: result[0].role,
                            }, process.env.SECRET, {
                                expiresIn: "15m"
                            }),
                            error: null,
                          });
                    } else if{
                        res.status(403).json({
                            status: "failed",
                            error,
                            error: "Wrong username os password"
                })
            } else {
                res.status(403).json({
                    status: "failed",
                    error,
                    error: "Wrong username os password"
        })
            }
        })
        .then((data) => {
          res.status(201).json({
            status: "succeeded",
            data,
            error: null,
          });
        })
        .catch((error) => {
          res.status(404).json({
            status: "failed",
            error,
            error: error.message,
          });
        });
      //res.send("Post document");
      });
  module.exports = router;