const crypto = require("crypto");

const generateInviteToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = generateInviteToken;
