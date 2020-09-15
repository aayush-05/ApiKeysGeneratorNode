const availableKeys = require("../db/availableKeys");
const blockedKeys = require("../db/blockedKeys");

module.exports = (req, res) => {
  const apiKey = req.params.key;
  if (blockedKeys[apiKey]) {
    const keyGeneratedDate = blockedKeys[apiKey].generatedDate;
    const keyOneMinWait = blockedKeys[apiKey].oneMinWait;
    const keyFiveMinWait = blockedKeys[apiKey].fiveMinWait;
    delete blockedKeys[apiKey];
    blockedKeys.totalKeys--;
    availableKeys[apiKey] = {
      apiKeyId: apiKey,
      generatedDate: keyGeneratedDate,
      serveDate: undefined,
      oneMinWait: keyOneMinWait,
      fiveMinWait: keyFiveMinWait,
    };
    availableKeys.totalKeys++;
    return res.status(200).send({
      key: apiKey,
      result: "API key unblocked",
    });
  } else {
    return res.status(400).send({
      result: "API key not found",
    });
  }
};
