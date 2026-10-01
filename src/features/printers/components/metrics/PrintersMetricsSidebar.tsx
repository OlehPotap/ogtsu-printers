import { Button, DatePicker, Flex, Typography } from 'antd';

import { usePrinterMetrics } from '../../hooks/usePrinterMetrics';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const PrinterMetricsSidebar = () => {
  const { setPeriod, resetFilters } = usePrinterMetrics();

  return (
    <Flex vertical gap={16}>
      <Text strong>Період</Text>

      <RangePicker
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

      <Button onClick={resetFilters}>Скинути фільтри</Button>
    </Flex>
  );
};

export default PrinterMetricsSidebar;
