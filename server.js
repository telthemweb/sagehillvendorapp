const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5600;
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.SAGEHILL_MONGODB_CONNECTION}`, { useNewUrlParser: true });
mongoose.set('strictQuery', false);
mongoose.connection.once('open', () => {
    console.log('Connected to Sagehill');
}).on('error', (error) => {
    console.log('connection error ', error);
});


const zesaRoute = require("./routes/zesaRoute");
const econetRoute = require("./routes/econetRoute");
const netoneRoute = require("./routes/netoneRoute");
const telecelRoute = require("./routes/telecelRoute");
const teloneRoute = require("./routes/teloneRoute");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/zesa", zesaRoute);
app.use("/econet", econetRoute);
app.use("/netone", netoneRoute);
app.use("/telecel", telecelRoute);
app.use("/telone", teloneRoute);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});