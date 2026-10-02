import dayjs from 'dayjs';
import { Button, DatePicker, Flex, Typography, Segmented } from 'antd';
import type { MetricsInterval } from '../../context/PrinterMetricsContext';

import { usePrinterMetrics } from '../../hooks/usePrinterMetrics';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const PrinterMetricsSidebar = () => {
  const { queryParams, setPeriod, resetFilters, interval, setInterval } =
    usePrinterMetrics();

  return (
    <Flex vertical gap={16}>
      <Text strong>Період</Text>

      <RangePicker
        value={
          queryParams.from && queryParams.to
            ? [dayjs(queryParams.from), dayjs(queryParams.to)]
            : null
        }
        onChange={(dates) => {
          if (!dates) {
            setPeriod();
            return;
          }

          setPeriod(
            dates[0]?.startOf('day').toISOString(),
            dates[1]?.endOf('day').toISOString()
          );
        }}
      />

      <Segmented<MetricsInterval>
        value={interval}
        options={[
          {
            label: 'Сирі',
            value: 'raw'
          },
          {
            label: 'Година',
            value: 'hour'
          },
          {
            label: 'День',
            value: 'day'
          },
          {
            label: 'Тиждень',
            value: 'week'
          },
          {
            label: 'Місяць',
            value: 'month'
          }
        ]}
        onChange={setInterval}
      />

      <Button onClick={resetFilters}>Скинути</Button>
    </Flex>
  );
};

export default PrinterMetricsSidebar;
