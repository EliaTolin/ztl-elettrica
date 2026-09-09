import { z } from "zod";

/**
 * Solo ciò che un contributore ha davvero in testa è obbligatorio.
 *
 * Prima erano richiesti 7 campi, tra cui l'URL esatto del portale comunale e
 * l'email dell'ufficio: dati che richiedono una ricerca sul sito del Comune
 * prima ancora di poter inviare. Chi sa "nella mia città le elettriche entrano
 * senza permesso" abbandonava il form. Le informazioni mancanti vengono
 * completate in fase di revisione, che è già parte del processo dichiarato.
 */
export const zoneFormSchema = z.object({
  // Obbligatori: il minimo per aprire una scheda città.
  cityName: z.string().min(2, {
    message: "Il nome della città deve avere almeno 2 caratteri.",
  }),
  region: z.string().min(2, {
    message: "La regione deve avere almeno 2 caratteri.",
  }),
  description: z.string().min(10, {
    message: "Descrivi in poche parole come funziona l'accesso (almeno 10 caratteri).",
  }),
  autoAccess: z.boolean().default(false),
  freeParking: z.boolean().default(false),

  // Utile per ricontattare chi segnala: chiesto, non imposto.
  contactEmail: z
    .string()
    .email({ message: "Inserisci un indirizzo email valido." })
    .optional()
    .or(z.literal("")),

  // Tutto il resto è un di più: se lo sai lo aggiungi, altrimenti lo verifichiamo noi.
  requestUrl: z
    .string()
    .url({ message: "Inserisci un URL valido (es. https://comune.esempio.it/ztl)." })
    .optional()
    .or(z.literal("")),
  duration: z.string().optional(),
  officeAddress: z.string().optional(),
  officeHours: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email({ message: "Inserisci un indirizzo email valido." })
    .optional()
    .or(z.literal("")),
  parkingZones: z.string().optional(),
  ztlAccess: z.string().optional(),
  cost: z.string().optional(),
  paymentMethod: z.string().optional(),
  requiredDocuments: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
});

export type ZoneFormValues = z.infer<typeof zoneFormSchema>;
