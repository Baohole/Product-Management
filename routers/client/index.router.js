const pRouter = require('./products.router'); // Products Router
const hRouter = require('./homes.router'); // Homes Router

module.exports = (app) => {
    app.use('/', hRouter);
    
    app.use('/products', pRouter);
}

  