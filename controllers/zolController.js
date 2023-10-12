const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateZesaVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");



const getCustomer = asyncHandler(async (req, res) => {
  
});

const payTelone = asyncHandler(async (req, res) => {
  
});


module.exports = {
  getCustomer,
  payTelone,
}