// functions/index.js
// Minimal wire-up only

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const SUPABASE_URL = defineSecret("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE = defineSecret("SUPABASE_SERVICE_ROLE");
const { createApp } = require("./src/app");
const { REGION } = require("./src/config");
const app = createApp();
exports.api = onRequest(
  { region: REGION, secrets: [SUPABASE_URL, SUPABASE_SERVICE_ROLE] },
  app
);
const appDev = createApp();
exports.apiDev = onRequest({ region: REGION }, appDev);
// test commit 
