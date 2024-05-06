const express = require("express")
const app = express();
const geoip = require('geoip-lite');

const router = require("./src/routers")
require("./src/db/connection");
const cors = require('cors');
const useragent = require('express-useragent');
const axios = require('axios');
const path = require("path")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT;

// app.set('trust proxy', true);
app.use(useragent.express());






function getIpLocation(ipAddress) {
    // Remove '::ffff:' prefix if present
    ipAddress = ipAddress.replace(/^::ffff:/, '');
    
    const geo = geoip.lookup(ipAddress);
    if (geo) {
        return {
            ip: geo.ip,
            city: geo.city,
            region: geo.region,
            country: geo.country,
            ll: geo.ll, // Latitude and Longitude
            timezone: geo.timezone
        };
    } else {
        console.log('Location not found.');
        return null;
    }
}


// Middleware to get location information
app.use(async (req, res, next) => {
    try {
        const ipAddress = req.ip; // Get client's IP address
        const ipInfoResponse = getIpLocation(ipAddress);
        console.log(ipInfoResponse);
        req.details = ipInfoResponse;
        next();
    } catch (error) {
        console.error('Error getting location:', error);
        req.location = null;
        next();
    }
});

app.use('/', express.static(path.join(__dirname, "frontend/dist")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});

app.use((req, res, next) => {
    const userAgentString = req.headers['user-agent'];
    req.useragent = useragent.parse(userAgentString);
    next();
});



app.use(cors());
app.use(express.json());





app.use("/api", router)

app.listen(port, () => {
    ("server is running on " + port)
});