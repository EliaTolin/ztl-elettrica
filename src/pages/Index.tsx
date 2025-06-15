import React, { useState, useMemo, useEffect } from 'react';
import { City } from '../data/cities';
import MapView from '../components/MapView';
import CityCard from '../components/CityCard';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';

interface MapBounds {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [autoAccessOnly, setAutoAccessOnly] = useState<boolean>(false);
  const [freeParkingOnly, setFreeParkingOnly] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapBounds] = useState<MapBounds | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Set initial bounds for Italy
  useEffect(() => {
    try {
      console.log('Setting initial bounds');
      
    } catch (err) {
      console.error('Error setting initial bounds:', err);
      setError('Errore nell\'inizializzazione della mappa');
    }
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        setDebugInfo('Fetching all cities...');
        const { data, error } = await supabase.rpc('get_all_ztl_with_latlng');
        if (error) {
          setDebugInfo(`Supabase error: ${error.message}`);
          throw error;
        }
        setCities(data || []);
        setDebugInfo(`Received ${data?.length || 0} cities`);
      } catch (err) {
        setError('Si è verificato un errore nel caricamento delle città. Riprova più tardi.');
        setDebugInfo(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const availableRegions = useMemo(() => {
    const regions = new Set<string>();
    cities.forEach(city => regions.add(city.region));
    return Array.from(regions).sort();
  }, [cities]);

  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      if (autoAccessOnly && city.needs_display) return false;
      if (freeParkingOnly && !city.free_parking) return false;
      if (selectedRegion && selectedRegion !== 'all' && city.region !== selectedRegion) return false;
      return true;
    });
  }, [cities, autoAccessOnly, freeParkingOnly, selectedRegion]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (autoAccessOnly) count++;
    if (freeParkingOnly) count++;
    if (selectedRegion && selectedRegion !== 'all') count++;
    return count;
  }, [autoAccessOnly, freeParkingOnly, selectedRegion]);

  const clearFilters = () => {
    setAutoAccessOnly(false);
    setFreeParkingOnly(false);
    setSelectedRegion('');
  };

  // Debug information
  const renderDebugInfo = () => {
    if (!import.meta.env.DEV) return null;
    
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md overflow-auto max-h-48">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre>{JSON.stringify({
          isLoading,
          error,
          citiesCount: cities.length,
          filteredCitiesCount: filteredCities.length,
          mapBounds,
          debugInfo
        }, null, 2)}</pre>
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <h2 className="font-bold mb-2">Errore</h2>
            <p>{error}</p>
            {debugInfo && (
              <div className="mt-2 text-sm">
                <p className="font-semibold">Informazioni di debug:</p>
                <pre className="mt-1 bg-red-100 p-2 rounded">{debugInfo}</pre>
              </div>
            )}
          </div>
        </main>
        {renderDebugInfo()}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 animate-fade-in">
        {isLoading && !cities.length ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <FilterBar 
              autoAccessOnly={autoAccessOnly}
              setAutoAccessOnly={setAutoAccessOnly}
              freeParkingOnly={freeParkingOnly}
              setFreeParkingOnly={setFreeParkingOnly}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              availableRegions={availableRegions}
              clearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4 order-2 md:order-1">
                <div className="transition-all duration-300 hover:shadow-lg rounded-lg">
                  <MapView 
                    onCitySelect={setSelectedCity}
                    filteredCities={filteredCities}
                  />
                </div>

                <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-lg font-medium mb-4">Domande Frequenti</h2>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-sm mb-2">Cos'è una ZTL?</h3>
                      <p className="text-sm text-muted-foreground">Zona a Traffico Limitato, area urbana in cui l'accesso e la circolazione dei veicoli sono limitati a determinate categorie.</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-sm mb-2">I veicoli elettrici hanno sempre accesso gratuito?</h3>
                      <p className="text-sm text-muted-foreground">Non sempre. Ogni comune stabilisce regole proprie, spesso i veicoli elettrici hanno accesso facilitato ma potrebbero richiedere permessi specifici.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm mb-2">Come segnalare un aggiornamento?</h3>
                      <p className="text-sm text-muted-foreground">Seleziona una città e clicca su "Segnala Aggiornamento" per inviarci un'email con le informazioni aggiornate.</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-sm mb-2">Come garantite l'attendibilità dei dati?</h3>
                      <p className="text-sm text-muted-foreground">
                        Siamo un progetto collaborativo basato sul contributo della community. I dati sulle ZTL e le regole per veicoli elettrici vengono raccolti e aggiornati dagli utenti stessi. 
                        Non possiamo garantire al 100% l'accuratezza delle informazioni, per questo invitiamo sempre a verificare con le fonti ufficiali dei singoli comuni.
                        Se noti imprecisioni, aiutaci a migliorare la precisione segnalando gli aggiornamenti.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-1 order-1 md:order-2">
                {selectedCity ? (
                  <CityCard 
                    city={selectedCity} 
                    onClose={() => setSelectedCity(null)} 
                  />
                ) : (
                  <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                    <h2 className="text-xl font-semibold mb-2 animate-fade-in">Seleziona una città</h2>
                    <p className="text-muted-foreground animate-fade-in">
                      Clicca su un punto della mappa per visualizzare le informazioni dettagliate sull'accesso ZTL per veicoli elettrici.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-white border-t py-4 animate-fade-in">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ZTL Elettrica Italia - Le informazioni fornite potrebbero variare, consulta sempre i siti ufficiali dei comuni.</p>
        </div>
      </footer>
      {renderDebugInfo()}
    </div>
  );
};

export default Index;
