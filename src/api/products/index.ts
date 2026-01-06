import { apiSlice } from '../api-slice';
import type { Product } from '../lib/definitions';

export type Root = {
  data: Product[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: (queryString) => `/products/all${queryString}`,
      providesTags: ['Products'],
    }),

    getSingleProduct: build.query({
      query: ({ id }) => `/products/${id}`,
      transformResponse: (response: any) => {
        const tags = response?.tags
          ? response?.tags.map((item: { title: string }) => item.title)
          : [];

        const metaKeyword = response?.metaKeyword
          ? response.metaKeyword.includes(',')
            ? response.metaKeyword.split(',')
            : [response.metaKeyword]
          : [];

        const galleriesWithOutId = response.galleries?.map(
          ({
            caption,
            imageUrl,
            videoUrl,
            projectId,
            photoCredit,
          }: {
            caption: string;
            imageUrl: string;
            videoUrl: string;
            projectId: number;
            photoCredit: string;
          }) => ({
            caption,
            imageUrl,
            videoUrl,
            projectId,
            photoCredit,
          }),
        );

        // const convertSpecificationObjToArray = Object.entries(
        //   response.specification,
        // ).map(([key, value]) => ({
        //   key,
        //   value,
        // }));

        const data = {
          title: response.title,
          subTitle: response.subTitle,
          slug: response.slug,
          brochure: response.brochure,
          description: response.description,
          shortDescription: response.shortDescription,
          featuredImage: response.featuredImage,
          imageCaption: response.imageCaption,
          homepageFeatured: response.homepageFeatured,
          metaTitle: response.metaTitle,
          metaKeyword,
          metaDescription: response.metaDescription,
          status: response.status,
          galleries: galleriesWithOutId,
          categoryId: response.categoryId,
          tags,
        };
        return data;
      },
    }),

    addProduct: build.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
    }),

    updateProduct: build.mutation({
      query: ({ payload, id }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Products'],
    }),

    softDeleteProduct: build.mutation({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    restoreProduct: build.mutation({
      query: ({ id }) => {
        return {
          url: `/products/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Products'],
    }),

    hardDeleteProduct: build.mutation({
      query: ({ id }) => ({
        url: `/products/${id}/force`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    bulkStatusChange: build.mutation({
      query: ({ payload }) => ({
        url: '/products/bulk-status-change',
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useSoftDeleteProductMutation,
  useRestoreProductMutation,
  useHardDeleteProductMutation,
  useBulkStatusChangeMutation,
} = productApi;
