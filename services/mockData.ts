import { DiagnosticIssue, Garage } from '../types';

export const mockIssues: DiagnosticIssue[] = [
  {
    code: "P0300",
    title: "Ratés d'allumage détectés",
    description: "Le moteur ne brûle pas le carburant correctement dans un ou plusieurs cylindres. Cela peut causer des vibrations et une perte de puissance.",
    severity: "high",
    recommendation: "Vérifier les bougies d'allumage et les bobines. Réparation recommandée rapidement.",
    system: "engine"
  },
  {
    code: "P0171",
    title: "Mélange trop pauvre (Banc 1)",
    description: "Il y a trop d'air et pas assez de carburant dans le mélange. Souvent dû à une petite fuite d'air.",
    severity: "medium",
    recommendation: "Pas de danger immédiat, mais cela augmente la consommation. À faire vérifier.",
    system: "engine"
  },
   {
    code: "C0035",
    title: "Capteur vitesse roue avant gauche",
    description: "Signal erratique ou absent du capteur ABS de la roue avant gauche.",
    severity: "medium",
    recommendation: "Le système ABS peut être désactivé par sécurité. Freinage standard opérationnel.",
    system: "brakes"
  }
];

export const mockGarages: Garage[] = [
  {
    id: '1',
    name: 'Garage Speedy Center',
    distance: '0.8 km',
    rating: 4.5,
    nextAvailability: 'Aujourd\'hui 14h00',
    priceEstimate: '45€ - 90€',
    coords: { x: 30, y: 40 }
  },
  {
    id: '2',
    name: 'Midas Auto Services',
    distance: '1.2 km',
    rating: 4.2,
    nextAvailability: 'Demain 09h00',
    priceEstimate: '50€ - 100€',
    coords: { x: 70, y: 20 }
  },
  {
    id: '3',
    name: 'Atelier Mécanique Pro',
    distance: '2.5 km',
    rating: 4.8,
    nextAvailability: 'Aujourd\'hui 16h30',
    priceEstimate: 'Sur devis',
    coords: { x: 50, y: 70 }
  }
];