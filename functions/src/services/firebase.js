const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const { DB_ID } = require("../config");

// Initialize once
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore(admin.app(), DB_ID);
const auth = getAuth();

module.exports = { admin, db, auth, FieldValue };
