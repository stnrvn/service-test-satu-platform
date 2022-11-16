const express = require('express')
const { connect } = require('./config/mongodb')
const router = require('./routes/index')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 6000

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

connect().then(async () => {
  console.log('mongo success to connect!')
  
  app.use('/', router)

  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  })
})