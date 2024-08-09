const pRouter = require('./products.router'); // Products Router
const hRouter = require('./homes.router'); // Homes Router

const subMenu = require('../../middleware/client/sub_menu.middleware');
module.exports = (app) => {
    app.use('/', subMenu.subMenu, hRouter);
    
    app.use('/products', subMenu.subMenu, pRouter);
}

  