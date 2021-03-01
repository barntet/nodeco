var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors({
    origin: ['http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.get('/products/:id', function (req, ress, next) {
    const request = require('request');
    // https://www.yy.com/login/getSdkAuth?embed=true&cssid=5719_1
    // referer: https://www.yy.com/
    // embed: true
    // cssid: 5719_1

    request({
        url: 'https://www.yy.com/login/getSdkAuth?embed=true&cssid=5719_1',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
            referer: 'https://www.yy.com/'
        },

    }, (error, res, body) => {
        console.log(body);
        ress.send(body);
    })
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})



