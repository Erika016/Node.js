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
  res.send("POST document");
});
// UPDATE document by id
router.patch("/:id", (req, res) => {
  res.send(`UPDATE by id: ${req.params.id}`);
});
// DELETE document by id
router.delete("/:id", (req, res) => {
  res.send(`DELETE by id: ${req.params.id}`);
});

module.exports = router;
