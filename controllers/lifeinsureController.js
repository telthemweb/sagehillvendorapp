const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateZesaVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");



const moonlightGetCustomer = asyncHandler(async (req, res) => {
  
});

const nyaradzotGetCustomer = asyncHandler(async (req, res) => {
  
});


const payNyaradzo = asyncHandler(async (req, res) => {
  
});

const payMoonlight = asyncHandler(async (req, res) => {
  
});


module.exports = {
  moonlightGetCustomer,
nyaradzotGetCustomer,
payNyaradzo,
payMoonlight,
}