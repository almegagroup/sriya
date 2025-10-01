const { Router } = require("express");
const r = Router();

r.get("/health", (_req, res) => {
  console.log("Healthcheck ping at", new Date().toISOString());
  res.json({ status: "ok", ts: Date.now() });
});

module.exports = r;
