
const express = require("express")

const router = express.Router()

const authController = require("../controller/authController")

// const taskController = require('../controller/taskController')
const taskController = require('../controller/taskController');


//authentication

router.post('/login',authController.manualLogin)

router.post('/signup',authController.manualSignUp)

router.post('/social-login-signup',authController.socialLoginSignup)

router.post('/profile/update', authController.updateUserProfile);



//tasks

router.post('/task',taskController.createTask)

router.get('/tasks/:taskId',taskController.getTaskById)

router.get('/tasks/',taskController.getAllTasks)

module.exports = router