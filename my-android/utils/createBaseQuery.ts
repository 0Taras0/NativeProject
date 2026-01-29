import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {BASE_URL} from "@/constants/Urls";
import {getToken} from "@/utils/storage";

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/${endpoint}/`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });