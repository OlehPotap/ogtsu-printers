import { useContext } from 'react';

import { LocationsContext } from '../context/LocationsContext';

export const useLocations = () => {
  const context = useContext(LocationsContext);

  if (!context) {
    throw new Error('useLocations must be used with LocationsProvider');
  }

  return context;
};
