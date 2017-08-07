require('dotenv').config();
const express = require('express');
const cookie = require('cookie');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const app = express();
const http = createServer(app);
const PORT = process.env.NODE_ENV === 'development' ? 8080 : 8081;
const { sign: jwtSign, verify: jwtVerify } = require('./libs/jwt');
const root = require('path').resolve(__dirname + '/public');
const remoteURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'http://127.0.0.1:8080';

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', root);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.render('index', { remoteURL });
})
app.all('/verify', (req, res) => {
    if (req.method !== 'GET') {
        res.sendStatus(405);
        return;
    }
    const { jwt_token } = cookie.parse(req.headers.cookie || '');
    jwtVerify(jwt_token, (err, decoded) => {
        if (err) res.sendStatus(401);
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(decoded));
        }
    });
})
app.all('/login', (req, res) => {
    if (req.method !== 'POST') {
        res.sendStatus(405);
        return;
    }
    if (req.body.username === 'user' && req.body.password === 'pass') {
        res.setHeader('Set-Cookie',
            cookie.serialize('jwt_token',
                jwtSign(req.body), {
                    path: '/',
                    maxAge: 60 * 60
                }
            )
        );
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
})
app.all('/logout', (req, res) => {
    res.clearCookie('jwt_token');
    res.redirect(301, '/');
})

http.listen(PORT, () => console.log(`${remoteURL} launced.`))
