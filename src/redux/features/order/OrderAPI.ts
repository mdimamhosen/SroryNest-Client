import { baseAPI } from "../../api/baseAPI";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/order/create-order",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/order/verify/${order_id}`,
        method: "GET",
      }),
    }),
    getOrdersByMail: builder.query({
      query: (id) => ({
        url: `/order/get-order/${id}`,
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/update-order/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/all-orders",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useGetOrdersByMailQuery,
  useUpdateOrderMutation,
  useGetAllOrdersQuery,
} = authAPI;
