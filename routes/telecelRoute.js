const express = require("express");
const router = express.Router();

const { telecelAirtimeControllerV2,telecelAirtimeControllerV2USD,telecelZwlBumdleControllerV2,telecelUsdBundleControllerV2 }= require("../controllers/telecelController");

router.post("/buy/airtime", telecelAirtimeControllerV2);
router.post("/buy/usd/airtime", telecelAirtimeControllerV2USD);

router.post("/buy/zwl/bundle", telecelZwlBumdleControllerV2);
router.post("/buy/usd/bundle", telecelUsdBundleControllerV2);

module.exports = router;
