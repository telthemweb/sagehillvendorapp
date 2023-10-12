const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateTeloneVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");

const url = process.env.BASE_URL;
const prourl = process.env.BASE_URL+"/billpayments/products/merchant/TELONE";
const getProducts = asyncHandler(async (req, res) => {
   axios.post(`${prourl}`,
        
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

const getCustomer = asyncHandler(async (req, res) => {
   const { utilityAccount } = req.body;

    axios.post(`${url}`, {

        "mti": "0200",
        "vendorReference": generateTeloneVendorRefence(),
        "processingCode": "310000",
        "transmissionDate": nowDate(),
        "vendorNumber": vendorNumbers._demoVendorNumber,
        "merchantName": "TELONE",
        "utilityAccount": `${utilityAccount}`
    },
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

const payTelone = asyncHandler(async (req, res) => {
  const { amount, productName, sourceMoblie, utilityAccount } = req.body;
    const cents = amount * 100;

    axios.post(`${url}`, {
        "mti": "0200",
        "vendorReference": generateTeloneVendorRefence(),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers._demoVendorNumber,
        "transactionAmount": cents,
        "sourceMobile": `${sourceMoblie}`,
        "merchantName": "TELONE",
        "productName": `${productName}`,
        "utilityAccount": `${utilityAccount}`,
        "transmissionDate": nowDate(),
        "currencyCode": "ZWL",
        "requiresVoucher": "true"
    },
        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }

    ).then(data => {
        res.send(data.data)
    })
        .catch(err => {
            res.send(err)
        })
});


module.exports = {
  getProducts,
  getCustomer,
  payTelone,
}