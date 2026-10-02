import { Line } from '@ant-design/charts';
import { Card, Empty, Select } from 'antd';
import { useMemo, useState } from 'react';

import type { PrinterSupply } from '../../types/api';

import type { PreparedPrinterMetric } from '../../utils/preparePrinterMetrics';

type SuppliesHistoryChartProps = {
  metrics: PreparedPrinterMetric[];
};

type SupplyChartItem = {
  date: string;
  level: number;
};

const getSupplyKey = (supply: PrinterSupply) =>
  `${supply.type}-${supply.color}-${supply.description}`;

const SuppliesHistoryChart = ({ metrics }: SuppliesHistoryChartProps) => {
  const supplies = useMemo(() => {
    const uniqueSupplies = new Map<string, string>();

    metrics.forEach((metric) => {
      metric.supplies.forEach((supply) => {
        const key = getSupplyKey(supply);

        if (!uniqueSupplies.has(key)) {
          uniqueSupplies.set(key, supply.description);
        }
      });
    });

    return Array.from(uniqueSupplies, ([value, label]) => ({
      value,
      label
    }));
  }, [metrics]);

  const [selectedSupply, setSelectedSupply] = useState<string>();

  const activeSupply = selectedSupply ?? supplies[0]?.value;

  const chartData = useMemo<SupplyChartItem[]>(() => {
    if (!activeSupply) {
      return [];
    }

    return metrics.flatMap((metric) =>
      metric.supplies.flatMap((supply) => {
        if (
          getSupplyKey(supply) !== activeSupply ||
          supply.levelPercent === null
        ) {
          return [];
        }

        return [
          {
            date: metric.date,
            level: supply.levelPercent
          }
        ];
      })
    );
  }, [metrics, activeSupply]);

  return (
    <Card
      title='Витратні матеріали'
      extra={
        <Select<string>
          value={activeSupply}
          options={supplies}
          style={{ width: 250 }}
          placeholder='Оберіть витратний матеріал'
          onChange={setSelectedSupply}
        />
      }
    >
      {!chartData.length ? (
        <Empty description='Дані відсутні' />
      ) : (
        <Line
          data={chartData}
          xField='date'
          yField='level'
          height={300}
          scale={{
            y: {
              domain: [0, 100]
            }
          }}
          axis={{
            y: {
              title: 'Рівень, %'
            }
          }}
        />
      )}
    </Card>
  );
};

export default SuppliesHistoryChart;
