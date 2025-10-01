const cors = require("cors");
const { ALLOWED_ORIGINS } = require("../config");

const corsMiddleware = cors({
  origin: (origin, cb) => {
    // Allow tools with no Origin header (curl/Postman/emulator proxy)
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("CORS not allowed from: " + origin));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
});

module.exports = { corsMiddleware };
