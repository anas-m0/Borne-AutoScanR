
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/Button';
import { mockGarages } from '../services/mockData';
import { MapPin, Star, Calendar, Send, Navigation, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

interface Props {
  onBook: (garageId: string) => void;
  onSendReport: () => void;
}

// Fixed Coordinates for Kiosk (Toulon)
const KIOSK_COORDS: [number, number] = [43.1242, 5.9280];

// Custom Icons for Leaflet to match our branding
const createKioskIcon = () => {
  return L.divIcon({
    className: 'custom-kiosk-icon',
    html: `
            <div class="relative flex flex-col items-center">
              <div class="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-50 scale-150"></div>
              <div class="w-8 h-8 bg-brand-primary rounded-full border-4 border-white shadow-xl relative z-10"></div>
              <div class="mt-2 bg-brand-dark px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg whitespace-nowrap hidden md:block">Vous êtes ici</div>
            </div>
        `,
    iconSize: [40, 60],
    iconAnchor: [20, 20]
  });
};

const createGarageIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-garage-icon',
    html: `
            <div class="relative flex flex-col items-center transition-all duration-300 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="${isSelected ? 'rgba(245, 158, 11, 0.2)' : '#F1F5F9'}" stroke="${isSelected ? '#F59E0B' : '#64748B'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-md">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
            </div>
        `,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });
};


// Component to animate map bounds when a garage is selected
const MapFlyTo = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      // Calculate a point slightly out to fit both kiosk and garage. We just center on garage for now.
      map.flyTo(coords, 14, { duration: 1.5 });
    } else {
      map.flyTo(KIOSK_COORDS, 13, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
};


const MapScreen: React.FC<Props> = ({ onBook, onSendReport }) => {
  const [selectedGarage, setSelectedGarage] = useState<string | null>(null);
  const [routeLine, setRouteLine] = useState<[number, number][] | null>(null);
  const [routeStats, setRouteStats] = useState<{ distance: string, duration: string } | null>(null);

  const kioskIcon = useMemo(() => createKioskIcon(), []);

  // Selected garage details
  const activeGarage = mockGarages.find(g => g.id === selectedGarage);

  // Fetch Route from OSRM when a garage is selected
  useEffect(() => {
    const fetchRoute = async () => {
      if (!activeGarage) {
        setRouteLine(null);
        setRouteStats(null);
        return;
      }

      try {
        // OSRM expects coordinates in Lng,Lat order
        const startStr = `${KIOSK_COORDS[1]},${KIOSK_COORDS[0]}`;
        const endStr = `${activeGarage.lng},${activeGarage.lat}`;
        const url = `https://router.project-osrm.org/route/v1/driving/${startStr};${endStr}?overview=full&geometries=geojson`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // Convert GeoJSON coords (Lng, Lat) back to Leaflet format (Lat, Lng)
          const latLngs: [number, number][] = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
          setRouteLine(latLngs);

          // Format distance and duration
          const distKm = (route.distance / 1000).toFixed(1);
          const durMin = Math.round(route.duration / 60);
          setRouteStats({ distance: `${distKm} km`, duration: `${durMin} min` });
        }
      } catch (err) {
        console.error("Failed to fetch route", err);
      }
    };

    fetchRoute();
  }, [activeGarage]);


  return (
    <div className="flex-1 flex flex-col md:flex-row glass-panel rounded-3xl overflow-hidden mx-4 mb-4 border-slate-200">

      {/* List / Sidebar */}
      <div className="w-full md:w-1/3 bg-white border-r border-slate-100 flex flex-col z-20 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)] relative">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
          <h2 className="text-xl font-heading font-bold text-brand-primary">Garages Partenaires</h2>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-widest">{mockGarages.length} pros à Toulon</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
          {mockGarages.map((garage) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={garage.id}
              onClick={() => setSelectedGarage(garage.id)}
              className={`p-6 border-b border-slate-50 cursor-pointer transition-all duration-300 hover:bg-slate-50 ${selectedGarage === garage.id ? 'bg-brand-primary/5 border-l-4 border-l-brand-primary' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-brand-primary">{garage.name}</h3>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-lg">
                  {garage.distance}
                </span>
              </div>

              <div className="flex items-center gap-1 text-brand-accent mb-3">
                <Star className="fill-current w-4 h-4" />
                <span className="text-xs font-bold">{garage.rating}</span>
                <span className="text-[10px] text-slate-400 ml-1 font-medium">(124 avis)</span>
              </div>

              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-brand-primary" />
                  <span>Dispo: <span className="text-brand-dark font-bold">{garage.nextAvailability}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-brand-primary">{garage.priceEstimate}</span>
                  <span className="text-[9px] font-bold uppercase opacity-50">estimé</span>
                </div>
              </div>

              <AnimatePresence>
                {selectedGarage === garage.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pt-4 border-t border-slate-100 overflow-hidden"
                  >
                    <Button variant="primary" className="w-full text-[10px] py-3" onClick={() => onBook(garage.id)}>
                      Réserver ce créneau
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Global Action Footer */}
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4">
          <Button
            variant="secondary"
            className="w-full text-[10px] py-4"
            onClick={onSendReport}
            icon={<Send size={14} />}
          >
            Demander des devis
          </Button>
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="flex-1 bg-slate-100 relative z-10 hidden md:block">

        <MapContainer
          center={KIOSK_COORDS}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <MapFlyTo coords={activeGarage ? [activeGarage.lat, activeGarage.lng] : null} />

          {/* Render the Route Line if available */}
          {routeLine && (
            <Polyline
              positions={routeLine}
              pathOptions={{ color: '#F59E0B', weight: 4, dashArray: '10, 10', className: 'animate-pulse' }}
            />
          )}

          {/* Kiosk Location */}
          <Marker position={KIOSK_COORDS} icon={kioskIcon} />

          {/* Garage Locations */}
          {mockGarages.map((garage) => (
            <Marker
              key={garage.id}
              position={[garage.lat, garage.lng]}
              icon={createGarageIcon(selectedGarage === garage.id)}
              eventHandlers={{ click: () => setSelectedGarage(garage.id) }}
            />
          ))}
        </MapContainer>

        {/* Route Stats Overlay */}
        <AnimatePresence>
          {routeStats && activeGarage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl z-[400] border border-slate-100 min-w-[200px]"
            >
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">
                Itinéraire
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Navigation size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800">{routeStats.distance}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Distance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Clock size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800">{routeStats.duration}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Temps de trajet</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default MapScreen;
