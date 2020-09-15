const express = require("express");
const router = express.Router();
const generateKey = require("../controllers/generateKey");
const serveKey = require("../controllers/serveKey");
const unblockKey = require("../controllers/unblockKey");
const deleteKey = require("../controllers/deleteKey");
const keepKeyAlive = require("../controllers/keepKeyAlive");

router.get("/generate", generateKey);
router.get("/serve", serveKey);
router.patch("/unblock/:key", unblockKey);
router.delete("/delete/:key", deleteKey);
router.patch("/keepAlive/:key", keepKeyAlive);
module.exports = router;
