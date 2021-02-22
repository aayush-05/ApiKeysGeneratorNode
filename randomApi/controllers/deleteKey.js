const availableKeys = require("../db/availableKeys");
const blockedKeys = require("../db/blockedKeys");

module.exports = (req, res) => {
  const apiKey = req.params.key;
  if (availableKeys[apiKey]) {
    delete availableKeys[apiKey];
    availableKeys.totalKeys--;
    return res.status(200).send({
      key: apiKey,
      result: "API key deleted",
    });
  } else if (blockedKeys[apiKey]) {
    delete blockedKeys[apiKey];
    blockedKeys.totalKeys--;
    return res.status(200).send({
      key: apiKey,
      result: "API key deleted",
    });
  } else {
    return res.status(400).send({
      result: "API key not found",
    });
  }
};
