import { apiSlice } from '../../../app/api/apiSlice';

import type {
  Location,
  GetLocationsResponse,
  GetLocationsQueryParams,
  CreateLocationRequestBody,
  UpdateLocationRequestBody
} from '../types/api';

export const locationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<GetLocationsResponse, GetLocationsQueryParams>({
      query: (params: GetLocationsQueryParams) => ({
        url: '/locations',
        params
      }),

      providesTags: ['Locations']
    }),

    getLocationById: builder.query<Location, string>({
      query: (id) => ({
        url: `/location/${id}`
      }),

      providesTags: (_result, _error, id) => [{ type: 'Locations', id }]
    }),

    createLocation: builder.mutation<Location, CreateLocationRequestBody>({
      query: (location) => ({
        url: '/locations',
        method: 'POST',
        body: location
      }),

      invalidatesTags: ['Locations']
    }),

    updateLocation: builder.mutation<
      Location,
      {
        id: string;
        data: UpdateLocationRequestBody;
      }
    >({
      query: ({ id, data }) => ({
        url: `/locations/${id}`,
        method: 'PUT',
        body: data
      }),

      invalidatesTags: (_result, _error, { id }) => [
        'Locations',
        { type: 'Locations', id }
      ]
    }),

    deleteLocation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: ['Locations']
    })
  })
});

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation
} = locationsApi;
