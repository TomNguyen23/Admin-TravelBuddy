import { apiSlice } from "../apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        unbanReportSite: builder.mutation({
            query: (siteID) => ({
                url: `/api/admin/report/site/${siteID}/unban`,
                method: 'PUT',
               //  body: formData
            }),
        }),


    }),
});

export const { useUnbanReportSiteMutation } = reportApiSlice;