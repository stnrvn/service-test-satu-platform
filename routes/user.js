const router = require('express').Router()

const userController = require('../controllers/user')

router.get('/users', userController.get)
router.get('/users/:id', userController.getById)
router.put('/users/:id', userController.update)

module.exports = router