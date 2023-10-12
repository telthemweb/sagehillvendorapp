const dotenv = require("dotenv").config();
const axios = require("axios");
const Twilio = require("twilio");
const load = require("cheerio");
const Paynow = require("paynow");


const randomString = (length, chars) => {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

 const generateAirtimeVendorRefence = (ref) => {


    let reference;
    const econet = "ECONET";
    const netone = "liveNetOne";
    const _telecel = "TELECEL";


    switch (ref) {
        case 'econet':
            reference = econet
            break;

        case 'netone':
            reference = netone
            break

        case 'telecel':
            reference = _telecel
            break

        default:
            break;
    }

    const newRef = reference + randomString(16, 'aA')

    reference = null;
    return newRef;

}

 const generateZesaVendorRefence = () => {

    let reference = 'ZETDC_';
    const newRef = reference + randomString(16, 'aA')
    return newRef;

}
 const generateTeloneVendorRefence = () => {

    let reference = 'TELONE';
    const newRef = reference + randomString(16, 'aA')
    return newRef;

}


 const generatePolicyVendorRefence = () => {

    let reference = 'LIFE';
    const newRef = reference + randomString(16, 'aA')
    return newRef;

}

const getTimeFormat = (today) => {
    const time = `${today.getHours()}${today.getMinutes()}${today.getSeconds()}`

    return time;


}

const nowDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const formatedDate = mm + dd + yyyy + getTimeFormat(today);
    return formatedDate
}

const sendEconetSMS_Airtime = (transactionAmount, number) => {

    const sms = `Airtime Credited with $${transactionAmount}.00`;
    const baseSmsUrl = "https://europe-west2-projectx-ussd-game.cloudfunctions.net/send_econet_sms_message";

    axios.post(`${baseSmsUrl}`, {
        sms: sms,
        number: number,
        title: "From Sagehill Technologies"
    }).then()
        .catch(err => {
            console.log('failed to send sms using the econet gateway ', err)
        })


}


 const smsGateway = (data, number) => {

    const econet = /^077|^078/;
    // const telecel = /^073/;
    // const netone = /^071/;

    const sms = data;   // send the data to be sent as a string
    const baseSmsUrl = econetSMSGatewayUrl;
    const currentTime = new Date();
    if (econet.test(number)) {
        //  this is an econet number
        // do send the message using the ecoent gateway 
        axios.post(`${baseSmsUrl}`, {
            sms: sms,
            number: number,
            title: "From Sagehill Technologies"
        }).then()
            .catch(err => {
                console.log(err)
            });

    } else {
        //  send an sms using the e solution gateway
        axios.post(`${eSolutionsSmsGatewayUrl}`,
            {
                "originator": "Sagehill Technologies",
                "destination": `${number}`,
                "messageText": sms,
                "messageReference": nanoid(10),
                "messageDate": nowDate(),
                "messageValidity": "03:00",
                "sendDateTime": `${currentTime.getHours()}:${currentTime.getMinutes()}`
            },
            {
                auth: {
                    username: process.env.SAGEHILL_SMS_USERNAME,
                    password: process.env.SAGEHILL_SMS_PASSWORD
                }
            }
        )
            .then(data => {
                if (data.data.status === "FAILED") {
                    console.log("failed to send message using the e solution gateway ", data.data.narrative)
                }
            })
            .catch(err => {
                console.log(err) // put this in logger file.. and save them to the database
            })
    }


}


module.exports = {
	randomString,
	generateAirtimeVendorRefence,
	generateZesaVendorRefence,
	generateTeloneVendorRefence,
	nowDate,
    sendEconetSMS_Airtime,
    smsGateway
}