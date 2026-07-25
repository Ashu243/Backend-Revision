const Router = require('express')
const { Register, Login, getUser } = require('../controllers/user.controllers')
const { VerifyUser } = require('../middlewares/user.middlewares')

const router = Router()

router.route('/register').post(
    Register
)

router.route('/login').post(
    Login
)

router.route('/find').get(
    VerifyUser,
    getUser
)


module.exports = router