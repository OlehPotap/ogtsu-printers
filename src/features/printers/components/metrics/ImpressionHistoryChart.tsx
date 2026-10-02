import { Column } from '@ant-design/charts';
import { Card, Empty } from 'antd';
import { useMemo } from 'react';

import type { PreparedPrinterMetric } from '../../utils/preparePrinterMetrics';

type ImpressionsHistoryChartProps = {
  metrics: PreparedPrinterMetric[];
};

type ImpressionsChartItem = {
  date: string;
  type: 'Ч/Б' | 'Кольорові';
  impressions: number;
};

const ImpressionsHistoryChart = ({ metrics }: ImpressionsHistoryChartProps) => {
  const chartData = useMemo<ImpressionsChartItem[]>(() => {
    return metrics.flatMap((metric, index) => {
      if (index === 0) {
        return [];
      }

      const previousMetric = metrics[index - 1];

      const result: ImpressionsChartItem[] = [];

      const currentMono = metric.impressions.mono;
      const previousMono = previousMetric.impressions.mono;

      if (currentMono !== null && previousMono !== null) {
        const impressions = currentMono - previousMono;

        if (impressions >= 0) {
          result.push({
            date: metric.date,
            type: 'Ч/Б',
            impressions
          });
        }
      }

      const currentColor = metric.impressions.color;
      const previousColor = previousMetric.impressions.color;

      if (currentColor !== null && previousColor !== null) {
        const impressions = currentColor - previousColor;

        if (impressions >= 0) {
          result.push({
            date: metric.date,
            type: 'Кольорові',
            impressions
          });
        }
      }

      return result;
    });
  }, [metrics]);

  return (
    <Card title='Використання принтера'>
      {!chartData.length ? (
        <Empty description='Дані відсутні' />
      ) : (
        <Column
          data={chartData}
          xField='date'
          yField='impressions'
          colorField='type'
          stack
          height={300}
          axis={{
            y: {
              title: 'Кількість відбитків'
            }
          }}
        />
      )}
    </Card>
  );
};

export default ImpressionsHistoryChart;
