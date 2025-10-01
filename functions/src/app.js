const express = require("express");
const { corsMiddleware } = require("./middlewares/cors");

const hello = require("./routes/hello");
const health = require("./routes/health");
const fsRoutes = require("./routes/fs");
const me = require("./routes/me");

// Build the Express app
function createApp() {
  const app = express();
  app.use(express.json());
  app.use(corsMiddleware);

  // 🔧 add this normalizer so /api/* hits /hello, /fs/*, /me, etc.
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api/")) {
      req.url = req.url.replace(/^\/api/, "");
    }
    next();
  });

  // mount routes
  app.use(hello);
  app.use(health);
  app.use(fsRoutes);
  app.use(me);

  return app;
}

module.exports = { createApp };
