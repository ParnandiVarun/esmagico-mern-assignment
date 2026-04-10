const crypto = require("crypto");

const generateInviteToken = () => {
  return crypto.randomBytes(5).toString("hex");
};

module.exports = generateInviteToken;
