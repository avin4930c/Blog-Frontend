import './App.css'
import AuthProvider from './context/AuthContext'
import { Route } from './routes/routes'
function App() {
  return (
    <>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </>
  )
}

export default App
