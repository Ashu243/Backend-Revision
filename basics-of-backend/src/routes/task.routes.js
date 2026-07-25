
const Router = require('express')
const { CreateTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controllers')
const { VerifyUser } = require('../middlewares/user.middlewares')

const router = Router()

router.route('/').post(
    VerifyUser,
    CreateTask
)

router.route('/').get(
    VerifyUser,
    getTasks
)

router.route('/:id').put(
    VerifyUser,
    updateTask
)

router.route('/:id').delete(
    VerifyUser,
    deleteTask
)


module.exports = router