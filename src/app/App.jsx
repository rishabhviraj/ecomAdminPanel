import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
// ROOT THEME PROVIDER
import { MatxTheme } from "./components";
// ALL CONTEXTS
import SettingsProvider from "./contexts/SettingsContext";
import { AuthProvider } from "./contexts/JWTAuthContext";
import { ProductProvider } from "./contexts/ProductContext";
// API BASE URL
import axios from "axios";
axios.defaults.baseURL = "https://localhost:44356"; // Your backend URL
// ROUTES
import routes from "./routes";

export default function App() {
  const content = useRoutes(routes);
  return (
    <ProductProvider>
      <SettingsProvider>
        <AuthProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </AuthProvider>
      </SettingsProvider>
    </ProductProvider>
  );
}
