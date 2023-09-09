// const { omit } = require("lodash");
const userModel = require("../models/student.model");
const { excludedFields } = require("../utils/excludedFields");
const getMe = async (user) => {
  return await userModel.find({ _id: user._id }, { password: 0 }); 
};

const getAllUsers = async () => {
  return await userModel.find({}, { password: 0 });
};

module.exports = { getMe, getAllUsers };
