import { Routes, Route } from 'react-router-dom';
import PrintersPage from '../pages/PrintersPage';
import PrinterMetricsPage from '../pages/PrinterMetricsPage';
import OrganizationsPage from '../pages/OrganizationsPage';
import LocationsPage from '../pages/LocationsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/printers' element={<PrintersPage />} />

      <Route path='/printers/:id/metrics' element={<PrinterMetricsPage />} />

      {/* <Route
        path="/analytics"
        element={<AnalyticsPage />}
      /> */}

      <Route path='/admin/organizations' element={<OrganizationsPage />} />
      <Route path='/admin/locations' element={<LocationsPage />} />
    </Routes>
  );
};

export default AppRoutes;
