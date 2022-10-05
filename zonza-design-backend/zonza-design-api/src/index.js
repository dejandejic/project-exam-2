const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const expressValidator = require("express-validator");
global.connectPool = require("./db/connection");

const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const ContactRoutes = require("./routes/contact");
const CustomerRoutes = require("./routes/customer");
const FeedbackRoutes = require("./routes/feedback");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use(expressValidator());
app.use(cors());
console.log(path.join("../", __dirname, "uploads"));
app.use(express.static(path.join(__dirname, "../", "uploads")));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(
    express.json({
        // We need the raw body to verify webhook signatures.
        // Let's compute it only when hitting the Stripe webhook endpoint.
        verify: function (req, res, buf) {
            if (req.originalUrl.startsWith("/webhook")) {
                req.rawBody = buf.toString();
            }
        },
    })
);

app.use(AuthRoutes);
app.use(UserRoutes);
app.use(CustomerRoutes);
app.use(ContactRoutes);
app.use(FeedbackRoutes);
app.listen(port, () => {
    console.log("server is up on port " + port);
});
