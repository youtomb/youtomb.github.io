const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const router = express.Router();

class FeedsApiVideos {
    static async getVideos(req, res) {

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
            {
                "gd$etag": "da",
                "id": {
                "$t": "tag:youtube.com,2008:video:ufsrgE0BYf0"
                },
                "published": {
                "$t": "2013-05-10T00:00:01.000Z"
                },
                "updated": {
                "$t": "2013-05-27T11:28:20.000Z"
                },
                "category": [
                {
                    "scheme": "http://schemas.google.com/g/2005#kind",
                    "term": "http://gdata.youtube.com/schemas/2007#video"
                },
                {
                    "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                    "term": "Entertainment",
                    "label": "Entertainment"
                }
                ],
                "title": {
                "$t": "Gravity - Official Teaser Trailer [HD]"
                },
                "content": {
                "type": "application/x-shockwave-flash",
                "src": "http://www.youtube.com/v/ufsrgE0BYf0?version=3&f=standard&app=youtube_gdata"
                },
                "link": [
                {
                    "rel": "alternate",
                    "type": "text/html",
                    "href": "http://www.youtube.com/watch?v=ufsrgE0BYf0&feature=youtube_gdata"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#video.responses",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0/responses?v=2"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0/related?v=2"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                    "type": "text/html",
                    "href": "http://m.youtube.com/details?v=ufsrgE0BYf0"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/users/jmJDM5pRKbUlVIzDYYWb6g?v=2"
                },
                {
                    "rel": "self",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0?v=2"
                }
                ],
                "author": [
                {
                    "name": {
                    "$t": "WarnerBrosPictures"
                    },
                    "uri": {
                    "$t": "http://gdata.youtube.com/feeds/api/users/WarnerBrosPictures"
                    },
                    "yt$userId": {
                    "$t": "jmJDM5pRKbUlVIzDYYWb6g"
                    }
                }
                ],
                "yt$accessControl": [
                {
                    "action": "comment",
                    "permission": "allowed"
                },
                {
                    "action": "commentVote",
                    "permission": "allowed"
                },
                {
                    "action": "videoRespond",
                    "permission": "moderated"
                },
                {
                    "action": "rate",
                    "permission": "allowed"
                },
                {
                    "action": "embed",
                    "permission": "allowed"
                },
                {
                    "action": "list",
                    "permission": "allowed"
                },
                {
                    "action": "autoPlay",
                    "permission": "allowed"
                },
                {
                    "action": "syndicate",
                    "permission": "allowed"
                }
                ],
                "gd$comments": {
                "gd$feedLink": {
                    "rel": "http://gdata.youtube.com/schemas/2007#comments",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0/comments?v=2",
                    "countHint": 8602
                }
                },
                "yt$hd": {},
                "media$group": {
                "media$category": [
                    {
                    "$t": "Entertainment",
                    "label": "Entertainment",
                    "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                    }
                ],
                "media$content": [
                    {
                    "url": "http://www.youtube.com/v/ufsrgE0BYf0?version=3&f=standard&app=youtube_gdata",
                    "type": "application/x-shockwave-flash",
                    "medium": "video",
                    "isDefault": "true",
                    "expression": "full",
                    "duration": 91,
                    "yt$format": 5
                    },
                    {
                    "url": "rtsp://v2.cache1.c.youtube.com/CiQLENy73wIaGwn9YQFNgCv7uRMYDSANFEgGUghzdGFuZGFyZAw=/0/0/0/video.3gp",
                    "type": "video/3gpp",
                    "medium": "video",
                    "expression": "full",
                    "duration": 91,
                    "yt$format": 1
                    },
                    {
                    "url": "rtsp://v2.cache1.c.youtube.com/CiQLENy73wIaGwn9YQFNgCv7uRMYESARFEgGUghzdGFuZGFyZAw=/0/0/0/video.3gp",
                    "type": "video/3gpp",
                    "medium": "video",
                    "expression": "full",
                    "duration": 91,
                    "yt$format": 6
                    }
                ],
                "media$credit": [
                    {
                    "$t": "warnerbrospictures",
                    "role": "uploader",
                    "scheme": "urn:youtube",
                    "yt$display": "WarnerBrosPictures",
                    "yt$type": "partner"
                    }
                ],
                "media$description": {
                    "$t": "",
                    "type": "plain"
                },
                "media$keywords": {},
                "media$license": {
                    "$t": "youtube",
                    "type": "text/html",
                    "href": "http://www.youtube.com/t/terms"
                },
                "media$player": {
                    "url": "http://www.youtube.com/watch?v=ufsrgE0BYf0&feature=youtube_gdata_player"
                },
                "media$thumbnail": [
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/default.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:00:45.500",
                    "yt$name": "default"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/mqdefault.jpg",
                    "height": 180,
                    "width": 320,
                    "yt$name": "mqdefault"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/hqdefault.jpg",
                    "height": 360,
                    "width": 480,
                    "yt$name": "hqdefault"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/sddefault.jpg",
                    "height": 480,
                    "width": 640,
                    "yt$name": "sddefault"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/1.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:00:22.750",
                    "yt$name": "start"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/2.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:00:45.500",
                    "yt$name": "middle"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/3.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:01:08.250",
                    "yt$name": "end"
                    }
                ],
                "media$title": {
                    "$t": "Gravity - Official Teaser Trailer [HD]",
                    "type": "plain"
                },
                "yt$aspectRatio": {
                    "$t": "widescreen"
                },
                "yt$duration": {
                    "seconds": "91"
                },
                "yt$uploaded": {
                    "$t": "2013-05-10T00:00:01.000Z"
                },
                "yt$uploaderId": {
                    "$t": "UCjmJDM5pRKbUlVIzDYYWb6g"
                },
                "yt$videoid": {
                    "$t": "ufsrgE0BYf0"
                }
                },
                "gd$rating": {
                "average": 4.6637263,
                "max": 5,
                "min": 1,
                "numRaters": 17117,
                "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                "favoriteCount": "0",
                "viewCount": "5470783"
                },
                "yt$rating": {
                "numDislikes": "1439",
                "numLikes": "15678"
                }       
            },
            {
                "gd$etag": "da",
                "id": {
                "$t": "tag:youtube.com,2008:video:ufsrgE0BYf0"
                },
                "published": {
                "$t": "2013-05-10T00:00:01.000Z"
                },
                "updated": {
                "$t": "2013-05-27T11:28:20.000Z"
                },
                "category": [
                {
                    "scheme": "http://schemas.google.com/g/2005#kind",
                    "term": "http://gdata.youtube.com/schemas/2007#video"
                },
                {
                    "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                    "term": "Entertainment",
                    "label": "Entertainment"
                }
                ],
                "title": {
                "$t": "School House Rock Shot Heard Round the World America Rock"
                },
                "content": {
                "type": "application/x-shockwave-flash",
                "src": "http://www.youtube.com/v/ufsrgE0BYf0?version=3&f=standard&app=youtube_gdata"
                },
                "link": [
                {
                    "rel": "alternate",
                    "type": "text/html",
                    "href": "http://www.youtube.com/watch?v=ufsrgE0BYf0&feature=youtube_gdata"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#video.responses",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0/responses?v=2"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0/related?v=2"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                    "type": "text/html",
                    "href": "http://m.youtube.com/details?v=ufsrgE0BYf0"
                },
                {
                    "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/users/jmJDM5pRKbUlVIzDYYWb6g?v=2"
                },
                {
                    "rel": "self",
                    "type": "application/atom+xml",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgE0BYf0?v=2"
                }
                ],
                "author": [
                {
                    "name": {
                    "$t": "Dr. Gerard Jabbow"
                    },
                    "uri": {
                    "$t": "http://gdata.youtube.com/feeds/api/users/Dr. Gerard Jabbow"
                    },
                    "yt$userId": {
                    "$t": "adwqrwwqad"
                    }
                }
                ],
                "yt$accessControl": [
                {
                    "action": "comment",
                    "permission": "allowed"
                },
                {
                    "action": "commentVote",
                    "permission": "allowed"
                },
                {
                    "action": "videoRespond",
                    "permission": "moderated"
                },
                {
                    "action": "rate",
                    "permission": "allowed"
                },
                {
                    "action": "embed",
                    "permission": "allowed"
                },
                {
                    "action": "list",
                    "permission": "allowed"
                },
                {
                    "action": "autoPlay",
                    "permission": "allowed"
                },
                {
                    "action": "syndicate",
                    "permission": "allowed"
                }
                ],
                "gd$comments": {
                "gd$feedLink": {
                    "rel": "http://gdata.youtube.com/schemas/2007#comments",
                    "href": "http://gdata.youtube.com/feeds/api/videos/ufsrgEs0BYf0/comments?v=2",
                    "countHint": 8602
                }
                },
                "yt$hd": {},
                "media$group": {
                "media$category": [
                    {
                    "$t": "Entertainment",
                    "label": "Entertainment",
                    "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                    }
                ],
                "media$content": [
                    {
                    "url": "http://www.youtube.com/v/ufsrgE0BYf0?version=3&f=standard&app=youtube_gdata",
                    "type": "application/x-shockwave-flash",
                    "medium": "video",
                    "isDefault": "true",
                    "expression": "full",
                    "duration": 91,
                    "yt$format": 5
                    },
                    {
                    "url": "rtsp://v2.cache1.c.youtube.com/CiQLENy73wIaGwn9YQFNgCv7uRMYDSANFEgGUghzdGFuZGFyZAw=/0/0/0/video.3gp",
                    "type": "video/3gpp",
                    "medium": "video",
                    "expression": "full",
                    "duration": 91,
                    "yt$format": 1
                    },
                    {
                    "url": "rtsp://v2.cache1.c.youtube.com/CiQLENy73wIaGwn9YQFNgCv7uRMYESARFEgGUghzdGFuZGFyZAw=/0/0/0/video.3gp",
                    "type": "video/3gpp",
                    "medium": "video",
                    "expression": "full",
                    "duration": 91,
                    "yt$format": 6
                    }
                ],
                "media$credit": [
                    {
                    "$t": "warnerbrospictures",
                    "role": "uploader",
                    "scheme": "urn:youtube",
                    "yt$display": "WarnerBrosPictures",
                    "yt$type": "partner"
                    }
                ],
                "media$description": {
                    "$t": "",
                    "type": "plain"
                },
                "media$keywords": {},
                "media$license": {
                    "$t": "youtube",
                    "type": "text/html",
                    "href": "http://www.youtube.com/t/terms"
                },
                "media$player": {
                    "url": "http://www.youtube.com/watch?v=ufsrgE0BYf0&feature=youtube_gdata_player"
                },
                "media$thumbnail": [
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/default.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:00:45.500",
                    "yt$name": "default"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/mqdefault.jpg",
                    "height": 180,
                    "width": 320,
                    "yt$name": "mqdefault"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/hqdefault.jpg",
                    "height": 360,
                    "width": 480,
                    "yt$name": "hqdefault"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/sddefault.jpg",
                    "height": 480,
                    "width": 640,
                    "yt$name": "sddefault"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/1.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:00:22.750",
                    "yt$name": "start"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/2.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:00:45.500",
                    "yt$name": "middle"
                    },
                    {
                    "url": "http://i.ytimg.com/vi/ufsrgE0BYf0/3.jpg",
                    "height": 90,
                    "width": 120,
                    "time": "00:01:08.250",
                    "yt$name": "end"
                    }
                ],
                "media$title": {
                    "$t": "School House Rock Shot Heard Round the World America Rock",
                    "type": "plain"
                },
                "yt$aspectRatio": {
                    "$t": "widescreen"
                },
                "yt$duration": {
                    "seconds": "91"
                },
                "yt$uploaded": {
                    "$t": "2013-05-10T00:00:01.000Z"
                },
                "yt$uploaderId": {
                    "$t": "UCjmJDM5pRKbUlVIzDYYWb6g"
                },
                "yt$videoid": {
                    "$t": "uLN9qrJ8ESs"
                }
                },
                "gd$rating": {
                "average": 4.6637263,
                "max": 5,
                "min": 1,
                "numRaters": 17117,
                "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                "favoriteCount": "0",
                "viewCount": "5470783"
                },
                "yt$rating": {
                "numDislikes": "1439",
                "numLikes": "15678"
                }       
            }
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
