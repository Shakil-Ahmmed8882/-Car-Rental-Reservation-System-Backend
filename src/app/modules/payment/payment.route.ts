import { Router } from 'express';
import { paymentControllers } from './payment.controller';
import { pamentValidations } from './payment.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/pay',
  validateRequest(pamentValidations.createPaymentSchema),
  paymentControllers.SSLPaymentHandler,
);
router.post('/success/:tranId', paymentControllers.paymentSuccessHandler);
router.post('/fail/:tranId', paymentControllers.paymentFailHandler);

// router.get('/',auth(USER_ROLE.admin),BookingControllers.getAllBookings)
// router.get('/my-bookings',auth(USER_ROLE.user),BookingControllers.getMyBookings)
// router.get('/:id', CarControllers.getSingleCar)
// router.put('/:id',auth(USER_ROLE.admin),validateRequest(carValidations.updateValidationCarSchema), CarControllers.updateCar)
// router.delete('/:id', CarControllers.deleteCar)

export const paymentRoutes = router;
