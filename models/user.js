const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class User {
  static async get(sortParams) {
    return getDatabase().collection('user').find().sort( sortParams ).toArray()
  }
  static getById(id) {
    return getDatabase().collection('user').find({"_id": ObjectId(id)}).toArray()
  }

  static update(id, data) {
    return getDatabase().collection('user').updateOne(
      {"_id": ObjectId(id)},
      {$set: {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "gender": data.gender,
        "address": data.address
      }}
    )
  }
}

module.exports = User