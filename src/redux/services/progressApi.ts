import { api } from './api';
import { UserProgress } from '../../types';

export const progressApi = api.injectEndpoints({
    endpoints: (builder) => ({


        getUserProgress: builder.query<UserProgress, void>({
            query: (userId) => ({
                url: `/progress/${userId}`,
                method: "GET",
            }),
        }),
        updateUserProgress: builder.mutation({
            query: ({ userId, progress }) => ({
                url: `progress/update/${userId}`,
                method: 'POST',
                body: progress,
            }),
        }),

    }),
});