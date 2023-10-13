const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {telgenerateRandomString} = require("../utils/util.js");
const {generateAirtimeVendorRefence,nowDate} = require("../utils/util.js");
const { Airtime } = require("../models/airtime.js");
const axios  =require("axios");
const econetSouceMobile = process.env.ECONETSOURCENUMBER //"263772978751";
 const url = process.env.BASE_URL;

//zwl airtime
const econetAirtimeControllerV2 = asyncHandler(async (req, res, next) => {
    const { amount, targetMobile, payingNumber } = req.body;
    const cents = amount * 100;
    const econet = /^077|^078/; 
    let method;
    var my_status;
    // const orderNumber = telgenerateRandomString(10);


    if (econet.test(payingNumber)) { method = 'ecocash' }


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

        {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }



    ).then(data => {
const { vendorReference, transactionAmount, utilityAccount, narrative, currencyCode, sourceMobile, targetMobile, transmissionDate } = data.data;
        if (data.data.responseCode === "00") {
            Airtime.create({
                orderNumber: telgenerateRandomString(10),
                vendorReference: vendorReference,
                type: "econet",
                amount: transactionAmount / 100,
                status: "success",
                utilityAccount: utilityAccount,
                narrative: narrative,
                currencyCode: "ZWL",
                sourceMobile: sourceMobile,
                targetMobile: targetMobile,
                date: transmissionDate
            });
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            // save the failed transaction in the database
                        Airtime.create({
                            orderNumber: telgenerateRandomString(10),
                            vendorReference: vendorReference,
                            type: "econet",
                            amount: transactionAmount / 100,
                            status: "failed",
                            utilityAccount: utilityAccount,
                            narrative: narrative,
                            currencyCode: "ZWL",
                            sourceMobile: sourceMobile,
                            targetMobile: targetMobile,
                            date: transmissionDate
                        })
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
             Airtime.create({
                orderNumber: telgenerateRandomString(10),
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
            res.send(data.data)
        }
        else{
            console.log("General Error.. response code 05")
            Airtime.create({
                            orderNumber: telgenerateRandomString(10),
                            vendorReference: vendorReference,
                            type: "econet",
                            amount: transactionAmount / 100,
                            status: "failed",
                            utilityAccount: utilityAccount,
                            narrative: narrative,
                            currencyCode: currencyCode,
                            sourceMobile: sourceMobile,
                            targetMobile: targetMobile,
                            date: transmissionDate
                        })
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
}