import type { PrinterMetric } from '../types/api';

export type PreparedPrinterMetric = PrinterMetric & {
  date: string;
};

export const preparePrinterMetrics = (
  metrics: PrinterMetric[]
): PreparedPrinterMetric[] => {
  return metrics
    .map((metric) => ({
      ...metric,

      date: new Date(metric.timestamp).toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }))
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
};
