# shopify-koa-server
A minimalist framework for creating Shopify authorised applications with Koa.js

## server.js
The server.js file utilises the Koa authorisation package provided by Shopify (koa-shopify-auth) to create a connection to your store and serve the app

Based on this article on Shopify's website: https://www.shopify.com.au/partners/blog/shopify-admin-authenticate-app

## .env file
Once you set up your app in your partner account, add the API key and secret key here. These environment variables are what is used by the server.js file to authorise your application.

## 'public' Directory
The public folder is what is mounted by the app and displayed on the front-end. Use this to build out a Single Page Application (SPA) with whichever front-end framework you desire.

## 'server' Directory
The server folder holds a pre-built API client for using the GraphQL Admin API as well as templates for storing your API queries, API mutations and Koa routes.
