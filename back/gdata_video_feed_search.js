const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const router = express.Router();


const videoTemplates = [];

class FeedsApiVideos {

    static async convertToIntermediateForm(responseData) {
        const videos = [];
    
        const items = responseData.contents?.sectionListRenderer?.contents[0]?.shelfRenderer?.content?.horizontalListRenderer?.items;
    
        if (items) {
    
            items.forEach(item => {

                const video = item.tileRenderer;
    
                if (video) {
                    const videoData = {
                        id: video.onSelectCommand.watchEndpoint.videoId, 
                        title: video.metadata.tileMetadataRenderer.title?.simpleText || "Unknown Title", 
                        etag: video.etag || "Unknown ETag", 
                        published: video.publishedTimeText?.simpleText || "Unknown Published Time", 
                        updated: video.updatedTimeText?.simpleText || "Unknown Updated Time", 
                        category: video.category || "Unknown Category", 
                        categoryLabel: video.categoryLabel || "Unknown Category Label", 
                    };
    
                    videos.push(videoData);
                }
            });
        }
    
        return videos; 
    }
    
    static async handleSearchRequest(req) {
        
        const query = req.query.q; 
    
        if (!query) {
            throw new Error('Missing query in the request body.');
        }
    
        const apiKey = 'AIzaSyDCU8hByM-4DrUqRUYnGn-3llEO78bcxq8';
        const apiUrl = 'https://www.googleapis.com/youtubei/v1/search';
    
        const postData = {
            query,
            context: {
                client: {
                    clientName: 'TVHTML5',
                    clientVersion: '7.20240701.16.00',
                    hl: 'en',
                    gl: 'US',
                }
            }
        };
    
        try {
            const response = await axios.post(apiUrl, postData, {
                headers: { 'Content-Type': 'application/json' },
                params: { key: apiKey }
            });
    
            console.log("Raw response data:", JSON.stringify(response.data, null, 2));
    
            const logsDir = path.join(__dirname, 'logs');
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir);
            }
 
            const timestamp = Date.now();
            const logFile = path.join(logsDir, `search_response_${timestamp}.json`);
    
            fs.writeFileSync(logFile, JSON.stringify(response.data, null, 2));

            const intermediateForm = await FeedsApiVideos.convertToIntermediateForm(response.data);

            const logFileIn = path.join(logsDir, `search_intermediate_response_${timestamp}.json`);
    
            fs.writeFileSync(logFileIn, JSON.stringify(intermediateForm, null, 2));


