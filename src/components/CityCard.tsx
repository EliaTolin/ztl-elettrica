
import React from 'react';
import { City } from '../data/cities';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Link, Copy, X, ExternalLink, Clock, MapPin, Phone, Mail, Car, Euro, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface CityCardProps {
  city: City | null;
  onClose: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClose }) => {
  const { toast } = useToast();

  if (!city) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    const titleMessage = type === 'URL' ? 'URL copiato!' : 'Testo copiato!';
    toast({
      title: titleMessage,
      description: "Informazione copiata negli appunti",
      duration: 3000,
    });
  };

  return (
    <Card className="w-full max-w-xl animate-fade-in city-card">
      <CardHeader className="relative pb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 bottom-4 hover:rotate-90" 
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-1 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{city.name}</CardTitle>
            <span className="text-sm text-muted-foreground">{city.region}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Aggiornato il: {city.created_at ? new Date(city.created_at).toLocaleDateString('it-IT', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : ''}
            </span>
          </div>
          <div className="flex gap-2 py-1">
            <Badge 
              variant="outline" 
              className={`${!city.needs_display ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'} transition-all duration-200 hover:scale-105`}
            >
              {!city.needs_display ? 'Accesso Automatico' : 'Richiede Permesso'}
            </Badge>
            <Badge 
              variant="outline" 
              className={`${city.free_parking ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'} transition-all duration-200 hover:scale-105`}
            >
              {city.free_parking ? 'Parcheggio Gratuito' : 'Parcheggio a Pagamento'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 space-y-6 user-select-text" style={{ userSelect: 'text' }}>
        {/* Durata */}
        {city.duration && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>Durata</span>
            </h3>
            <p className="text-sm">{city.duration}</p>
          </div>
        )}

        {/* Richiesta Online */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Link Richiesta</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 text-xs text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200" 
              asChild
            >
              <a href={city.request_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                Visita il sito
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 transition-transform hover:scale-110 duration-200" 
              onClick={() => copyToClipboard(city.request_url, 'URL')}
              aria-label="Copy URL"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Sportello Fisico */}
        {city.office_address && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>Sportello Fisico</span>
            </h3>
            <p className="text-sm">{city.office_address}</p>
            {city.office_hours && (
              <p className="text-sm text-muted-foreground">{city.office_hours}</p>
            )}
          </div>
        )}

        {/* Contatti */}
        {(city.phone || city.email) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Contatti</h3>
            {city.phone && (
              <p className="text-sm flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{city.phone}</span>
              </p>
            )}
            {city.email && (
              <p className="text-sm flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{city.email}</span>
              </p>
            )}
          </div>
        )}

        {/* Zone di sosta e ZTL */}
        {(city.parking_zones_description || city.ztl_access_description) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Car className="h-4 w-4 flex-shrink-0" />
              <span>Zone e Accessi</span>
            </h3>
            {city.parking_zones_description && (
              <p className="text-sm">Zone di sosta: {city.parking_zones_description}</p>
            )}
            {city.ztl_access_description && (
              <p className="text-sm">Accesso ZTL: {city.ztl_access_description}</p>
            )}
          </div>
        )}

        {/* Costi e Pagamento */}
        {(city.cost || city.payment_method) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Euro className="h-4 w-4 flex-shrink-0" />
              <span>Costi e Pagamento</span>
            </h3>
            {city.cost && <p className="text-sm">Costo: {city.cost}</p>}
            {city.payment_method && (
              <p className="text-sm">Metodo di pagamento: {city.payment_method}</p>
            )}
          </div>
        )}

        {/* Documentazione e Requisiti */}
        {(city.required_documents || city.requirements) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span>Documenti e Requisiti</span>
            </h3>
            {city.required_documents && (
              <p className="text-sm">Documenti: {city.required_documents}</p>
            )}
            {city.requirements && (
              <p className="text-sm">Requisiti: {city.requirements}</p>
            )}
          </div>
        )}

        {/* Note */}
        {city.notes && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Note Aggiuntive</h3>
            <p className="text-sm">{city.notes}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-start pt-2">
        <Button 
          variant="default" 
          size="sm" 
          className="h-8 bg-red-600 hover:bg-red-700 text-white transition-all duration-200 hover:scale-105" 
          asChild
        >
          <a href={`mailto:info@auroradigital.it?subject=Aggiornamento per ${city.name}`}>
            Segnala aggiornamento
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CityCard;
