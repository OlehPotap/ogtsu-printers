import { Card, Flex, Typography } from 'antd';

import type { PrinterMetric } from '../../types/api';

const { Text } = Typography;

type MetricsSummaryProps = {
  metric: PrinterMetric;
};

const MetricsSummary = ({ metric }: MetricsSummaryProps) => {
  return (
    <Flex vertical gap={16}>
      <Flex gap={16} wrap>
        <Card title='Статус'>
          {metric.status}
        </Card>

        <Card title='Всього відбитків'>
          {metric.impressions.total ?? '—'}
        </Card>

        <Card title='Ч/Б відбитків'>
          {metric.impressions.mono ?? '—'}
        </Card>

        <Card title='Кольорових відбитків'>
          {metric.impressions.color ?? '—'}
        </Card>
      </Flex>

      <Text type='secondary'>
        Останнє опитування:{' '}
        {new Date(metric.timestamp).toLocaleString('uk-UA')}
      </Text>
    </Flex>
  );
};

export default MetricsSummary;