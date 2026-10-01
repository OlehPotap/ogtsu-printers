import React from 'react';
import AppLayout from '../layout/AppLayout/AppLayout';
import AppRoutes from './AppRoutes';
import { PrintersProvider } from '../features/printers/context/PrintersContext';
import { OrganizationsProvider } from '../features/organizations/context/OrganizationsContext';
import { LocationsProvider } from '../features/locations/context/LocationsContext';
import { PrinterMetricsProvider } from '../features/printers/context/PrinterMetricsContext';

//TODO: move context providers

export const App = () => {
  return (
    <LocationsProvider>
      <OrganizationsProvider>
        <PrintersProvider>
          <PrinterMetricsProvider>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </PrinterMetricsProvider>
        </PrintersProvider>
      </OrganizationsProvider>
    </LocationsProvider>
  );
};

export default App;
