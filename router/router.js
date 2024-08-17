
const express = require("express")

const router = express.Router()

const authController = require("../controller/authController")


const taskController = require('../controller/taskController');


//authentication

router.post('/login',authController.manualLogin)

router.post('/signup',authController.manualSignUp)

router.post('/social-login-signup',authController.socialLoginSignup)

router.post('/profile/update', authController.updateUserProfile);



//tasks

router.post('/task',taskController.createTask)

// router.get('/task/:taskId',taskController.getTaskById)
router.get('/task/:id',taskController.getTaskById)

router.get('/tasks/',taskController.getAllTasks)

router.delete('/task/delete/:id',taskController.deleteTask)

router.get('/task/filter',taskController.filterTasks)


router.put('/task/:id', taskController.updateTask);



module.exports = router