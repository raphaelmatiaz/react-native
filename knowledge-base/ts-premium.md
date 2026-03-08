export interface PremiumState {
  isPremium: boolean;
  purchaseDate?: string;
  expiryDate?: string; // if yearly
  lifetime?: boolean;
}