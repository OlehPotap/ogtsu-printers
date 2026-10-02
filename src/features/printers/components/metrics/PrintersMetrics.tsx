import { Empty, Flex, Skeleton, Typography } from 'antd';

import { useGetPrinterMetricsQuery } from '../../api/printersApi';
import { usePrinterMetrics } from '../../hooks/usePrinterMetrics';

import MetricsSummary from './MetricsSummary';
import SuppliesHistoryChart from './SuppliesHistoryChart';
import ImpressionsHistoryChart from './ImpressionHistoryChart';

import { useMemo } from 'react';

import { preparePrinterMetrics } from '../../utils/preparePrinterMetrics';

const { Title } = Typography;

type PrinterMetricsProps = {
  printerId: string;
};

const PrinterMetrics = ({ printerId }: PrinterMetricsProps) => {
  const { queryParams } = usePrinterMetrics();

  const { data, isLoading, isFetching, isError } = useGetPrinterMetricsQuery({
    id: printerId,
    params: queryParams
  });

  const metrics = useMemo(
    () => preparePrinterMetrics(data?.items ?? []),
    [data?.items]
  );

  if (!metrics.length) {
    return <Empty description='Метрики відсутні' />;
  }

  if (isLoading || isFetching) {
    return <Skeleton active />;
  }

  if (isError) {
    return <Empty description='Не вдалося завантажити метрики' />;
  }

  if (!data?.items.length) {
    return <Empty description='Метрики відсутні' />;
  }

  const latestMetric = metrics[metrics.length - 1];

  return (
    <Flex
      vertical
      gap={24}
      style={{
        padding: 24,
        flex: 1
      }}
    >
      <Title level={2}>Метрики принтера</Title>

      <MetricsSummary metric={latestMetric} />

      <SuppliesHistoryChart metrics={metrics} />

      <ImpressionsHistoryChart metrics={metrics} />
    </Flex>
  );
};

export default PrinterMetrics;
