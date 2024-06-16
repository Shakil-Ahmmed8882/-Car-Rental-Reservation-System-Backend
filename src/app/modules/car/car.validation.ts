import { z } from 'zod';

const createCarValidationSchema = z.object({
  body:z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    color: z.string().nonempty("Color is required"),
    isElectric: z.boolean().refine(val => val !== undefined, { message: "isElectric is required" }),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()).min(1, "Features are required"),
    pricePerHour: z.number().positive("Price per hour must be a positive number"),
    isDeleted: z.boolean().default(false)
  })
});

const updateValidationCarSchema = z.object({
 body:z.object({
    name: z.string().nonempty("Name is required").optional(),
    description: z.string().nonempty("Description is required").optional(),
    color: z.string().nonempty("Color is required").optional(),
    isElectric: z.boolean().refine(val => val !== undefined, { message: "isElectric is required" }).optional(),
    status: z.enum(['available', 'unavailable']).default('available').optional(),
    features: z.array(z.string()).min(1, "Features are required").optional(),
    pricePerHour: z.number().positive("Price per hour must be a positive number").optional(),
    isDeleted: z.boolean().default(false).optional(),
 })
});

const returnCarValidationSchema = z.object({
 body:z.object({
  
    bookingId:z.string(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'End time must be in the format HH:MM',
    }),
 
 })
});

export const carValidations = {
    createCarValidationSchema,
    updateValidationCarSchema,
    returnCarValidationSchema
}
