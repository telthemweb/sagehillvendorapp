const express = require("express");
const router = express.Router();

const { econetAirtimeControllerV2,econetAirtimeControllerV2USD,econetZwlBundlesControllerV2,econetUsdBundleControllerV2 }= require("../controllers/econetController");

router.post("/buy/airtime/v2", econetAirtimeControllerV2);
router.post("/buy/usd/airtime", econetAirtimeControllerV2USD);

router.post("/buy/zwl/bundle", econetZwlBundlesControllerV2);
router.post("/buy/usd/bundle", econetUsdBundleControllerV2);

module.exports = router;
