const express = require("express");
const Model = require("../Model/memberModel");
// controla todos los metodos de un enrutado
const router = express.Router();

// GET all collections
// endpoint para escuchar el listdo completo
router.get("/", (req, res) => {
  Model.find()
    .then((data) => {
      res.status(200).json({
        status: "succeeded",
        data,
        error: null,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: "failed",
        data,
        error: error.message,
      });
    });
});
// // Ejemplo con Async/Await
// router.get("/", async (req, res) => {
//   try{
//     const data = await Model.find();
//     res.status(200).json({
//       status: "succeeded",
//       data,
//       error: null,
//     });
//   }catch(error){
//     res.status(404).json({
//       status: "failed",
//       data,
//       error: error.message
//     });
//   }
// });
// GET doc by id
router.get("/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) => {
      res.status(200).json({
        status: "succeeded",
        data,
        error: null,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: "failed",
        data,
        error: error.message,
      });
    });
});
// POST document
router.post("/", (req, res) => {
  const data = new Model({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
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
// UPDATE document by id
router.patch("/:id", (req, res) => {
  let id = req.params.id;
let data = req.body;
let options = {
  new: true,
}
Model.findByIdAndUpdate(id, data, options)
.then((data) => {
  res.status(200).json({
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
});

// // DELETE document by id
// router.delete("/:id", (req, res) => {

//   // res.send(`DELETE by id: ${req.params.id}`);
// });
//DELETE document
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Model.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({
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
  //res.send(Delete document by id: ${req.params.id});
});

module.exports = router;
