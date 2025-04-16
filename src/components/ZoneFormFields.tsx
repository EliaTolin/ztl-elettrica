import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ZoneFormValues } from "@/schemas/zoneFormSchema";
import { Mail, Loader2, MapPin, Euro, FileText, Clock, Phone, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface ZoneFormFieldsProps {
  form: UseFormReturn<ZoneFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: ZoneFormValues) => void;
}

const ZoneFormFields: React.FC<ZoneFormFieldsProps> = ({ form, isSubmitting, onSubmit }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informazioni Principali</h3>
        <FormField
          control={form.control}
          name="cityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Città</FormLabel>
              <FormControl>
                <Input placeholder="Es. Milano" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regione</FormLabel>
              <FormControl>
                <Input placeholder="Es. Lombardia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrizione</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrivi come i veicoli elettrici possono accedere alla ZTL..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durata Permesso</FormLabel>
                <FormControl>
                  <Input placeholder="Es. 1 anno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Modalità di Accesso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="autoAccess"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accesso Automatico</FormLabel>
                  <FormDescription>
                    I veicoli elettrici possono accedere senza permesso
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="freeParking"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Parcheggio Gratuito</FormLabel>
                  <FormDescription>
                    I veicoli elettrici possono parcheggiare gratuitamente
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="requestUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Richiesta</FormLabel>
              <FormControl>
                <Input placeholder="https://www.comune.esempio.it/ztl" {...field} />
              </FormControl>
              <FormDescription>
                URL del sito ufficiale con le informazioni sulla ZTL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Ufficio e Contatti</h3>
          <p className="text-sm text-muted-foreground">(opzionale)</p>
        </div>
        <FormField
          control={form.control}
          name="officeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indirizzo Ufficio</FormLabel>
              <FormControl>
                <Input placeholder="Es. Via Roma 1, 00100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="officeHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orari Ufficio</FormLabel>
              <FormControl>
                <Input placeholder="Es. Lun-Ven 9:00-17:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="Es. 02 1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ufficio@comune.it" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Zone e Costi</h3>
        <FormField
          control={form.control}
          name="parkingZones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone di Sosta Consentite</FormLabel>
              <FormControl>
                <Input placeholder="Es. Tutte le zone blu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ztlAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accesso ZTL</FormLabel>
              <FormControl>
                <Input placeholder="Es. Accesso consentito H24" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo</FormLabel>
                <FormControl>
                  <Input placeholder="Es. 16€ di bolli" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metodo di Pagamento</FormLabel>
                <FormControl>
                  <Input placeholder="Es. Online, Bonifico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Requisiti e Note</h3>
          <p className="text-sm text-muted-foreground">(opzionale)</p>
        </div>
        <FormField
          control={form.control}
          name="requiredDocuments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documentazione Richiesta</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Es. Libretto di circolazione, Documento d'identità" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requisiti</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Es. Residenza nel comune" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note Aggiuntive</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Informazioni supplementari..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Contatto per Richiesta</h3>
          <p className="text-sm text-muted-foreground">Lascia il tuo indirizzo email se vuoi essere ricontattato</p>
        </div>
        
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>La tua Email di Contatto</FormLabel>
              <FormControl>
                <Input 
                  placeholder="tuo.contatto@email.it" 
                  type="email" 
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Opzionale: inserisci la tua email se vuoi ricevere aggiornamenti o chiarimenti
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Invia Richiesta
          </>
        )}
      </Button>
    </form>
  );
};

export default ZoneFormFields;
