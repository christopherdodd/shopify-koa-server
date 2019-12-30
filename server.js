// Import Koa / Dotenv / Fetch modules
require("isomorphic-fetch");
const Koa = require("koa");
const koaStatic = require("koa-static");
const mount = require("koa-mount");
var bodyParser = require('koa-bodyparser');
const session = require("koa-session");
const cors = require('@koa/cors');
const dotenv = require("dotenv");

// Import Shopify/Koa modules to assist with authentication
const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");

// Env Configuration
dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

// Create server using Koa
const server = new Koa();
server.use(session(server));
server.keys = [SHOPIFY_API_SECRET_KEY];

// Import and use server-side routes
const { router } = require('./server/routes.js');
server.use(router.routes());
server.use(router.allowedMethods());

// Authenticate app with Shopify
server.use(
    createShopifyAuth({
        apiKey: SHOPIFY_API_KEY,
        secret: SHOPIFY_API_SECRET_KEY,
        scopes: ["read_products", "write_products"],
        afterAuth(ctx) {
            const { shop, accessToken } = ctx.session;
            ctx.cookies.set("accessToken", accessToken, { httpOnly: false });
            ctx.cookies.set("shopOrigin", shop, { httpOnly: false });
            ctx.redirect("/");
        }
    })
);
server.use(verifyRequest());

// Enable CORS (required to let Shopify access this API)
server.use(cors());

// Use module 'koa-bodyparser'
server.use(bodyParser());

// Mount app on root path using compiled Vue app in the dist folder
server.use(mount("/", koaStatic(__dirname + "/public")));

// Start-up the server
server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
