import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import queryClient from './api/query-client'
import Routers from './routes/Routers'

function App() {
  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
