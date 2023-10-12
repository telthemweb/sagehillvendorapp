const express = require("express");
const router = express.Router();

const { netoneAirtimeControllerV2,netoneAirtimeControllerV2USD,netonZwlBundleControllerV2,netoneUsdBundleControllerV2 }= require("../controllers/netoneController");

router.post("/buy/airtime", netoneAirtimeControllerV2);
router.post("/buy/usd/airtime", netoneAirtimeControllerV2USD);

router.post("/buy/zwl/bundle", netonZwlBundleControllerV2);
router.post("/buy/usd/bundle", netoneUsdBundleControllerV2);

module.exports = router;
