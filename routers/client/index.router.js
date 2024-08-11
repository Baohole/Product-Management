const pRouter = require('./products.router'); // Products Router
const hRouter = require('./homes.router'); // Homes Router
const cartRouter = require('./cart.router'); // Homes Router
const checkoutRouter = require('./checkout.router'); // Homes Router

const subMenu = require('../../middleware/client/sub_menu.middleware');
const mincart = require('../../middleware/client/cart.middleware');

module.exports = (app) => {
    app.use(subMenu.subMenu);
    app.use(mincart);
    
    app.use('/', hRouter);
    
    app.use('/products', pRouter);

    app.use(`/cart`, cartRouter);
    
    app.use(`/checkout`, checkoutRouter);
}

  