import { useLocation } from 'react-router-dom';

import { routes } from '../../app/routes/routes';
import PrintersSidebar from '../../features/printers/components/PrintersSidebar';
import OrganizationsSidebar from '../../features/organizations/components/OrganizationsSidebar';
import LocationsSidebar from '../../features/locations/components/LocationsSidebar';
import { usePrinters } from '../../features/printers/hooks/usePrinters';
import { useOrganizations } from '../../features/organizations/hooks/useOrganizations';
import { useLocations } from '../../features/locations/hooks/useLocations';

const Sidebar = () => {
  const {
    setName: setOrganizationName,
    resetFilters: resetOrganizationsFilters
  } = useOrganizations();

  const {
    queryParams: LocationFilters,
    setFilters: setLocationsFilters,
    resetFilters: resetLocationsFilters
  } = useLocations();

  const { pathname } = useLocation();
  const { setFilters: setPrintersFilters, resetFilters: resetPrintersFilters } =
    usePrinters();

  if (pathname.startsWith(routes.printers)) {
    return (
      <PrintersSidebar
        setFilters={setPrintersFilters}
        resetFilters={resetPrintersFilters}
      />
    );
  }

  if (pathname.startsWith(routes.analytics)) {
    return null;
  }
  if (pathname.startsWith('/admin/organizations')) {
    return (
      <OrganizationsSidebar
        setName={setOrganizationName}
        resetFilters={resetOrganizationsFilters}
      />
    );
  }

  if (pathname.startsWith('/admin/locations')) {
    return (
      <LocationsSidebar
        filters={LocationFilters}
        setFilters={setLocationsFilters}
        resetFilters={resetLocationsFilters}
      />
    );
  }

  // if (pathname.startsWith('/admin/users')) {
  //   return <AdminUsersSidebar />;
  // }

  return null;
};

export default Sidebar;
