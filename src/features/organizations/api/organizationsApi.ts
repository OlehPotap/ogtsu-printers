import { apiSlice } from '../../../app/api/apiSlice';

import type {
  Organization,
  GetOrganizationsResponse,
  GetOrganizationsQueryParams,
  CreateOrganizationRequestBody,
  UpdateOrganizationRequestBody
} from '../types/api';

export const organizationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<
      GetOrganizationsResponse,
      GetOrganizationsQueryParams
    >({
      query: (params) => ({
        url: '/organizations',
        params
      }),

      providesTags: ['Organizations']
    }),

    getOrganizationById: builder.query<Organization, string>({
      query: (id) => ({
        url: `/organizations/${id}`
      }),

      providesTags: (_result, _error, id) => [{ type: 'Organizations', id }]
    }),

    createOrganization: builder.mutation<
      Organization,
      CreateOrganizationRequestBody
    >({
      query: (organization) => ({
        url: '/organizations',
        method: 'POST',
        body: organization
      }),

      invalidatesTags: ['Organizations']
    }),

    updateOrganization: builder.mutation<
      Organization,
      {
        id: string;
        data: UpdateOrganizationRequestBody;
      }
    >({
      query: ({ id, data }) => ({
        url: `/organizations/${id}`,
        method: 'PUT',
        body: data
      }),

      invalidatesTags: (_result, _error, { id }) => [
        'Organizations',
        { type: 'Organizations', id }
      ]
    }),

    deleteOrganization: builder.mutation<void, string>({
      query: (id) => ({
        url: `/organizations/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: ['Organizations']
    })
  })
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation
} = organizationApi;
