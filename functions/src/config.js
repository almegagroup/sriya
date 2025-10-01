// Global config (region, db, CORS allowlist)
const REGION = "asia-south1";
const SERVICE = process.env.K_SERVICE || process.env.FUNCTION_TARGET || "";
const IS_EMU = !!process.env.FUNCTIONS_EMULATOR;

// Emulator uses (default), prod uses custom database
const DB_ID = IS_EMU
  ? "(default)"
  : SERVICE === "apiDev"
  ? "sriya-dev-db"
  : "sriya-db";

// CORS allowlist (add hosting domain later)
const ALLOWED_ORIGINS = [
  "http://localhost:5173", // Vite dev
  "http://localhost:4173", // Vite preview
  "https://asia-south1-sriya-0504.cloudfunctions.net", // direct prod test
  "https://sriya-0504.web.app",
  "https://sriya-0504.firebaseapp.com",
  "https://sriya-0504--dev-ykpw71e1.web.app",
  "https://sriya-0504--dev-ykpw71e1.firebaseapp.com ",
  // "https://erp.almegagroup.in"
  // TODO: add after Hosting
];

module.exports = { REGION, DB_ID, ALLOWED_ORIGINS };
