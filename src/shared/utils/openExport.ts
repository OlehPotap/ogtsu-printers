export const openExport = (
  path: string,
  params: Record<string, string | number | boolean | undefined>
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  const url = `${process.env.API_BASE_URL}${path}?${searchParams.toString()}`;

  window.open(url, '_blank');
};
