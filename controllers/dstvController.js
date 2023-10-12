const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateZesaVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");
const url = process.env.BASE_URL;



const getCustomer = asyncHandler(async (req, res) => {
  const { utilityAccount } = req.body;

    axios.post(`${url}`,
        {
            "mti": "0200",
            "vendorReference": "031423091352",  // 
            "processingCode": "310000",
            "transmissionDate": nowDate(),
            "vendorNumber": vendorNumbers.dstv,
            "merchantName": "DSTV",
            "productName": "DSTV",
            "utilityAccount": utilityAccount
        },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {
        res.send(data.data)
    })
});

const payDstv = asyncHandler(async (req, res) => {
  const { amount, payingNumber, utilityAccount } = req.body;
});


module.exports = {
  getCustomer,
  payDstv,
}