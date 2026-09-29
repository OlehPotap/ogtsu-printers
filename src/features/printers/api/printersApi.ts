import { apiSlice } from '../../../app/api/apiSlice';

import type {
  Printer,
  GetPrintersResponse,
  GetPrintersQueryParams,
  CreatePrinterRequestBody,
  UpdatePrinterRequestBody,
  GetPrinterMetricsQueryParams,
  GetPrinterMetricsResponse,
  DiscoverPrinterResponse
} from '../types/api';

export const printersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrinters: builder.query<GetPrintersResponse, GetPrintersQueryParams>({
      query: (params: GetPrintersQueryParams) => ({
        url: '/printers',
        params
      }),

      providesTags: ['Printers']
    }),

    getPrinterById: builder.query<Printer, string>({
      query: (id) => ({
        url: `/printer/${id}`
      }),

      providesTags: (_result, _error, id) => [{ type: 'Printers', id }]
    }),

    createPrinter: builder.mutation<Printer, CreatePrinterRequestBody>({
      query: (printer) => ({
        url: '/printers',
        method: 'POST',
        body: printer
      }),

      invalidatesTags: ['Printers']
    }),

    updatePrinter: builder.mutation<
      Printer,
      {
        id: string;
        data: UpdatePrinterRequestBody;
      }
    >({
      query: ({ id, data }) => ({
        url: `/printers/${id}`,
        method: 'PUT',
        body: data
      }),

      invalidatesTags: (_result, _error, { id }) => [
        'Printers',
        { type: 'Printers', id }
      ]
    }),

    deletePrinter: builder.mutation<void, string>({
      query: (id) => ({
        url: `/printers/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: ['Printers']
    }),

    getPrinterMetrics: builder.query<
      GetPrinterMetricsResponse,
      {
        id: string;
        params: GetPrinterMetricsQueryParams;
      }
    >({
      query: ({ id, params }) => ({
        url: `/printers/${id}/metrics`,
        params
      }),

      providesTags: (_result, _error, { id }) => [
        {
          type: 'Printers',
          id
        }
      ]
    }),
    discoverPrinter: builder.query<DiscoverPrinterResponse, string>({
      query: (ip) => ({
        url: `/printers/${encodeURIComponent(ip)}/discover`
      })
    })
  })
});

export const {
  useGetPrintersQuery,
  useGetPrinterByIdQuery,
  useGetPrinterMetricsQuery,
  useCreatePrinterMutation,
  useUpdatePrinterMutation,
  useDeletePrinterMutation,
  useLazyDiscoverPrinterQuery
} = printersApi;
