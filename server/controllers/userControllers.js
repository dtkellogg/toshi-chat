let userMap = new Map()
let users = []

const getUsers = async (req, res) => {
  res.json(users)
}

const addToUsers = (req, res) => {
  const { socket, user } = req.body

  userMap.set(socket, user)
  users.push(user)
}

const removeFromUsers = (req, res) => {
  const socket = req.params.id

  const user = userMap.get(socket)
  const userIdx = users.indexOf(user)
  userMap.delete(socket)
  users.splice(userIdx, 1)

  res.json({ message: 'User removed.' })
}

module.exports = {
  getUsers,
  addToUsers,
  removeFromUsers
}