const express = require("express");
const router = express.Router();
const { getUsers, addToUsers, removeFromUsers } = require("../controllers/userControllers")

router.route('/').get(getUsers).post(addToUsers).delete(removeFromUsers)

module.exports = router