const dRouter = require('./dashboard.router'); // Dashboard Router
const pRouter = require('./products.router'); // Products Router
const sysConfig = require('../../config/system');

module.exports = (app) => {
    app.use(`${sysConfig.prefixAdmin}/dashboard`, dRouter);
    
    app.use(`${sysConfig.prefixAdmin}/products`, pRouter);
}

  