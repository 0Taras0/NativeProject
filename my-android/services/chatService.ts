import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "@/utils/createBaseQuery";
import {IChatItem} from "@/types/сhat/IChatItem";
import {IChatCreate} from "@/types/сhat/IChatCreate";
import {IChatMessage} from "@/types/сhat/IChatMessage";

export const chatService = createApi({
    reducerPath: 'api/chat',
    baseQuery: createBaseQuery('Chats'),
    tagTypes: ['Chats', 'Messages'], // Додали тег Messages
    endpoints: (builder) => ({
        getMyChats: builder.query<IChatItem[], void>({
            query: () => ({ url: '', method: 'GET' }),
            providesTags: ['Chats']
        }),

        createChat: builder.mutation<number, IChatCreate>({
            query: (body) => ({ url: '', method: 'POST', body: body }),
            invalidatesTags: ['Chats']
        }),

        // 👇 Новий метод для отримання повідомлень
        getChatMessages: builder.query<IChatMessage[], number>({
            query: (chatId) => ({
                url: `${chatId}/messages`,
                method: 'GET',
            }),
            // Важливо: ми не хочемо кешувати це назавжди, щоб при вході бачити свіжі дані
            keepUnusedDataFor: 0,
        })
    })
});

export const {
    useGetMyChatsQuery,
    useCreateChatMutation,
    useGetChatMessagesQuery // 👇 Експортуємо хук
} = chatService;