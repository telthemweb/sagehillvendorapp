const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const airTimeSchema = new Schema({

    orderNumber: String,
    vendorRefence: String,
    type: String,  // econet, telecel, netone
    amount: Number,  // this will be in cents,
    status: String,  // this will be taken from the response code
    utilityAccount: String,  // number to send airtime to 
    narrative: String,
    currencyCode: String,
    sourceMobile: String,
    targetMobile: String,  // number to send airtime to .. same as the utility account
    date: String,
    channel: String

});

const Airtime = mongoose.model('Airtime', airTimeSchema);


export default Airtime;
