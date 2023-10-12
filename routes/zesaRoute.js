const express = require("express");
const router = express.Router();

const { getCustomer }= require("../controllers/ZesaController");

router.post("/getCustomer", getCustomer);

module.exports = router;
