const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateAirtimeVendorRefence,nowDate} = require("../utils/util.js");
const Airtime = require("../models/airtime.js");
const axios  =require("axios");
const { nanoid } = require('nanoid');
const econetSouceMobile = process.env.ECONETSOURCENUMBER //"263772978751";


//zwl airtime
const econetAirtimeControllerV2 = asyncHandler(async (req, res, next) => {
   const url = process.env.BASE_URL;
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    // validate if the paying number and the targetMobile is an econet phone number
    const econet = /^077|^078/;   // regex for econet phone number
    const netone = /^071/;
    let method;
    var my_status;
    // const orderNumber = nanoid();


    if (econet.test(payingNumber)) { method = 'ecocash' }
    if (netone.test(payingNumber)) { method = 'onemoney' }


   if (method === "ecocash") {
   	axios.post(`${url}`,
        {
            "mti": "0200",
            "vendorReference": generateAirtimeVendorRefence("econet"),
            "processingCode": "U50000",
            "vendorNumber": vendorNumbers.econet,
            "transactionAmount": cents,
            "sourceMobile": econetSouceMobile,
            "targetMobile": `263${targetMobile.slice(1)}`,
            "utilityAccount": `263${targetMobile.slice(1)}`,
            "merchantName": "ECONET",
            "productName": "ECONET_AIRTIME",
            "transmissionDate": nowDate(),
            "currencyCode": "ZWL",
        },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {
const { vendorReference, transactionAmount, utilityAccount, narrative, currencyCode, sourceMobile, targetMobile, transmissionDate } = data.data;
        if (data.data.responseCode === "00") {
            new Airtime({
                orderNumber: nanoid(),
                vendorReference: vendorReference,
                type: "econet",
                amount: transactionAmount / 100,
                status: "success",
                utilityAccount: utilityAccount,
                narrative: narrative,
                currencyCode: currencyCode,
                sourceMobile: sourceMobile,
                targetMobile: targetMobile,
                date: transmissionDate
            })
                .save()
                // .then(() => {
                //     //  send SMS to client using Twilio


                //     // sendSMS(`${targetMobile}`, data.data)
                //     // using the Madyo sms gateway
                //     sendEconetSMS_Airtime(transactionAmount / 100, `${targetMobile}`)
                // })
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            // save the failed transaction in the database
                        new Airtime({
                            orderNumber: nanoid(),
                            vendorReference: vendorReference,
                            type: "econet",
                            amount: transactionAmount / 100,
                            status: "failed",
                            utilityAccount: utilityAccount,
                            narrative: narrative,
                            currencyCode: "zwl",
                            sourceMobile: sourceMobile,
                            targetMobile: targetMobile,
                            date: transmissionDate
                        })
                            .save()
            return res.json({
                error: "err01",
                message: data.data.narrative,
                description: data.data
            })
        }
        
    })
   }


});

//usd airtime
const econetAirtimeControllerV2USD = asyncHandler(async (req, res, next) => {
   const url = process.env.BASE_URL;
    const { usdamount, targetMobile, currencyCode } = req.body;

    console.log(currencyCode)

    const cents = usdamount * 100;
   	axios.post(`${url}`,
        {
            "mti": "0200",
            "vendorReference": generateAirtimeVendorRefence("econet"),
            "processingCode": "U50000",
            "vendorNumber": vendorNumbers._liveVendorNumber,
            "transactionAmount": cents,
            "sourceMobile": econetSouceMobile,
            "targetMobile": `263${targetMobile.slice(1)}`,
            "utilityAccount": `263${targetMobile.slice(1)}`,
            "merchantName": "ECONET",
            "productName": "ECONET_AIRTIME",
            "transmissionDate": nowDate(),
            "currencyCode": currencyCode,
            "apiVersion": "02"

        },
        // auth object

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {

       const { vendorReference, transactionAmount, utilityAccount, narrative, currencyCode, sourceMobile, targetMobile, transmissionDate } = data.data;
        console.log(data.data)
        if (data.data.responseCode === "00") {
             new Airtime({
                orderNumber: nanoid(),
                vendorReference: vendorReference,
                type: "econet",
                amount: transactionAmount / 100,
                status: "success",
                utilityAccount: utilityAccount,
                narrative: narrative,
                currencyCode: currencyCode,
                sourceMobile: sourceMobile,
                targetMobile: targetMobile,
                date: transmissionDate
            })
                .save()
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            new Airtime({
                            orderNumber: nanoid(),
                            vendorReference: vendorReference,
                            type: "econet",
                            amount: transactionAmount / 100,
                            status: "failed",
                            utilityAccount: utilityAccount,
                            narrative: narrative,
                            currencyCode: "zwl",
                            sourceMobile: sourceMobile,
                            targetMobile: targetMobile,
                            date: transmissionDate
                        })
                            .save()
            return res.json({
                error: "err01",
                message: data.data.narrative,
                description: data.data
            })
        }
    })
   


});

//bundles zwl
const econetZwlBundlesControllerV2 = asyncHandler(async (req, res, next) => {
   const url = process.env.BASE_URL;
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    // validate if the paying number and the targetMobile is an econet phone number
    const econet = /^077|^078/;   // regex for econet phone number
    const netone = /^071/;
    let method;
  


    if (econet.test(payingNumber)) { method = 'ecocash' }
    if (netone.test(payingNumber)) { method = 'onemoney' }


   if (method === "ecocash") {
    axios.post(`${url}`,
        {
            "mti": "0200",
            "vendorReference": generateAirtimeVendorRefence("econet"),
            "processingCode": "U50000",
            "vendorNumber": vendorNumbers.econet,
            "transactionAmount": cents,
            "sourceMobile": econetSouceMobile,
            "targetMobile": `263${targetMobile.slice(1)}`,
            "utilityAccount": `263${targetMobile.slice(1)}`,
            "merchantName": "ECONET",
            "productName": "ECONET_BUNDLE",
            "transmissionDate": nowDate(),
            "currencyCode": "ZWL",
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
   }


});


//usd bundle
const econetUsdBundleControllerV2 = asyncHandler(async (req, res, next) => {
   const url = process.env.BASE_URL;
    const { usdamount, targetMobile, currencyCode } = req.body;

    console.log(currencyCode)

    const cents = usdamount * 100;
    axios.post(`${url}`,
        {
            "mti": "0200",
            "vendorReference": generateAirtimeVendorRefence("econet"),
            "processingCode": "U50000",
            "vendorNumber": vendorNumbers._liveVendorNumber,
            "transactionAmount": cents,
            "sourceMobile": econetSouceMobile,
            "targetMobile": `263${targetMobile.slice(1)}`,
            "utilityAccount": `263${targetMobile.slice(1)}`,
            "merchantName": "ECONET",
            "productName": "ECONET_BUNDLE",
            "transmissionDate": nowDate(),
            "currencyCode": currencyCode,
            "apiVersion": "02"

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
	econetAirtimeControllerV2,
	econetAirtimeControllerV2USD,
    econetZwlBundlesControllerV2,
    econetUsdBundleControllerV2
}