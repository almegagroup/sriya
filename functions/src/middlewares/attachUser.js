const { auth } = require("../services/firebase");

async function attachUser(req, res, next) {
  try {
    const hdr = req.headers.authorization || "";
    const m = hdr.match(/^Bearer\s+(.+)$/i);
    if (!m) return res.status(401).json({ ok: false, error: "No token" });

    const decoded = await auth.verifyIdToken(m[1]);
    req.user = { uid: decoded.uid, email: decoded.email || null };
    return next();
  } catch (e) {
    console.error("attachUser error:", e);
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}

module.exports = { attachUser };
