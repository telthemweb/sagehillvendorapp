const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const dstvSchema = new Schema({
    orderNumber: String,

    mti: String,
    vendorReference: String,
    processingCode: String,
    transactionAmount: Number,
    transmissionDate: String,
    vendorNumber: String,
    transactionReference: String,
    responseCode: String,
    merchantName: String,
    utilityAccount: String,
    narrative: String,
    token: String,
    currencyCode: String,
    sourceMobile: String,
    productName: String,
    receiptNumber: String,



});

const dstvModel = mongoose.model('dstv', dstvSchema);
module.exports = {
  dstvModel
}


