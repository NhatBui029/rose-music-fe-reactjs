import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      // staleTime: 1000 * 60 * 5, // 5 phút
    },
  },
})

export default queryClient
