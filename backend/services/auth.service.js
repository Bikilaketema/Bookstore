const { omit } = require("lodash");
// const { FilterQuery, QueryOptions, UpdateQuery } = require("mongoose");
const config = require("config");
const userModel = require("../models/student.model");
const { excludedFields } = require("../utils/excludedFields");
const { signJwt } = require("../utils/jwt");
const redisClient = require("../utils/connectRedis");
// const { DocumentType } = require("@typegoose/typegoose");

// CreateUser service
const createUser = async (input) => {
  return userModel.create(input);
};

console.log(excludedFields);

// Find User by Id
const findUserById = async (id) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
const findUser = async (query, options = {}) => {
  return await userModel.findOne(query, {}, options).select("+password");
};

const findAndUpdateUser = async (query, update, options) => {
  return await userModel.findOneAndUpdate(query, update, options);
};

// Sign Token
const signToken = async (user) => {
  console.log("Inside sign token");
  console.log(user);
  // Sign the access token
  const access_token = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get("accessTokenExpiresIn")}m`,
  });
  // Sign the refresh token
  const refresh_token = signJwt({ sub: user._id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get("refreshTokenExpiresIn")}m`,
  });

  console.log(access_token, refresh_token);
  // Create a Session
  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token, refresh_token };
};

module.exports = {
  createUser,
  findUserById,
  findAllUsers,
  findUser,
  findAndUpdateUser,
  signToken,
};
