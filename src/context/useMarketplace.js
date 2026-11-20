import { useContext } from 'react';
import { MarketplaceContext } from './marketplaceContext';

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }

  return context;
};
