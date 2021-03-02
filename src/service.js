const express = require('express')
const bodyParser = require('body-parser')
// const FormData = require('form-data');
const cors = require('cors')
const app = express()
const request = require('request');

const jsonParse = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());


app.post('/getSdkAuth', (req, ress, next) => {
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

app.post('/login', jsonParse, (req, ress, next) => {
    // 18658258290----cuijiadong1992
    // https://lgn.yy.com/lgn/oauth/x2/s/login_asyn.do
    // username=18658258290&pwdencrypt=2f49c1983552bb417e75b4427b5f93a13fccccb185cc1a431927c4d42c05ebf38bf73246acb82b0cb6cf21101bc1c545a8b16adaced06c60fe29459c7695b328678c1b78b7d2100092841fa2982d8c4c0f57b76f6c9184ff4965197bdc49b85ad6789977676da9888cc505ce98a766d1166915213a2a1c884264236bd504f7c7&oauth_token=b793d5d35aebdcce2c3fdd4b5fcf187e8b88e87e1385bcab2ba281f750365c599f4ff26cbdba64661bdf4f65b4515dc16513c21a5901826afc2db6e5aba7611f&denyCallbackURL=https%3A%2F%2Fwww.yy.com%2Flogin%2FudbCallback%3Fcancel%3D1&UIStyle=xelogin&appid=5719&cssid=5719_1&mxc=&vk=&isRemMe=1&mmc=&vv=&hiido=1
    // Referer: https://lgn.yy.com/lgn/oauth/authorize.do?oauth_token=b793d5d35aebdcce2c3fdd4b5fcf187e8b88e87e1385bcab2ba281f750365c599f4ff26cbdba64661bdf4f65b4515dc16513c21a5901826afc2db6e5aba7611f&denyCallbackURL=https://www.yy.com/login/udbCallback?cancel=1&cssid=5719_1&regCallbackURL=https://www.yy.com/login/udbCallback&UIStyle=xelogin&rdm=0.8795042599518426

    console.log(req.body);
    const formData = {
        username: req.body.username,
        pwdencrypt: req.body.pwdencrypt,
        oauth_token: req.body.oauth_token,
        denyCallbackURL: req.body.denyCallbackURL,
        mxc: '',
        vk: '',
        isRemMe: 1,
        mmc: '',
        vv: '',
        hiido: 1
    }


    request({
        url: 'https://lgn.yy.com/lgn/oauth/x2/s/login_asyn.do',
        method: 'POST',
        json: true,
        formData,
    }, (error, res, body) => {
        if (error) return error;
        console.log(res);
        ress.send(body);
    })
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})



