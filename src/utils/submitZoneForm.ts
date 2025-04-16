
import { ZoneFormValues } from "@/schemas/zoneFormSchema";
import { toast } from "@/hooks/use-toast";

export async function submitZoneForm(data: ZoneFormValues, onSuccess: () => void) {
  try {
    // Invia il form a Formspree
    const response = await fetch('https://formspree.io/f/xyzebrkp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cityName: data.cityName,
        region: data.region,
        description: data.description,
        requestUrl: data.requestUrl,
        autoAccess: data.autoAccess ? 'Sì' : 'No',
        freeParking: data.freeParking ? 'Sì' : 'No',
        email: data.email,
        _subject: `Richiesta nuova zona: ${data.cityName}`
      }),
    });
    
    if (response.ok) {
      toast({
        title: "Richiesta inviata con successo!",
        description: "Grazie per la tua segnalazione. Ti risponderemo presto.",
      });
      onSuccess();
      return true;
    } else {
      throw new Error('Invio form fallito');
    }
  } catch (error) {
    toast({
      title: "Errore durante l'invio",
      description: "Si è verificato un errore. Riprova più tardi o contattaci direttamente.",
      variant: "destructive",
    });
    console.error("Errore invio form:", error);
    return false;
  }
}
