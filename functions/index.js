// functions/index.js
// Minimal wire-up only

const { onRequest } = require("firebase-functions/v2/https");
const { createApp } = require("./src/app");
const { REGION } = require("./src/config");

const app = createApp();
exports.api = onRequest({ region: REGION }, app);
const appDev = createApp();
exports.apiDev = onRequest({ region: REGION }, appDev);
