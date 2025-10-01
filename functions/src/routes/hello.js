const { Router } = require("express");
const r = Router();

r.get("/hello", (_req, res) => {
  res.json({ ok: true, message: "Hello SRIYA 👋 (from Emulator/Live)" });
});

module.exports = r;
