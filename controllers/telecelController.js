const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateAirtimeVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");
// const  nanoid  =require('nanoid');
const telecelSouceMobile = process.env.TELECELSOURCENUMBER //"263772978751";
  const url = process.env.BASE_URL;
//airtime

const telecelAirtimeControllerV2 = asyncHandler(async (req, res, next) => {
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    // validate if the paying number and the targetMobile is an econet phone number
    const netone = /^071/;  
    let method;

   


    if (econet.test(payingNumber)) { method = 'ecocash' }
    if (netone.test(payingNumber)) { method = 'onemoney' }
    if (netone.test(payingNumber)) { method = 'telecash' }


   if (method === "telecash") {
    axios.post(`${url}`,
       {
        "mti": "0200",
        "vendorReference": generateAirtimeVendorRefence("netone"),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers.telecel,
        "transactionAmount": cents,
        "sourceMobile": telecelSouceMobile,
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


const telecelAirtimeControllerV2USD = asyncHandler(async (req, res, next) => {
 
    const { usdamount, targetMobile, currencyCode } = req.body;

    console.log(currencyCode)

    const cents = usdamount * 100;
    axios.post(`${url}`,
       {
            "mti": "0200",
            "vendorReference": generateAirtimeVendorRefence("telecel"),
            "processingCode": "U50000",
            "vendorNumber": vendorNumbers.telecel,
            "transactionAmount": cents,
            "sourceMobile": telecelSourceMobile,
            "targetMobile": `263${targetMobile.slice(1)}`,
            "utilityAccount": `263${targetMobile.slice(1)}`,
            "merchantName": "TELECEL",
            "productName": "TELECEL_AIRTIME",
            "transmissionDate": nowDate(),
            "currencyCode": currencyCode,
            "apiVersion": "02"

        },

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
// zwl
const telecelZwlBumdleControllerV2 = asyncHandler(async (req, res, next) => {
   
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    // validate if the paying number and the targetMobile is an econet phone number
    const netone = /^071/;  
    let method;

   


    if (econet.test(payingNumber)) { method = 'ecocash' }
    if (netone.test(payingNumber)) { method = 'onemoney' }
    if (netone.test(payingNumber)) { method = 'telecash' }


   if (method === "telecash") {
    axios.post(`${url}`,
       {
        "mti": "0200",
        "vendorReference": generateAirtimeVendorRefence("netone"),
        "processingCode": "U50000",
        "vendorNumber": vendorNumbers.telecel,
        "transactionAmount": cents,
        "sourceMobile": telecelSouceMobile,
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

const telecelUsdBundleControllerV2 = asyncHandler(async (req, res, next) => {
 
    const { usdamount, targetMobile, currencyCode } = req.body;

    console.log(currencyCode)

    const cents = usdamount * 100;
    axios.post(`${url}`,
       {
            "mti": "0200",
            "vendorReference": generateAirtimeVendorRefence("telecel"),
            "processingCode": "U50000",
            "vendorNumber": vendorNumbers.telecel,
            "transactionAmount": cents,
            "sourceMobile": telecelSourceMobile,
            "targetMobile": `263${targetMobile.slice(1)}`,
            "utilityAccount": `263${targetMobile.slice(1)}`,
            "merchantName": "TELECEL",
            "productName": "TELECEL_BUNDLE",
            "transmissionDate": nowDate(),
            "currencyCode": currencyCode,
            "apiVersion": "02"

        },

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
    telecelAirtimeControllerV2,
    telecelAirtimeControllerV2USD,
    telecelZwlBumdleControllerV2,
    telecelUsdBundleControllerV2
}