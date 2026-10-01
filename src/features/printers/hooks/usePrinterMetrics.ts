import { useContext } from 'react';

import { PrinterMetricsContext } from '../context/PrinterMetricsContext';

export const usePrinterMetrics = () => {
  const context = useContext(PrinterMetricsContext);

  if (!context) {
    throw new Error(
      'usePrinterMetrics must be used within PrinterMetricsProvider'
    );
  }

  return context;
};
