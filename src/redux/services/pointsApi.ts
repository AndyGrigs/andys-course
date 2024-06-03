import { IUser } from "../../app/types";
import { api } from "./api";

export const pointsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserPoints: builder.mutation<
      IUser,
      { userId: string; points: number }
    >({
      query: ({ userId, points }) => ({
        url: `points/update/${userId}`,
        method: "PUT",
        body: { points },
      }),
    }),
  }),
});

export const { useUpdateUserPointsMutation } = pointsApi;

export const { endpoints: {
  updateUserPoints
} } = pointsApi;
