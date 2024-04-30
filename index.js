const express = require("express")
const app = express();
const router = require("./src/routers")
require("./src/db/connection");
const cors = require('cors');
const useragent = require('express-useragent');
const axios = require('axios');

const port = 80;

app.set('trust proxy', true);
app.use(useragent.express());

// Middleware to get location information
app.use(async (req, res, next) => {
    try {
        const ipAddress = req.ip; // Get client's IP address
        const ipInfoResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
        req.location = ipInfoResponse.data;
        next();
    } catch (error) {
        console.error('Error getting location:', error);
        req.location = null;
        next();
    }
});

app.use((req, res, next) => {
    const userAgentString = req.headers['user-agent'];
    req.useragent = useragent.parse(userAgentString);
    next();
});



app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    const ipAddress = req.ip;
    const userAgent = req.useragent;
    const location = req.location;

    const device = userAgent.isDesktop ? 'Desktop' : userAgent.isMobile ? 'Mobile' : 'Tablet';
    const os = userAgent.os.toString();
    const browser = userAgent.browser;

    const requestData = {
        ipAddress,
        device,
        os,
        browser,
        location
    };

    res.json(requestData);
});


app.use("/api", router)

app.listen(port, () => {
    console.log("server is running on " + port)
});