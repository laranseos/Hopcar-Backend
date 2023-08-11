import express from 'express'
import { login, register , logout } from '../Controllers/authController.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import {sendVerifyCode, verifyEmail} from '../Controllers/emailVerify.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout',logout)
router.post('/sendEmail',sendVerifyCode)
router.post('/verifyEmail',verifyEmail)
export default router