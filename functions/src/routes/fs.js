const { Router } = require("express");
const { db, FieldValue } = require("../services/firebase");
const r = Router();

// write + read back
r.get("/fs/ping", async (req, res) => {
  try {
    const msg = (req.query.msg || "hi").toString().slice(0, 64);
    const docRef = db.collection("ping").doc();

    await docRef.set({
      msg,
      env: process.env.FUNCTIONS_EMULATOR ? "emulator" : "prod",
      ts: FieldValue.serverTimestamp(),
      id: docRef.id,
    });

    const snap = await docRef.get();
    res.json({ ok: true, id: docRef.id, data: snap.data() });
  } catch (e) {
    console.error("fs/ping error:", e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

// list last N
r.get("/fs/list", async (req, res) => {
  try {
    const limitN = Math.max(1, Math.min(parseInt(req.query.limit) || 5, 50));
    const snap = await db
      .collection("ping")
      .orderBy("ts", "desc")
      .limit(limitN)
      .get();

    const items = snap.docs.map((d) => {
      const data = d.data() || {};
      let ts = null;
      if (data.ts && typeof data.ts.toDate === "function") {
        ts = data.ts.toDate().toISOString();
      } else if (data.ts && data.ts._seconds != null) {
        ts = new Date(
          data.ts._seconds * 1000 +
            Math.floor((data.ts._nanoseconds || 0) / 1e6)
        ).toISOString();
      }
      return { id: d.id, msg: data.msg || "", env: data.env || "", ts };
    });

    res.json({ ok: true, count: items.length, items });
  } catch (e) {
    console.error("fs/list error:", e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

module.exports = r;
