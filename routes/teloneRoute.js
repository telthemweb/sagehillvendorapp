const express = require("express");
const router = express.Router();

const { getProducts,getCustomer,payTelone }= require("../controllers/teloneController");

router.post("/products", getProducts);
router.post("/getCustomer", getCustomer);
router.post("/pay", payTelone);

module.exports = router;