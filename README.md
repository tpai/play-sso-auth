Play SSO Auth
===

This is a demo for implementing single sign on with `iframe` and `window.postMessage`.

![sso](https://media.giphy.com/media/3oEhmOilvvX6A8H9xS/giphy.gif)

## Prerequisites

Install dependencies and create `.env` file.

```
yarn
```

And make sure to write something to `JWT_TOKEN` of `.env`.

## Usage

Launch two server as cross domain server.

```
yarn run deploy
```

Using IP address is for a reason that cookies do not provide isolation for different ports.

```
http://127.0.0.1:8080
http://localhost:8081
```

For protecting your cookies, make sure to add `HttpOnly` and `secure` flag for preventing XSS and MITM in production.

## Reference

* [Cross-Domain Messaging With postMessage](http://blog.teamtreehouse.com/cross-domain-messaging-with-postmessage)
* [Are HTTP cookies port specific?](https://stackoverflow.com/a/16328399)
* [Where to Store your JWTs – Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
