import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { Form } from "@/components/ui/form";
import { zoneFormSchema, ZoneFormValues } from "@/schemas/zoneFormSchema";
import { submitZoneForm } from "@/utils/submitZoneForm";
import ZoneFormFields from "./ZoneFormFields";

const AddZoneForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      cityName: "",
      region: "",
      description: "",
      requestUrl: "",
      autoAccess: false,
      freeParking: false,
      email: "",
      contactEmail: "",
    },
  });

  async function onSubmit(data: ZoneFormValues) {
    setIsSubmitting(true);
    
    try {
      await submitZoneForm(data, () => form.reset());
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm border my-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Suggerisci una nuova zona da inserire</h1>
        <p className="text-muted-foreground mt-2">
          Compila il modulo per richiedere l'aggiunta in ZTL Elettrica di una nuova zona ZTL per veicoli elettrici
        </p>
      </div>

      <Form {...form}>
        <ZoneFormFields 
          form={form} 
          isSubmitting={isSubmitting} 
          onSubmit={onSubmit} 
        />
      </Form>
    </div>
  );
};

export default AddZoneForm;
