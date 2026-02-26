import { DiagnosticIssue, Garage } from '../types';

export const mockIssues: DiagnosticIssue[] = [
  {
    code: "P0300",
    title: "Ratés d'allumage détectés",
    description: "Le moteur ne brûle pas le carburant correctement dans un ou plusieurs cylindres, causant des vibrations et une perte de puissance.",
    simplifiedExplanation: "Imaginez que votre moteur soit comme un groupe de sportifs qui pédalent ensemble. Si l'un d'eux rate son coup de pédale de temps en temps, le vélo avance par à-coups. C'est exactement ce qui se passe ici : un ou plusieurs cylindres \"ratent\" leur explosion, le moteur tremble et perd en efficacité.",
    howItWorks: "Chaque cylindre du moteur aspire un mélange d'air et d'essence, le comprime, puis une bougie d'allumage crée une étincelle pour tout faire exploser. Cette explosion pousse un piston qui fait tourner le moteur. Si la bougie est usée ou que la bobine d'allumage est défaillante, l'explosion ne se produit pas — c'est un \"raté\".",
    partsAffected: ["Bougies d'allumage", "Bobines d'allumage", "Injecteurs", "Capteur de position vilebrequin"],
    severity: "high",
    urgency: "immediate",
    estimatedCost: "80€ – 250€",
    recommendation: "Faites vérifier et remplacer les bougies d'allumage et les bobines dès que possible. Rouler avec ce défaut peut endommager le pot catalytique.",
    system: "engine"
  },
  {
    code: "P0171",
    title: "Mélange trop pauvre (Banc 1)",
    description: "Il y a trop d'air et pas assez de carburant dans le mélange. Souvent dû à une petite fuite d'air.",
    simplifiedExplanation: "Pour bien fonctionner, votre moteur a besoin d'un mélange précis d'air et d'essence — un peu comme une recette de cuisine. Ici, il y a trop d'air et pas assez d'essence. Résultat : le moteur tourne mais gaspille plus de carburant et peut manquer de puissance.",
    howItWorks: "Une sonde lambda (capteur d'oxygène) surveille en permanence les gaz d'échappement pour vérifier que le mélange air/carburant est bien dosé. Si elle détecte trop d'air, elle envoie un signal au calculateur qui essaie de corriger en injectant plus d'essence. Si le correctif est trop important, le code P0171 s'allume.",
    partsAffected: ["Sonde lambda (amont)", "Débitmètre d'air", "Injecteurs", "Durites d'admission (fuites)"],
    severity: "medium",
    urgency: "soon",
    estimatedCost: "50€ – 180€",
    recommendation: "Pas de danger immédiat, mais la consommation augmente. Faites vérifier les fuites d'air sur les durites et le débit des injecteurs.",
    system: "engine"
  },
  {
    code: "C0035",
    title: "Capteur vitesse roue avant gauche",
    description: "Signal erratique ou absent du capteur ABS de la roue avant gauche.",
    simplifiedExplanation: "Ce petit capteur surveille la vitesse de rotation de chaque roue pour aider l'ABS à fonctionner. Si ce capteur envoie un signal incorrect, le système ABS ne sait plus exactement si la roue bloque ou non au freinage. Il peut donc se désactiver par précaution pour éviter des réactions imprévisibles.",
    howItWorks: "L'ABS (Anti-Blocage des Systèmes) empêche vos roues de bloquer lors d'un freinage d'urgence, ce qui évite de déraper. Quatre capteurs de vitesse, un par roue, mesurent en permanence leur rotation et transmettent l'information au calculateur ABS. Si l'un d'eux est défaillant (câble coupé, capteur sale, roulement usé), l'ABS s'éteint.",
    partsAffected: ["Capteur ABS roue avant gauche", "Câble de liaison capteur", "Roulement de roue avant gauche"],
    severity: "medium",
    urgency: "soon",
    estimatedCost: "60€ – 150€",
    recommendation: "Le freinage standard reste opérationnel, mais l'ABS est désactivé. Évitez les conditions glissantes et faites vérifier le capteur rapidement.",
    system: "brakes"
  }
];

export const mockGarages: Garage[] = [
  {
    id: '1',
    name: 'Garage Norauto',
    logo: '/logos/norauto.png',
    distance: '1.2 km',
    rating: 4.5,
    nextAvailability: "Aujourd'hui 14h00",
    priceEstimate: '45€ - 90€',
    lat: 43.1310,
    lng: 5.9180
  },
  {
    id: '2',
    name: 'Garage BestDrive',
    logo: '/logos/bestdrive.png',
    distance: '0.5 km',
    rating: 4.2,
    nextAvailability: 'Demain 09h00',
    priceEstimate: '50€ - 100€',
    lat: 43.1255,
    lng: 5.9350
  },
  {
    id: '3',
    name: 'Garage Speedy',
    logo: '/logos/speedy.png',
    distance: '2.5 km',
    rating: 4.8,
    nextAvailability: "Aujourd'hui 16h30",
    priceEstimate: 'Sur devis',
    lat: 43.1090,
    lng: 5.9380
  }
];