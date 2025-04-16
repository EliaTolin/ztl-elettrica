
import React from 'react';
import Header from '../components/Header';
import AddZoneForm from '../components/AddZoneForm';

const RequestZone = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
      
      <footer className="bg-white border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ZTL Elettrica Italia - Le informazioni fornite potrebbero variare, consulta sempre i siti ufficiali dei comuni.</p>
        </div>
      </footer>
    </div>
  );
};

export default RequestZone;
