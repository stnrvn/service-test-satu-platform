const { MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = 'mongodb+srv://stnrvn:test123@cluster0.zipjx6k.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useUnifiedTopology: true })

    await client.connect()

    const db = client.db('satu-platform')

    database = db

    return db
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  connect,
  getDatabase() {
    return database
  }
}
