export const routes = {
  printers: '/printers',
  analytics: '/analytics',

  adminOrganizations: '/admin/organizations',
  adminLocations: '/admin/locations',
  adminUsers: '/admin/users',

  printerMetricsPath: '/printers/:printerId/metrics',

  printerMetrics: (printerId: string) => `/printers/${printerId}/metrics`
} as const;
