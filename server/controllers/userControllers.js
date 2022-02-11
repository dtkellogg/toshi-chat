const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");

let userMap = new Map()
let users = []



const getUsers = async (req, res) => {

  console.log("USERS CONTROLLER - USERS");
console.log(users);

  for(const user of userMap.values()) {
    if(!users.includes(user)) users.push(user)
  }
  res.json(users)
}

const addToUsers = (req, res) => {
  const { socket, user } = req.body

  userMap.set(socket, user)
}

const removeFromUsers = (req, res) => {
  const { socket } = req.body

  const user = userMap.get(socket)
  const userIdx = users.indexOf(user)
  userMap.delete(socket)
  users.splice(userIdx, 1)

  console.log("REMOVE USERS CONTROLLER")
  console.log(users)
  res.json(users)

}

module.exports = {
  getUsers,
  addToUsers,
  removeFromUsers
}