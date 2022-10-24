const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/posts",
    "/api/people",
    "/api/auth",
    "/api/tokens"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7006',
        secure: false
    });

    app.use(appProxy);
};
