import { Card, Empty, Flex, Progress, Skeleton, Space, Typography } from 'antd';

import { useGetPrinterMetricsQuery } from '../../api/printersApi';
import { usePrinterMetrics } from '../../hooks/usePrinterMetrics';

const { Text, Title } = Typography;

type PrinterMetricsProps = {
  printerId: string;
};

const PrinterMetrics = ({ printerId }: PrinterMetricsProps) => {
  const { queryParams } = usePrinterMetrics();

  const { data, isLoading, isFetching, isError } = useGetPrinterMetricsQuery({
    id: printerId,
    params: queryParams
  });

  if (isLoading || isFetching) {
    return <Skeleton active />;
  }

  if (isError) {
    return <Empty description='Не вдалося завантажити метрики' />;
  }

  if (!data?.items.length) {
    return <Empty description='Метрики відсутні' />;
  }

  const latestMetric = data.items[0];

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

      <Space size='large' wrap>
        <Card title='Статус'>{latestMetric.status}</Card>

        <Card title='Всього відбитків'>
          {latestMetric.impressions.total ?? '—'}
        </Card>

        <Card title='Ч/Б відбитків'>
          {latestMetric.impressions.mono ?? '—'}
        </Card>

        <Card title='Кольорових відбитків'>
          {latestMetric.impressions.color ?? '—'}
        </Card>
      </Space>

      <Card title='Витратні матеріали'>
        <Flex vertical gap={16}>
          {latestMetric.supplies.map((supply, index) => (
            <Flex
              key={`${supply.type}-${supply.color}-${index}`}
              align='center'
              gap={16}
            >
              <Text style={{ width: 300 }}>{supply.description}</Text>

              <Progress
                percent={supply.levelPercent ?? 0}
                style={{
                  maxWidth: 500,
                  flex: 1
                }}
              />
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};

export default PrinterMetrics;
