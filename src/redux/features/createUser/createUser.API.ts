import { baseAPI } from "../../api/baseAPI";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/signup",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: { isBlocked },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllAuthors: builder.query({
      query: () => ({
        url: "/user/all-authors",
        method: "GET",
      }),
    }),
    getProfileData: builder.query({
      query: (id) => ({
        url: `/user/profile-data/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useAllUsersQuery,
  useUpdateUserMutation,
  useGetAllAuthorsQuery,
  useGetProfileDataQuery,
} = authAPI;
