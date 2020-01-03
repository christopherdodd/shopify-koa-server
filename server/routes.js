const Router = require('koa-router');
const router = new Router();
const parse = require('co-body');

// Import queries and mutations here

const prepareAuth = (ctx) => {
    const accessToken = ctx.cookies.get("accessToken");
    const shopOrigin = ctx.cookies.get("shopOrigin");
    return {
        token: accessToken,
        shop: shopOrigin
    }
};

// Define routes here

module.exports = {
    router
}
