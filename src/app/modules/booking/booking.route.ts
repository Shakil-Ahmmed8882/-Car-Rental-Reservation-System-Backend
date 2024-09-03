import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import USER_ROLE from '../user/user.constant';
import { BookingControllers } from './booking.controller';
import { BookingValidations } from './booking.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.BookCar,
);
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getMyBookings,
);
router.get('/:id', BookingControllers.getSingleBooking);



router.put(
  '/:id',
  auth(USER_ROLE.user,USER_ROLE.admin),
  // validateRequest(BookingValidations.updateBookingSchema),
  BookingControllers.updateBooking,
);

router.delete('/:id', BookingControllers.deleteBooking);
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const bookingRoutes = router;
