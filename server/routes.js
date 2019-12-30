const Router = require('koa-router');
const router = new Router();
const parse = require('co-body');

const { getProducts } = require('./queries.js');
const { changeProductTitle } = require('./mutations.js');

const prepareAuth = (ctx) => {
    const accessToken = ctx.cookies.get("accessToken");
    const shopOrigin = ctx.cookies.get("shopOrigin");
    return {
        token: accessToken,
        shop: shopOrigin
    }
};

// ROUTES GO HERE

module.exports = {
    router
}
