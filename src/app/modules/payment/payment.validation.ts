import { z } from 'zod';

const createPaymentSchema = z.object({
  body: z.object({
    bookingId: z.string().nonempty('Booking ID is required'),
  }),
});

export const pamentValidations = {
  createPaymentSchema,
};
