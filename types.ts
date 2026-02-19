
export enum AppStep {
  WELCOME = 'WELCOME',
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
}

export interface Garage {
  id: string;
  name: string;
  distance: string;
  rating: number;
  nextAvailability: string;
  priceEstimate: string;
  coords: { x: number; y: number };
}

export interface DiagnosticIssue {
  code: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  system: 'engine' | 'transmission' | 'brakes' | 'electronics';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}
