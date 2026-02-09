import { Outlet } from 'react-router'
import { AppProvider } from '@app/providers/AppProvider'

// 최상위 컴포넌트
const App = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}

export default App
