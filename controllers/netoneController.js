const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateAirtimeVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");
// const  nanoid  =require('nanoid');
const netoneSouceMobile = process.env.NETONESOURCENUMBER //"263772978751";
  const url = process.env.BASE_URL;

//airtime
const netoneAirtimeControllerV2 = asyncHandler(async (req, res, next) => {
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    // validate if the paying number and the targetMobile is an econet phone number
    const netone = /^071/;  
    let method;

   


    if (econet.test(payingNumber)) { method = 'ecocash' }
    if (netone.test(payingNumber)) { method = 'onemoney' }


   if (method === "onemoney") {
    axios.post(`${url}`,
       {
        "mti": "0200",
        "vendorReference": generateAirtimeVendorRefence("netone"),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers.netone,
        "transactionAmount": cents,
        "sourceMobile": netoneSouceMobile,
        "targetMobile": `263${targetMobile.slice(1)}`,
        "utilityAccount": `263${targetMobile.slice(1)}`,
        "merchantName": "NETONE",
        "productName": "NETONE_AIRTIME",
        "transmissionDate": nowDate(),
        "currencyCode": "ZWL",
        "serviceId": "CS"

    },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {

        console.log(data.data)
        if (data.data.responseCode === "00") {
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            return res.json({
                error: "err01",
                message: data.data.narrative,
                description: data.data
            })
        }
    })
   }


});


const netoneAirtimeControllerV2USD = asyncHandler(async (req, res, next) => {
 
    const { usdamount, targetMobile, currencyCode } = req.body;

    console.log(currencyCode)

    const cents = usdamount * 100;
    axios.post(`${url}`,
       {
        "mti": "0200",
        "vendorReference": generateAirtimeVendorRefence("netone"),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers._liveVendorNumber,
        "transactionAmount": cents,
        "sourceMobile": netoneSouceMobile,
        "targetMobile": `263${targetMobile.slice(1)}`,
        "utilityAccount": `263${targetMobile.slice(1)}`,
        "merchantName": "NETONE",
        "productName": "NETONE_AIRTIME",
        "transmissionDate": nowDate(),
        "currencyCode": "ZWL",
        "serviceId": "CS"

    },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {

        console.log(data.data)
        if (data.data.responseCode === "00") {
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            return res.json({
                error: "err01",
                message: data.data.narrative,
                description: data.data
            })
        }
    })
   


});

//bundles

//zwl
const netonZwlBundleControllerV2 = asyncHandler(async (req, res, next) => {
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    // validate if the paying number and the targetMobile is an econet phone number
    const netone = /^071/;  
    let method;

   


    if (econet.test(payingNumber)) { method = 'ecocash' }
    if (netone.test(payingNumber)) { method = 'onemoney' }


   if (method === "onemoney") {
    axios.post(`${url}`,
       {
        "mti": "0200",
        "vendorReference": generateAirtimeVendorRefence("netone"),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers.netone,
        "transactionAmount": cents,
        "sourceMobile": netoneSouceMobile,
        "targetMobile": `263${targetMobile.slice(1)}`,
        "utilityAccount": `263${targetMobile.slice(1)}`,
        "merchantName": "NETONE",
        "productName": "NETONE_BUNDLE",
        "transmissionDate": nowDate(),
        "currencyCode": "ZWL",
        "serviceId": "CS"

    },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {

        console.log(data.data)
        if (data.data.responseCode === "00") {
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            return res.json({
                error: "err01",
                message: data.data.narrative,
                description: data.data
            })
        }
    })
   }


});

//USD

const netoneUsdBundleControllerV2 = asyncHandler(async (req, res, next) => {
 
    const { usdamount, targetMobile, currencyCode } = req.body;

    console.log(currencyCode)

    const cents = usdamount * 100;
    axios.post(`${url}`,
       {
        "mti": "0200",
        "vendorReference": generateAirtimeVendorRefence("netone"),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers._liveVendorNumber,
        "transactionAmount": cents,
        "sourceMobile": netoneSouceMobile,
        "targetMobile": `263${targetMobile.slice(1)}`,
        "utilityAccount": `263${targetMobile.slice(1)}`,
        "merchantName": "NETONE",
        "productName": "NETONE_AIRTIME",
        "transmissionDate": nowDate(),
        "currencyCode": "ZWL",
        "serviceId": "CS"

    },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {

        console.log(data.data)
        if (data.data.responseCode === "00") {
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            return res.json({
                error: "err01",
                message: data.data.narrative,
                description: data.data
            })
        }
    })
   


});
module.exports = {
    netoneAirtimeControllerV2,
    netoneAirtimeControllerV2USD,
    netonZwlBundleControllerV2,
    netoneUsdBundleControllerV2
}