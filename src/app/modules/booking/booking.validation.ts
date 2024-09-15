import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    car: z.string().nonempty('Car ID is required'),
    'pick-up-date': z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in the format YYYY-MM-DD',
    }),
    'pick-up-time': z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: 'Pick-up time must be in the format HH:MM:SS',
    }),
    'drop-off-date': z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format YYYY-MM-DD',
      })
      .optional(),
    'drop-off-time': z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Drop-off time must be in the format HH:MM:SS',
      })
      .optional(),
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().nonempty('Phone number is required'),
    address: z.string().nonempty('Address is required'),
  }),
});

const updateBookingSchema = z.object({
  body: z.object({
    carId: z.string().optional(),
    'pick-up-date': z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format YYYY-MM-DD',
      })
      .optional(),
    'pick-up-time': z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Pick-up time must be in the format HH:MM:SS',
      })
      .optional(),
    'drop-off-date': z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format YYYY-MM-DD',
      })
      .optional(),
    'drop-off-time': z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Drop-off time must be in the format HH:MM:SS',
      })
      .optional(),
    name: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.number() || z.string().optional(),
    address: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const BookingValidations = {
  createBookingSchema,
  updateBookingSchema,
};