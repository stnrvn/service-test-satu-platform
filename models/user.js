const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class User {
  static async get(sortParams, sortArrayParams) {
    // return getDatabase().collection('user').find().sort(sortParams).toArray()
    return getDatabase().collection('user').aggregate(
      [
        {
          $unwind: {
            path: "$address",
            "preserveNullAndEmptyArrays": true
          }
        },
        {
          $group: {
            _id: "$_id",
            firstName : { $first: "$firstName" },
            lastName : { $first: "$lastName" },
            gender : { $first: "$gender" },
            email : { $first: "$email" },
            address: { $push: "$address" },
            size: { $sum: sortArrayParams }
          },
        },
        { $sort : sortParams },
      ]
    ).toArray()
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