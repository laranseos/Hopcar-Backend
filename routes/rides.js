import express from "express"
import {createRide,updateRide,deleteRide,getRide,getDriverRides} from "../Controllers/rideController.js"
import {bookingRide,createBooking, deleteBooking, getBookedRide} from "../Controllers/bookingController.js"
import { verifyUser } from "../utils/verifyToken.js";
import {getAvatar} from '../Controllers/fileController.js'
const router=express.Router();

router.post('/create',verifyUser,createRide)
router.put('/update',updateRide)
router.delete('/delete',deleteRide)
router.get('/results',getRide)
router.get('/results/booking',bookingRide)
router.get('/results/booking/create',verifyUser,createBooking)
router.get('/results/getavatar',getAvatar)
router.get('/driverrides',getDriverRides)
router.get('/bookedrides',getBookedRide)
router.delete('/deleteBooking',deleteBooking)
export default router