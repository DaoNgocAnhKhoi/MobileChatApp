// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        // The query accepts a number and returns a Post
        getPost: build.query({
            // note: an optional `queryFn` may be used in place of `query`
            query: (id) => ({ url: `post/${id}` }),
            // Pick out data and prevent nested properties in a hook or selector
            transformResponse: (response, meta, arg) => response.data,
            // Pick out errors and prevent nested properties in a hook or selector
            transformErrorResponse: (response, meta, arg) => response.status,
            providesTags: (result, error, id) => [{ type: 'Post', id }],
            // providesTags: (result) =>
            //     result ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post'] : ['Post'],
            // The 2nd parameter is the destructured `QueryLifecycleApi`
            async onQueryStarted(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    queryFulfilled,
                    getCacheEntry,
                    updateCachedData,
                }
            ) {
                // Dispatch an action to set loading state
                // dispatch(setLoading(true));

                // try {
                //     await queryFulfilled; // Wait for the query to fulfill
                // } catch {
                //     // Handle errors if needed
                //     dispatch(setError(true));
                // } finally {
                //     // Dispatch action to reset loading state
                //     dispatch(setLoading(false));
                // }
            },
            // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    cacheEntryRemoved,
                    cacheDataLoaded,
                    getCacheEntry,
                    updateCachedData,
                }
            ) {
                // Giả sử bạn muốn kiểm tra xem dữ liệu đã được lưu trong cache chưa trước khi thực hiện truy vấn:

                // Wait for the cache data to load
                const cachedData = await cacheDataLoaded;

                if (cachedData) {
                    // Dispatch an action to do something with cached data
                    dispatch(useCachedData(cachedData));
                }

                // Cleanup when the cache entry is removed
                await cacheEntryRemoved;
                dispatch(cleanupData());
            },
        }),
        addPost: build.mutation({
            query: (newPost) => ({
                url: 'posts',
                method: 'POST',
                body: newPost,
            }),
            // Khi thêm một bài viết mới, làm mới cache của các endpoint liên quan
            invalidatesTags: [{ type: 'Post' }],
            // Khi thêm bài viết thành công, xóa cache của bài viết có ID liên quan
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
        updatePost: build.mutation({
            // note: an optional `queryFn` may be used in place of `query`
            query: ({ id, ...patch }) => ({
                url: `post/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            // Pick out data and prevent nested properties in a hook or selector
            transformResponse: (response, meta, arg) => response.data,
            // Pick out errors and prevent nested properties in a hook or selector
            transformErrorResponse: (response, meta, arg) => response.status,
            invalidatesTags: ['Post'],
            // onQueryStarted is useful for optimistic updates
            // The 2nd parameter is the destructured `MutationLifecycleApi`
            async onQueryStarted(
                arg,
                { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            ) { },
            // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    cacheEntryRemoved,
                    cacheDataLoaded,
                    getCacheEntry,
                }
            ) { },
        }),
    })
});


// Actions to manage loading and error states
const setLoading = (isLoading) => ({ type: 'SET_LOADING', payload: isLoading });
const setError = (hasError) => ({ type: 'SET_ERROR', payload: hasError });