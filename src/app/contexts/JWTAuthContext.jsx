import { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "app/components/MatxLoading";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const isValidToken = (accessToken) => {
  if (!accessToken) return false;

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp > currentTime;
  } catch (err) {
    return false;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT"
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const body = JSON.stringify({ email, password });

    const { data } = await axios.post("/api/auth/login", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "LOGIN", payload: { user } });
  };

  const register = async (email, username, password) => {
    const { data } = await axios.post("/api/auth/register", {
      Email: email,
      Username: username,
      Password: password
    });

    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  // Initialize authentication on page load
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get("/api/auth/profile");
          const { user } = response.data;
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user }
          });
        } else {
          setSession(null);
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null }
          });
        }
      } catch (err) {
        console.error("Auth init failed:", err);
        setSession(null);
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null }
        });
      }
    };

    initialize();
  }, []);

  // Optional: Auto-logout when token expires
  useEffect(() => {
    if (state.isAuthenticated) {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // convert to ms
      const timeout = expirationTime - Date.now();

      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [state.isAuthenticated]);

  if (!state.isInitialized) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ ...state, method: "JWT", login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
