const dRouter = require('./dashboard.router'); // Dashboard Router
const pRouter = require('./products.router'); // Products Router
const sysConfig = require('../../config/system');
const categoriesRouter = require('../../routers/admin/categories.router');
const rolesRouter = require('../../routers/admin/roles.router');
const accountsRouter = require('../../routers/admin/accounts.router');

module.exports = (app) => {
    app.use(`${sysConfig.prefixAdmin}/dashboard`, dRouter);
    
    app.use(`${sysConfig.prefixAdmin}/products`, pRouter);

    app.use(`${sysConfig.prefixAdmin}/categories`, categoriesRouter);

    app.use(`${sysConfig.prefixAdmin}/roles`, rolesRouter);

    app.use(`${sysConfig.prefixAdmin}/accounts`, accountsRouter);
}

  