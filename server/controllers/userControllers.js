const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");


const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

const addUser = asyncHandler(async (req, res) => {
  const { socket, name } = req.body

  const user = await User.create({
    socket,
    name
  })

  if (user) {
    res.status(201).json({
      socket: user.socket,
      name: user.name
    });
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

// const deleteUser = asyncHandler(async (req, res) => {
//   const appointment = await Socket.findById(req.params.id)

//   if (appointment) {
//     await appointment.remove()
//     res.json({ message: 'Appointment removed' })
//   } else {
//     res.status(404)
//     throw new Error('Appointment not found')
//   }
// })

module.exports = {
  getUsers,
  addUser
}