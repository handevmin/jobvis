const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://jobvis.ai",
            changeOrigin: true,
        })
    );

    // app.use(
    //     "/api/initial_chat",
    //     createProxyMiddleware({
    //         target: "http://jobvis.herokuapp.com",
    //         changeOrigin: true,
    //     })
    // );

    // app.use(
    //     "/api/chat",
    //     createProxyMiddleware({
    //         target: "http://jobvis.herokuapp.com",
    //         changeOrigin: true,
    //     })
    // );

    // app.use(
    //     "/api/test",
    //     createProxyMiddleware({
    //         target: "http://jobvis.herokuapp.com",
    //         changeOrigin: true,
    //     })
    // );
    
    // app.use(
    //     "/api/reset",
    //     createProxyMiddleware({
    //         target: "http://jobvis.herokuapp.com",
    //         changeOrigin: true,
    //     })
    // );

    // app.use(
    //     "/api/delete",
    //     createProxyMiddleware({
    //         target: "http://jobvis.herokuapp.com",
    //         changeOrigin: true,
    //     })
    // );
};