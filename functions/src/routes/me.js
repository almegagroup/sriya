const { Router } = require("express");
const { auth } = require("../services/firebase");
const { attachUser } = require("../middlewares/attachUser");
const r = Router();

// /me (protected)
r.get("/me", attachUser, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// /me/claims (protected)
r.get("/me/claims", attachUser, async (req, res) => {
  try {
    const userRec = await auth.getUser(req.user.uid);
    const claims = userRec.customClaims || {};
    res.json({ ok: true, claims });
  } catch (e) {
    console.error("me/claims error:", e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

module.exports = r;
