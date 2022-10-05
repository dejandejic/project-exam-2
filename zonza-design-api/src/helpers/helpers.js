const moment = require("moment-timezone");
const dotenv = require("dotenv").config();
var path = require("path");
var CryptoJS = require("crypto-js");
const fs = require("fs");

const getCurrentTime = () => moment().format("YYYY-MM-DD HH:mm:ss");

const generatePassword = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const getLogo = () => {
  let logo = [
    {
      filename: "proctivity_logo.png",
      path: path.resolve(
        __dirname.replace("/helpers", ""),
        "assets/logo/proctivity_logo.png"
      ),
      cid: "logo",
    },
  ];

  return logo;
};


const encryptPlainText = (plainText) => {
  try {
    return CryptoJS.AES.encrypt(
      plainText,
      process.env.CRYPTO_SECRET_KEY
    ).toString();
  } catch (error) {
    console.log(error);
  }
};

const TotalDaysInAMonth = (date) => {
  return moment(date).daysInMonth();
};

const generateReferenceNumber = () => {
  var length = 6,
    charset = "0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const unlinkFiles = async (file) => {
  if (fs.existsSync(file)) {
    await fs.unlinkSync(file);
  }
};

const getSettings = async (type) => {
  const [settings, fields] = await connectPool.query(
    `SELECT description FROM settings WHERE type = ?`,
    [type]
  );
  if (settings.length > 0) {
    return settings[0].description;
  }
  return null;
};

const addNotifications = async (table_prefix, data) => {
  const [add_fields, fields] = await connectPool.query(
    `INSERT into ${table_prefix}notifications SET ?`,
    data
  );

  return add_fields;
};

module.exports = {
  getCurrentTime,
  generatePassword,
  getLogo,
  encryptPlainText,
  TotalDaysInAMonth,
  generateReferenceNumber,
  unlinkFiles,
  getSettings,
  addNotifications,
};
