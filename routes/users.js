import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser ,getNames,getDriverInfo} from '../Controllers/userController.js'

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//Update user
router.put('/', verifyUser, updateUser)

//Delete user
router.delete('/:id', verifyUser, deleteUser)

//Get single user
router.get('/getone', verifyUser, getSingleUser)

//Get all user
router.get('/', verifyAdmin, getAllUser)
router.get('/getNames',getNames)
router.get('/getDriverInfo',getDriverInfo)
export default router