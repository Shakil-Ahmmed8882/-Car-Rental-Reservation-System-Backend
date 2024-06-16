import { z } from 'zod';
const createBookingSchema = z.object({
  body: z.object({
    carId: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in the format YYYY-MM-DD',
    }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Start time must be in the format HH:MM',
    }),
  }),
});

export const BookingValidations = {
  createBookingSchema,
};
