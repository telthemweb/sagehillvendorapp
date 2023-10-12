 const MTI = {
    transactionRequest: "0200",
    transactionResponse: "0210",
    transactionResendRequest: "0201",
    transactionResendResponse: "0211"

}

 const processingCodes = {
    vendorBalanceEnquiry: "300000",
    customerInfomation: "310000",
    lastCustomerToken: "320000",
    tokenPuchaseRequest: "U50000"
}

 const responseCodes = {
    "00": "Transaction Successful",
    "05": "Error",
    "09": "Transaction still in progress",
    "14": "Invalid meter number",
    "68": "Transaction timeout",
    "94": "Dublicate transaction"
}


 const testVendorNumber = "VE19257147501";

 const vendorNumbers = {
    econet: "VE19257147501",//VE19257147501
    netone: 'VE19257147502',
    telecel: "VE19257147503",
    zetdc: '',
    dstv: 'VE19217695801',
    moonlight: '',
    nyaradzo: '',
    telone: 'VE19257147501',
    lifeAssurrance: "LIFEASSURERANCE",

    _liveVendorNumber: "VE28436262401",
    _demoVendorNumber: "VE19217695801"

}
module.exports = {
    MTI,
processingCodes,
responseCodes,
vendorNumbers,
}