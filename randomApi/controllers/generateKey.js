const availableKeys = require("../db/availableKeys");
const crypto = require("crypto");

module.exports = (req, res) => {
  crypto.randomBytes(16, (err, buf) => {
    if (err) {
      return res.status(500).send("Could not generate key");
    } else {
      const keyCount = availableKeys.totalKeys + 1;
      const newKey = buf.toString("hex") + keyCount.toString();
      availableKeys[newKey] = {
        apiKeyId: newKey,
        generatedDate: new Date(),
        serveDate: undefined,
        oneMinWait: 0,
        fiveMinWait: 0,
      };
      availableKeys.totalKeys++;
      return res.status(200).send({
        result: "API key generated",
      });
    }
  });
};
