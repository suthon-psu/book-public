import './App.css';
import AppRoutes from './config/routes';
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from './config';
import AppProvider from './AppProvider';

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>      
    </AuthProvider>
  )
}

export default App;