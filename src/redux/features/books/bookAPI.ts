import { TResponseRedux } from "@/types";
import { baseAPI } from "../../api/baseAPI";
import { IBook } from "./bookSlice";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
    }),
    allBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value as string);
          });
        }
        return {
          url: `/product/get-all-products`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IBook[]>) => {
        return {
          data: response.data,
          meta: response.data.meta,
        };
      },
    }),
    allBooksForUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value as string);
          });
        }
        return {
          url: `/product/all-products`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IBook[]>) => {
        return {
          data: response.data,
          meta: response.data.meta,
        };
      },
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET",
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update-product/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddBookMutation,
  useAllBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useAllBooksForUserQuery,
  useGetBookQuery,
} = authAPI;
