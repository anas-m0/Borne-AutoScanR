
export enum AppStep {
  WELCOME = 'WELCOME',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  VEHICLE_SELECT = 'VEHICLE_SELECT',
  COMPATIBILITY_CHECK = 'COMPATIBILITY_CHECK',
  PAYMENT_IMPRINT = 'PAYMENT_IMPRINT',
  INSTRUCTIONS = 'INSTRUCTIONS',
  SCANNING = 'SCANNING',
  UNPLUG = 'UNPLUG',
  PLAN_SELECTION = 'PLAN_SELECTION',
  RESULTS = 'RESULTS',
  COLLECT_CONTACT = 'COLLECT_CONTACT',
  MAP = 'MAP',
  BOOKING = 'BOOKING',
  SEND_REPORT = 'SEND_REPORT',
  FINAL_SUCCESS = 'FINAL_SUCCESS',
  GOODBYE = 'GOODBYE',
}

export interface Garage {
  id: string;
  name: string;
  logo?: string;
  distance: string;
  rating: number;
  nextAvailability: string;
  priceEstimate: string;
  lat: number;
  lng: number;
}

export interface DiagnosticIssue {
  code: string;
  title: string;
  description: string;
  simplifiedExplanation: string;  // plain-language explanation for non-mechanics
  howItWorks: string;             // how the system/part normally works
  partsAffected: string[];        // list of parts involved
  severity: 'low' | 'medium' | 'high';
  urgency: 'immediate' | 'soon' | 'monitor'; // action timeline
  estimatedCost: string;          // e.g. "80€ – 200€"
  recommendation: string;
  system: 'engine' | 'transmission' | 'brakes' | 'exhaust' | 'electrical' | 'suspension';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}
