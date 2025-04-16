import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageCircle, Map, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TelegramIcon from '@/components/icons/TelegramIcon';
const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Contatti</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TelegramIcon className="h-5 w-5 text-primary" />
                Gruppo Telegram
              </CardTitle>
              <CardDescription>Unisciti al nostro gruppo Telegram</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Entra nel nostro gruppo Telegram per rimanere aggiornato e discutere con altri utenti:</p>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                asChild
              >
                <a href="https://t.me/ztlelettrica" target="_blank" rel="noopener noreferrer">
                  @ztlelettrica
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </CardTitle>
              <CardDescription>Scrivimi una email</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Per richieste di informazioni o collaborazioni:</p>
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <a href="mailto:info@auroradigital.it">
                  info@auroradigital.it
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                Contribuisci
              </CardTitle>
              <CardDescription>Contribuisci al progetto</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Questo progetto è open source. Contribuisci su GitHub:</p>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                asChild
              >
                <a href="https://github.com/eliatolin/ztl-elettrica" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Contribuisci
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Informazioni sul Progetto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ZTL Elettrica è un progetto che mira a semplificare l'accesso alle informazioni 
                sulle Zone a Traffico Limitato per i veicoli elettrici in Italia. Stiamo costantemente 
                aggiornando il database con nuove città e informazioni.
              </p>
              <p className="mt-4">
                Se hai suggerimenti o riscontri errori nelle informazioni, non esitare a contattarci.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contacts;
