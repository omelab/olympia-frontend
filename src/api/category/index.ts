import { apiSlice } from '@/api/api-slice';
import type { Category } from '@/api/lib/definitions';

export type CategoryDashboardListProps = {
  data: Category[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

type CreateCategoryArgs = {
  title: string;
  featuredImage: string;
  content: string;
  status: string;
  searchKeyword: string;
  parentId: number;
  positionOrder: number;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
};

type TransformedCategoryResposne = Omit<
  Category,
  'searchKeyword' | 'metaKeyword'
> & {
  searchKeyword: string[];
  metaKeyword: string[];
};

type CategoryStatus = {
  status:
    | 'ACTIVE'
    | 'INACTIVE'
    | 'DRAFT'
    | 'PUBLISHED'
    | 'PENDING'
    | 'REJECTED'
    | 'COMPLETED'
    | 'ARCHIVED';
};

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<CategoryDashboardListProps, string>({
      query: (queryString) => `/categories${queryString}`,
      providesTags: ['Category'],
    }),

    getAllCategoryCount: build.query<
      CategoryDashboardListProps,
      CategoryStatus
    >({
      query: ({ status }) => `/categories?status=${status}`,
      providesTags: ['Category'],
    }),

    createCategory: build.mutation<void, CreateCategoryArgs>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    singleCategory: build.query<TransformedCategoryResposne, { id: number }>({
      query: ({ id }) => `/categories/${id}`,
      transformResponse: (response: Category) => {
        const metaKeyArray = response?.metaKeyword
          ? response?.metaKeyword.split(',')
          : [];

        const keywordArr = response?.searchKeyword
          ? response?.searchKeyword.split(',')
          : [];

        const newsCount = 0;

        const data = {
          ...response,
          searchKeyword: keywordArr,
          metaKeyword: metaKeyArray,
          count: newsCount,
        };

        return data;
      },
    }),
    updatecategory: build.mutation({
      query: ({ data, id }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/categories/${id}/force` : `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
    restoreCategory: build.mutation({
      query: ({ id }) => {
        return {
          url: `/categories/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Category'],
    }),
    getCategoryDropdowns: build.query({
      query: (queryString) => `/public/categories/dropdown${queryString}`,

      providesTags: ['Category'],
    }),
    getCategoryNasted: build.query({
      query: (queryString) => `/public/categories/nested${queryString}`,

      providesTags: ['Category'],
    }),
    categoryBulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: '/categories/bulk-destroy',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Category'],
    }),
    moveNews: build.mutation({
      query: (data) => ({
        url: '/news/change-category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category', 'Products'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useSingleCategoryQuery,
  useUpdatecategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryDropdownsQuery,
  useCategoryBulkDeleteMutation,
  useMoveNewsMutation,
  useRestoreCategoryMutation,
  useGetCategoryNastedQuery,
  useGetAllCategoryCountQuery,
} = categoryApi;
