const availableKeys = require("../db/availableKeys");
const blockedKeys = require("../db/blockedKeys");

module.exports = (req, res) => {
  if (availableKeys.totalKeys != 0) {
    const apiKey = getRandomKey();
    const keyGeneratedDate = availableKeys[apiKey].generatedDate;
    delete availableKeys[apiKey];
    availableKeys.totalKeys--;
    blockedKeys.totalKeys++;
    const keyServedDate = new Date();
    blockedKeys[apiKey] = {
      apiKeyId: apiKey,
      generatedDate: keyGeneratedDate,
      serveDate: keyServedDate,
    };
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
    return res.status(404).send({
      result: "No API Key available",
    });
  }
};

const getRandomKey = () => {
  let newKey;
  let counter = 0;
  for (let key in availableKeys) {
    if (counter == 1) {
      newKey = key;
      break;
    }
    counter++;
  }
  return newKey;
};
