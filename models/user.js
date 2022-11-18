const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class User {
  static async get(sortParams) {
    // return getDatabase().collection('user').find().sort(sortParams).toArray()
    console.log(JSON.stringify(sortParams) === "{}")
    if (JSON.stringify(sortParams) === "{}") {
      console.log("masuk if")
      return getDatabase().collection('user').find().toArray()
    } else {
      console.log("masuk else")
      
      return getDatabase().collection('user').aggregate(
      [
        //   {
        //     $unwind: {
        //       path: "$address",
        //       "preserveNullAndEmptyArrays": true
        //     }
        //   },
        {
        $addFields: {
            addressLength: {
            $size: "$address"
            }
        }
        },
        // {
        //   $group: {
        //     _id: "$_id",
        //     // firstName : { $first: "$firstName" },
        //     // lastName : { $first: "$lastName" },
        //     // gender : { $first: "$gender" },
        //     // email : { $first: "$email" },
        //     address: { $push: "$address" },
        //     size: { $sum: sortArrayParams }
        //   },
        // },
        { $sort:  sortParams }
        // () => {
        //   if (sortParams) {
        //     console.log(sortParams, "sdf")
        //     return { $sort: sortParams }
        //   }
        // }
        // {
        //   $sort: sortParams
        // },
        // () => {
        //   if (sortParams) {
        //     console.log("A")
        //     return { 
        //       $sort: sortParams
        //      }
        //   } else {
        //     console.log("b")
        //     return { $match: {} }
        //   }
        // }
        // { $sort: { addressLength: 1 } }
        ]
      ).toArray()
    }
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