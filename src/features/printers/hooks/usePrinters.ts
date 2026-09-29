import { useContext } from 'react';

import { PrintersContext } from '../context/PrintersContext';

export const usePrinters = () => {
  const context = useContext(PrintersContext);

  if (!context) {
    throw new Error('usePrinters must be used within PrintersProvider');
  }

  return context;
};
