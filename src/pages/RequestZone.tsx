
import React from 'react';
import Header from '../components/Header';
import AddZoneForm from '../components/AddZoneForm';
import Seo, { SITE_URL } from '@/components/Seo';
import SiteFooter from "@/components/SiteFooter";

const RequestZone = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Seo
        title="Aggiungi una città | ZTL Elettrica Italia"
        description="Proponi una nuova città da aggiungere alla mappa delle ZTL per auto elettriche. Il progetto cresce con le segnalazioni della community."
        path="/richiedi-zona"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Aggiungi una città", item: `${SITE_URL}/richiedi-zona` },
          ],
        }}
      />
      <Header />
      
      <main className="flex-1 container mx-auto py-4">
        <AddZoneForm />
        
        <div className="max-w-xl mx-auto mt-8 p-4 md:p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-3">Informazioni sul processo</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Dopo l'invio della richiesta, il nostro team valuterà le informazioni fornite e verificherà 
              la correttezza dei dati prima di aggiungere la nuova zona alla mappa.
            </p>
            <p>
              Le zone aggiunte passano attraverso un processo di revisione per garantire 
              che tutte le informazioni siano accurate e aggiornate.
            </p>
            <p>
              Per qualsiasi domanda o chiarimento, puoi contattarci direttamente all'indirizzo 
              <a href="mailto:info@auroradigital.it" className="text-primary underline ml-1">
                info@auroradigital.it
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <SiteFooter className="mt-8" />
    </div>
  );
};

export default RequestZone;
