import express from 'express'
const Router=express.Router()
import { sendVerifyCode ,verifyPhoneNumber} from '../Controllers/phoneVerify.js'
import {downLoad,upLoad} from '../Controllers/fileController.js'
import multer from "multer"
import { verifyUser } from '../utils/verifyToken.js'
const upload = multer({ dest: 'assets/' });

Router.post("/sendPhoneNumber",sendVerifyCode)
Router.post("/verifyPhoneNumber",verifyPhoneNumber)
Router.post("/upload-avatar",upload.single('avatar'),downLoad)
Router.get("/download-avatar",verifyUser,upLoad)
export default Router