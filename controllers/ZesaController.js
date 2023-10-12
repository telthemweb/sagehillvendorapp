const asyncHandler = require("express-async-handler");
const {vendorNumbers} = require("../utils/constants.js");
const {generateZesaVendorRefence,nowDate} = require("../utils/util.js");
const axios  =require("axios");

const getCustomer = asyncHandler(async (req, res) => {

    const { meterNumber } = req.body;
    const url = process.env.BASE_URL;


    axios.post(`${url}`,
        {
            "mti": "0200",
            "vendorReference": generateZesaVendorRefence(),
            "processingCode": "310000",
            "transactionAmount": 50000,  // this is  only specified in the documentaion but does not make sense
            "transmissionDate": nowDate(),
            "vendorNumber": vendorNumbers._demoVendorNumber,
            "merchantName": "ZETDC",
            "productName": "ZETDC_PREPAID",
            "utilityAccount": meterNumber  // this is the meter number
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
        res.send(data.data)
    })
});

 const buyToken = asyncHandler(async (req, res) => {
 	
 })


module.exports = {
	getCustomer,
	buyToken
}