import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
    
    if (!publishableKey) {
      console.error('VITE_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Tipo para el evento de cambio del card element
export interface StripeCardChangeEvent {
  elementType: 'card';
  empty: boolean;
  complete: boolean;
  error?: {
    type: string;
    code: string;
    message: string;
  };
  value: {
    postalCode: string;
  };
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'unknown';
}

// Tipo para las opciones del card element
export interface StripeCardOptions {
  style?: {
    base?: Record<string, any>;
    complete?: Record<string, any>;
    empty?: Record<string, any>;
    invalid?: Record<string, any>;
  };
  hidePostalCode?: boolean;
  iconStyle?: 'default' | 'solid';
  disabled?: boolean;
}