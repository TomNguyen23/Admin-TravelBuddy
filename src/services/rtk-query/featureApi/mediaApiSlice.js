import { apiSlice } from "../apiSlice";

export const mediaApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postMedia: builder.mutation({
            query: (formData) => ({
                url: '/api/upload',
                method: 'POST',
                body: formData
            }),
        }),


    }),
});

export const { usePostMediaMutation } = mediaApiSlice;