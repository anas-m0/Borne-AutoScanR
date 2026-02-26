
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/Button';
import { mockGarages } from '../services/mockData';
import { MapPin, Star, Calendar, Send, Navigation, Clock, Phone, Wrench } from 'lucide-react';
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
    // Fix for grey areas / improper centering in Leaflet
    setTimeout(() => {
      map.invalidateSize();
    }, 400);

    if (coords) {
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
    <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col px-6 pb-6 gap-6">
      {/* ── Screen Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black text-brand-dark tracking-tight">Où réparer votre véhicule ?</h2>
          <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
            Nous avons sélectionné des garages partenaires fiables près de chez vous.
            Prenez rendez-vous directement ou demandez des devis personnalisés pour vos anomalies.
          </p>
        </div>

        {/* Repair Visual Decor - Right Side */}
        <div className="hidden lg:flex items-center gap-5 bg-white border border-slate-100 px-6 py-4 rounded-3xl shadow-sm relative overflow-hidden mr-4 xl:mr-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shadow-inner rotate-3">
            <Wrench className="text-brand-primary" size={28} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col relative z-10">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Réseau partenaire</span>
            <span className="text-lg font-black text-brand-dark leading-tight">Mise en relation<br />& Réparation</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row glass-panel rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40">

        {/* List / Sidebar */}
        <div className="w-full md:w-[400px] bg-white border-r border-slate-100 flex flex-col z-20 shadow-[10px_0_30px_-10px_rgba(0,0,0,0.1)] relative">
          <div className="p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
            <h2 className="text-xl font-black text-brand-primary tracking-tight">Nos garages partenaires</h2>
            <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-[0.2em]">{mockGarages.length} pros recommandés</p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pb-28 bg-slate-50/30">
            {mockGarages.map((garage) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={garage.id}
                onClick={() => setSelectedGarage(garage.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-all duration-300 relative overflow-hidden group ${selectedGarage === garage.id ? 'bg-brand-primary/5' : 'hover:bg-white bg-transparent'}`}
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${selectedGarage === garage.id ? 'bg-brand-primary scale-y-100' : 'bg-slate-200 scale-y-0 group-hover:scale-y-100'}`} />

                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-2.5">
                    {garage.logo && (
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center p-1 shrink-0 shadow-sm">
                        <img src={garage.logo} alt={`Logo ${garage.name}`} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <h3 className={`font-black text-base leading-tight transition-colors pr-3 ${selectedGarage === garage.id ? 'text-brand-primary' : 'text-slate-800'}`}>{garage.name}</h3>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md shrink-0 border ${selectedGarage === garage.id ? 'bg-white text-brand-primary border-brand-primary/20 shadow-sm' : 'bg-slate-100 text-slate-500 border-transparent'}`}>
                    {garage.distance}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-brand-accent mb-2.5">
                  <Star className="fill-current w-3.5 h-3.5" />
                  <span className="text-xs font-black">{garage.rating}</span>
                  <span className="text-[10px] text-slate-400 ml-1 font-bold">(124 avis)</span>
                </div>

                <div className="text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-brand-primary" />
                      <span className="font-bold">Prochaine dispo</span>
                    </div>
                    <span className="text-orange-600 font-black bg-orange-100/80 border border-orange-200/50 px-2 py-0.5 rounded shadow-sm shadow-orange-500/10">{garage.nextAvailability}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedGarage === garage.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-3 overflow-hidden"
                    >
                      <Button variant="primary" className="w-full text-sm py-2.5 shadow-md shadow-brand-primary/20 hover:shadow-lg focus:outline-none" onClick={() => onBook(garage.id)}>
                        Prendre rendez-vous
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Global Action Footer */}
          <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 p-5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-30">
            <Button
              variant="secondary"
              className="w-full text-base font-black tracking-tight py-4 text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors shadow-none border-none font-['Poppins']"
              onClick={onSendReport}
            >
              Je ne souhaite pas prendre RDV maintenant
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
    </div>
  );
};

export default MapScreen;
