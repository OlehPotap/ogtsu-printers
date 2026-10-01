import { Empty } from 'antd';
import { useParams } from 'react-router-dom';

import PrinterMetrics from '../features/printers/components/metrics/PrintersMetrics';

const PrinterMetricsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Empty description='Принтер не знайдено' />;
  }

  return <PrinterMetrics printerId={id} />;
};

export default PrinterMetricsPage;
