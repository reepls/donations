
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Monthly from './pages/Monthly.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/monthly",
    element: <Monthly />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
