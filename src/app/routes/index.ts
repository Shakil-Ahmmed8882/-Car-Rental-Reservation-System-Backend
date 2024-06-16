import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { carRoutes } from '../modules/car/car.route';
import { bookingRoutes } from '../modules/booking/booking.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/cars',
    route: carRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path,route.route));

export default router;
