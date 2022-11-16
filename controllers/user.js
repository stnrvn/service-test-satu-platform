const User = require("../models/user")

class UserController {
  static async get(req, res) {
    try {
        const sortName = await {
            ASC: { "firstName": 1, "lastName": 1 },
            DESC: { "firstName": -1, "lastName": -1 },
        }[req.query.name]

        const sortGender = await {
            ASC: { "gender": 1 },
            DESC: { "gender": -1 }
        }[req.query.gender]

        const sortAddress = await {
            ASC: { "address": 1 },
            DESC: { "address": -1 }
        }[req.query.address]

        const sort = await {...sortName, ...sortGender, ...sortAddress}
        console.log(sort)

        const users = await User.get(sort)

        if (!users) {
          return res.status(400).json({
            message: "not found"
          })
        }

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id

      const user = await User.getById(id)

      res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id
      const movie = await User.update(id, req.body)

      return res.status(201).json(movie) 
    } catch (error) {
        console.log(error)
      return res.status(500).json(error)
    }
  }
}

module.exports = UserController