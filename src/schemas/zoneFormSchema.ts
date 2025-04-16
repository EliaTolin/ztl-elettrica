import { z } from "zod";

export const zoneFormSchema = z.object({
  cityName: z.string().min(2, {
    message: "Il nome della città deve avere almeno 2 caratteri.",
  }),
  region: z.string().min(2, {
    message: "La regione deve avere almeno 2 caratteri.",
  }),
  description: z.string().min(10, {
    message: "La descrizione deve avere almeno 10 caratteri.",
  }),
  requestUrl: z.string().url({
    message: "Inserisci un URL valido.",
  }),
  autoAccess: z.boolean().default(false),
  freeParking: z.boolean().default(false),
  duration: z.string().min(2, {
    message: "Specifica la durata del permesso.",
  }),
  officeAddress: z.string().optional(),
  officeHours: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({
    message: "Inserisci un indirizzo email valido.",
  }),
  parkingZones: z.string().optional(),
  ztlAccess: z.string().optional(),
  cost: z.string().optional(),
  paymentMethod: z.string().optional(),
  requiredDocuments: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
  contactEmail: z.string().email({
    message: "Inserisci un indirizzo email per essere ricontattato.",
  }).optional(),
});

export type ZoneFormValues = z.infer<typeof zoneFormSchema>;
