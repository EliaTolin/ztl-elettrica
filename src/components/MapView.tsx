import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { City } from '../data/cities';
import { Button } from './ui/button';
import { MapPin, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useIsMobile } from '../hooks/use-mobile';

// Token Mapbox predefinito
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_TOKEN) {
  throw new Error('Missing Mapbox access token');
}

// Italy bounds
const ITALY_BOUNDS: [[number, number], [number, number]] = [
  [6.7499552751, 36.619987291], // Southwest coordinates
  [18.4802470232, 47.1153931748] // Northeast coordinates
];

interface MapViewProps {
  onCitySelect: (city: City) => void;
  filteredCities: City[];
}

const MapView: React.FC<MapViewProps> = ({ onCitySelect, filteredCities }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxTokenInput, setMapboxTokenInput] = useState<string>(MAPBOX_TOKEN);
  const [tokenConfirmed, setTokenConfirmed] = useState<boolean>(!!MAPBOX_TOKEN);
  const [mapError, setMapError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenConfirmed || !mapContainer.current) return;

    setMapError(null);
    
    try {
      mapboxgl.accessToken = mapboxTokenInput;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [12.5, 42.5], // Center of Italy
        zoom: 5.5,
        maxBounds: ITALY_BOUNDS,
        minZoom: 5, // Restrict minimum zoom
        maxZoom: 40 // Restrict maximum zoom
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error("Mapbox error:", e);
        if (e.error && typeof e.error === 'object' && 'status' in e.error && e.error.status === 401) {
          setMapError("Token di accesso Mapbox non valido. Inserisci un token valido per visualizzare la mappa.");
          setTokenConfirmed(false);
        } else {
          setMapError(`Errore nella mappa: ${e.error?.message || 'Errore sconosciuto'}`);
        }
      });

      return () => {
        Object.values(markers.current).forEach(marker => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Impossibile inizializzare la mappa. Verifica il token Mapbox.");
      setTokenConfirmed(false);
    }
  }, [tokenConfirmed, mapboxTokenInput]);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add markers for filtered cities
    filteredCities.forEach(city => {
      const el = document.createElement('div');
      const isSelected = city.id === selectedCityId;
      el.className = `flex items-center justify-center w-8 h-8 rounded-full ${isSelected ? 'bg-success' : 'bg-primary'} text-white cursor-pointer hover:scale-110`;
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

      el.addEventListener('click', () => {
        setSelectedCityId(city.id);
        onCitySelect(city);
        
        // Scorrimento automatico verso la scheda di dettaglio solo su mobile
        if (isMobile) {
          setTimeout(() => {
            const cityCard = document.querySelector('.city-card');
            if (cityCard) {
              cityCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 100);
        }
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([city.longitude, city.latitude])
        .addTo(map.current!);

      markers.current[city.id] = marker;
    });
  }, [filteredCities, mapLoaded, onCitySelect, isMobile, selectedCityId]);

  return (
    <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-7rem)] w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default MapView;