            return intermediateForm;

        } catch (error) {
            console.error("Error fetching data from YouTube API:", error.message);
            throw new Error('Failed to fetch data from YouTube API. Details: ' + error.message);
        }
    }
    
    static async generateVideoList(videosData) {

        for (const videoData of videosData) {
            const videoTemplate = await this.generateVideoTemplate(videoData);
            videoTemplates.push(videoTemplate);
        }
    
        const formattedVideoList = `[${videoTemplates.join('},\n')}]`;

        return formattedVideoList;
    }    

    static async generateVideoTemplate(parsedVideoData) {

        // Check if parsedVideoData is invalid and return empty string
        if (parsedVideoData == "null" || parsedVideoData == ' ' || parsedVideoData == null ) {
            return "";
        }
    
        // Pre-check: set defaults for undefined values
        const etag = parsedVideoData.etag || "default-etag";
        const id = parsedVideoData.id || "tag:youtube.com,2008:video:default";
        const published = parsedVideoData.published || "2013-05-10T00:00:01.000Z";
        const updated = parsedVideoData.updated || "2013-05-27T11:28:20.000Z";
        const category = parsedVideoData.category || "Entertainment";
        const categoryLabel = parsedVideoData.categoryLabel || "Entertainment";
        const title = parsedVideoData.title || "Default Video Title";
        const videoSrc = parsedVideoData.videoSrc || "http://www.youtube.com/v/defaultVideoID";
        const link = parsedVideoData.link || "http://www.youtube.com/watch?v=defaultVideoID";
        const authorName = parsedVideoData.authorName || "Default Author";
        const authorUri = parsedVideoData.authorUri || "http://gdata.youtube.com/feeds/api/users/defaultUser";
        const commentsLink = parsedVideoData.commentsLink || "http://gdata.youtube.com/feeds/api/videos/defaultVideoID/comments?v=2";
        const commentCount = parsedVideoData.commentCount || 8602;
        const mediaCategory = parsedVideoData.mediaCategory || "Entertainment";
        const mediaCategoryLabel = parsedVideoData.mediaCategoryLabel || "Entertainment";
        const mediaUrl = parsedVideoData.mediaUrl || "http://www.youtube.com/v/defaultVideoID";
        const duration = parsedVideoData.duration || 91;
        const playerUrl = parsedVideoData.playerUrl || "http://www.youtube.com/watch?v=defaultVideoID";
        const thumbnail = parsedVideoData.thumbnail || "http://i.ytimg.com/vi/defaultVideoID/default.jpg";
        const aspectRatio = parsedVideoData.aspectRatio || "widescreen";
        const videoId = parsedVideoData.id || "defaultVideoID";
        const favoriteCount = parsedVideoData.favoriteCount || "0";
        const viewCount = parsedVideoData.viewCount || "5470783";
        const numDislikes = parsedVideoData.numDislikes || "1439";
        const numLikes = parsedVideoData.numLikes || "15678";
    
        const videoTemplate = {
            "gd$etag": etag,
            "id": {
                "$t": id
            },
            "published": {
                "$t": published
            },
            "updated": {
                "$t": updated
            },
            "category": [
                {
                    "scheme": "http://schemas.google.com/g/2005#kind",
                    "term": "http://gdata.youtube.com/schemas/2007#video"
                },
                {
                    "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                    "term": category,
                    "label": categoryLabel
                }
            ],
            "title": {
                "$t": title
            },
            "content": {
                "type": "application/x-shockwave-flash",
                "src": videoSrc
            },
            "link": [
                {
                    "rel": "alternate",
                    "type": "text/html",
                    "href": link
                },
                {
                    "rel": "self",
                    "type": "application/atom+xml",
                    "href": link
                }
            ],
            "author": [
                {
                    "name": {
                        "$t": authorName
                    },
                    "uri": {
                        "$t": authorUri
                    }
                }
            ],
            "yt$accessControl": [
                {
                    "action": "comment",
                    "permission": "allowed"
                },
                {
                    "action": "rate",
                    "permission": "allowed"
                }
            ],
            "gd$comments": {
                "gd$feedLink": {
                    "rel": "http://gdata.youtube.com/schemas/2007#comments",
                    "href": commentsLink,
                    "countHint": commentCount
                }
            },
            "yt$hd": {},
            "media$group": {
                "media$category": [
                    {
                        "$t": mediaCategory,
                        "label": mediaCategoryLabel
                    }
                ],
                "media$content": [
                    {
                        "url": mediaUrl,
                        "type": "application/x-shockwave-flash",
                        "medium": "video",
                        "isDefault": "true",
                        "expression": "full",
                        "duration": duration,
                        "yt$format": 5
                    }
                ]
            },
            "media$player": {
                "url": playerUrl
            },
            "media$thumbnail": [
                {
                    "url": thumbnail,
                    "height": 90,
                    "width": 120
                }
            ],
            "yt$aspectRatio": {
                "$t": aspectRatio
            },
            "yt$duration": {
                "seconds": duration
            },
            "yt$videoid": {
                "$t": videoId
            },
            "yt$statistics": {
                "favoriteCount": favoriteCount,
                "viewCount": viewCount
            },
            "yt$rating": {
                "numDislikes": numDislikes,
                "numLikes": numLikes
            }
        };
        
        // Return the JSON object as a string
        return JSON.stringify(videoTemplate, null, 2);  // 'null, 2' for pretty-printing
    }
    
    
    static async getVideos(req, res) {

        var searchRequstData = await FeedsApiVideos.handleSearchRequest(req, res);

        console.log("searxh data" + searchRequstData);

        videoTemplates.length = 0;

        await  FeedsApiVideos.generateVideoList(searchRequstData)

        const jsonData = `{
        "version": "1.0",
        "encoding": "UTF-8",
        "feed": {
            "xmlns": "http://www.w3.org/2005/Atom",
            "xmlns$media": "http://search.yahoo.com/mrss/",
            "xmlns$openSearch": "http://a9.com/-/spec/opensearch/1.1/",
            "xmlns$gd": "http://schemas.google.com/g/2005",
            "xmlns$gml": "http://www.opengis.net/gml",
            "xmlns$yt": "http://gdata.youtube.com/schemas/2007",
            "xmlns$georss": "http://www.georss.org/georss",
            "gd$etag": "DkcESHk5fyp7I2A9WhBaGEQ",
            "id": {
            "$t": "tag:youtube.com,2008:standardfeed:global:on_the_web"
            },
            "updated": {
            "$t": "2013-05-30T06:06:49.727Z"
            },
            "category": [
            {
                "scheme": "http://schemas.google.com/g/2005#kind",
                "term": "http://gdata.youtube.com/schemas/2007#video"
            }
            ],
            "title": {
            "$t": ""
            },
            "logo": {
            "$t": "http://www.youtube.com/img/pic_youtubelogo_123x63.gif"
            },
            "link": [
            {
                "rel": "alternate",
                "type": "text/html",
                "href": "http://www.youtube.com/channel/HCRMDEFf63gNI"
            },
            {
                "rel": "http://schemas.google.com/g/2005#feed",
                "type": "application/atom+xml",
                "href": "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?v=2"
            },
            {
                "rel": "http://schemas.google.com/g/2005#batch",
                "type": "application/atom+xml",
                "href": "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web/batch?v=2"
            },
            {
                "rel": "self",
                "type": "application/atom+xml",
                "href": "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?alt=json&start-index=1&max-results=7&v=2"
            },
            {
                "rel": "service",
                "type": "application/atomsvc+xml",
                "href": "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?alt=atom-service&v=2"
            },
            {
                "rel": "next",
                "type": "application/atom+xml",
                "href": "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?alt=json&start-index=8&max-results=7&v=2"
            }
            ],
            "author": [
            {
                "name": {
                "$t": "YouTube"
                },
                "uri": {
                "$t": "http://www.youtube.com/"
                }
            }
            ],
            "generator": {
            "$t": "YouTube data API",
            "version": "2.1",
            "uri": "http://gdata.youtube.com"
            },
            "openSearch$totalResults": {
            "$t": 79
            },
            "openSearch$startIndex": {
            "$t": 1
            },
            "openSearch$itemsPerPage": {
            "$t": 7
            },
            "entry": [
           
                 ${videoTemplates}

            ]
        }
        }`;


        const callback = req.query.callback;

        if (callback) {
            const jsonpResponse = `${callback}(${jsonData})`;
            res.send(jsonpResponse);
        } else {
            res.status(418).send('418 I\'m a teapot: Callback is required for JSONP.');
        }
    }
}

// Route to handle video request
router.get('/feeds/api/videos', FeedsApiVideos.getVideos);

module.exports = router;
