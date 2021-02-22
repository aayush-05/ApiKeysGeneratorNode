const blockedKeys = require("../db/blockedKeys");

module.exports = (req, res) => {
  const apiKey = req.params.key;
  if (blockedKeys[apiKey]) {
    clearTimeout(blockedKeys[apiKey].oneMinWait);
    clearTimeout(blockedKeys[apiKey].fiveMinWait);
    const keyServedDate = new Date();
    blockedKeys[apiKey].servedDate = keyServedDate;
    blockedKeys[apiKey].oneMinWait = setTimeout(() => {
      delete blockedKeys[apiKey];
      availableKeys[apiKey] = {
        apiKeyId: apiKey,
        generatedDate: keyGeneratedDate,
        serveDate: keyServedDate,
      };
    }, 60000);
    blockedKeys[apiKey].fiveMinWait = setTimeout(() => {
      if (
        availableKeys[apiKey] &&
        availableKeys[apiKey].serveDate == keyServedDate
      )
        delete availableKeys[apiKey];
    }, 300000);
    return res.status(200).send({
      key: apiKey,
    });
  } else {
    return res.status(400).send({
      result: "API key not found",
    });
  }
};
