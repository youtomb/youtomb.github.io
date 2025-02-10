const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const QRCode = require('qrcode');
const corsAnywhere = require('cors-anywhere');
const bodyParser = require('body-parser');
const oauthRouter = require('./oauth_api_v3_api.js');
const leanbackAjaxRouter = require('./leanback_ajax_api');
const gdataVideoFeedDetails = require('./gdata_video_feed_details');
const gdataVideoFeedSearch = require('./gdata_video_feed_search');

const { handleGetVideoInfo } = require('./get_video_info');

const settingsPath = path.join(__dirname, 'settings.json');

let settings;

if (!fs.existsSync(settingsPath)) {
    const defaultSettings = { 
        serverIp: 'localhost'   
    };
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 4));
    console.log("Created settings.json with default serverIp = localhost and expBrowse = false.");
    settings = defaultSettings;
} else {
    settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    console.log(`Current settings in settings.json: ${JSON.stringify(settings, null, 4)}`);
}

const serverIp = settings.serverIp || "localhost";

console.log("Loaded Server IP:", serverIp);

const app = express();
const port = 8090;
const logsDir = path.join(__dirname, 'logs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../assets')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'credentialless');
    next();
});

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.originalUrl}`);
    next();
});

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const server = corsAnywhere.createServer({
    originWhitelist: [`http://${serverIp}:8090`, '*', '""', '', 'null', "null"],
    removeHeaders: ['cookie', 'cookie2'],
    handleInitialRequest: (req, res) => {
        const origin = req.headers.origin;

        if (origin === `http://${serverIp}:8090` || origin === '*') {
            res.setHeader('Access-Control-Allow-Origin', origin);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return true;
        }
        return false;
    }
});

server.listen(8070, serverIp, () => {
    console.log('CORS Anywhere proxy running on http://' + serverIp + ':8070');
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get('/get-thumbnail', async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) return res.status(400).json({ error: 'Video ID is required.' });
    const youtubeThumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    try {
        res.json({ thumbnailUrl: youtubeThumbnailUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch thumbnail.' });
    }
});

app.get('/web/*', (req, res) => {
    const requestedUrl = req.params[0];
    const youtubeUrl = requestedUrl.includes('http') ? requestedUrl : '';
    const fileName = path.basename(youtubeUrl);
    res.redirect(`/assets/${fileName}`);
});

app.get('/assets/img/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '../assets/img', req.params.filename);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) return res.status(404).send('Image not found');
        res.sendFile(imagePath);
    });
});

app.get('/assets/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../assets', req.params.filename.replace(/^[a-f0-9]{8}/, ''));
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) return res.status(404).send('File not found');
        res.sendFile(filePath);
    });
});

app.get('/api/chart', async (req, res) => {
    const { cht, chs, chl } = req.query;
    if (cht !== 'qr' || !chl || !chs) return res.status(400).send('Invalid request. Parameters "cht", "chs", and "chl" are required.');

    const [width, height] = chs.split('x').map(Number);
    if (isNaN(width) || isNaN(height)) return res.status(400).send('Invalid "chs" parameter. Expected format "widthxheight".');

    try {
        const qrImage = await QRCode.toBuffer(decodeURIComponent(chl), { width, height });
        res.setHeader('Content-Type', 'image/png');
        res.send(qrImage);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Failed to generate QR code');
    }
});

// Video Info API
app.get('/get_video_info', handleGetVideoInfo);

// QoE Logging API
app.get('/api/stats/qoe', (req, res) => {
    const qoeData = req.query;
    const requiredFields = ['event', 'fmt', 'afmt', 'cpn', 'ei', 'docid', 'ns'];

    if (requiredFields.some(field => !qoeData[field])) return res.status(400).json({ error: 'Missing required fields' });

    const logEntry = Object.entries(qoeData).map(([key, value]) => `${key}: ${value}`).join(', ') + `, Timestamp: ${new Date().toISOString()}\n`;

    const logFilePath = path.join(logsDir, 'qoe_report.txt');
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to log data' });
        res.status(200).json({ message: 'QoE data received and logged successfully' });
    });
});

// OAUTH
oauthRouter(app);

// Feeds and Such

// for leanback ajax
app.use(leanbackAjaxRouter);

// for video details, like a ye old /next
app.use(gdataVideoFeedDetails);


//for video search, like a ye old search
app.use(gdataVideoFeedSearch);



// Start the server
app.listen(port, serverIp, () => {
    console.log(`Server running at http://` + serverIp + `:` + port);
});