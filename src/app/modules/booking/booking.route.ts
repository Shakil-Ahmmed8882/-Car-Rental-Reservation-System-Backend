import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import USER_ROLE from "../user/user.constant";
import { BookingControllers } from "./booking.controller";
import { BookingValidations } from "./booking.validation";

const router = Router()

router.post('/', auth(USER_ROLE.user),validateRequest(BookingValidations.createBookingSchema),BookingControllers.BookCar)
router.get('/',auth(USER_ROLE.admin),BookingControllers.getAllBookings)
// router.get('/:id', CarControllers.getSingleCar)
// router.put('/:id',auth(USER_ROLE.admin),validateRequest(carValidations.updateValidationCarSchema), CarControllers.updateCar)
// router.delete('/:id', CarControllers.deleteCar)


export const bookingRoutes = router