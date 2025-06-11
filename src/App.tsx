import MainLayout from "./components/layOut/MainLayout"
import ProtectedRoute from "./components/layOut/ProtectedRoute"


function App() {
 

  return <ProtectedRoute><MainLayout/></ProtectedRoute>
}

export default App
