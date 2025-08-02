import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

// Initial state
const initialState = {
    brands: [],
    error: null
};

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_BRAND":
            return {
                ...state,
                brands: [...state.brands, action.payload],
                error: null
            };
        case "GET_BRAND_LIST":
            return {
                ...state,
                brands: [...state.brands, action.payload],
                error: null
            };
        case "UPDATE_BRAND":
            return {
                ...state,
                brands: [...state.brands, action.payload],
                error: null
            };
        case "DELETE_BRAND":
            return {
                ...state,
                brands: [...state.brands, action.payload],
                error: null
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

// Context
const ProductContext = createContext({
    brands: [],
    addBrand: () => { },
    getBrandList: () => { },
    updateBrand: () => { },
    deleteBrand: () => { },
    error: null
});

// Provider
export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addBrand = async (brandName, status) => {
        try {
            const res = await axios.post("/api/Product/AddBrand", {
                brandName,
                status
            });
            dispatch({ type: "ADD_BRAND", payload: res.data });

            return { success: true }; // ✅ Indicate success
        } catch (e) {
            console.error(e);
            dispatch({ type: "SET_ERROR", payload: e.message || "Failed to add brand" });

            return { success: false, error: e.message || "Failed to add brand" }; // ❌ Return error
        }
    };

    const getBrandList = async () => {
        try {
            const res = await axios.post("/api/Product/GetBrandList");
            if (res.data && res.data.success && Array.isArray(res.data.data)) {
                dispatch({
                    type: "GET_BRAND_LIST",
                    payload: res.data.data // sending only the data array
                });
                return { success: true, data: res.data.data }; // ✅ Indicate success
            } else {
                dispatch({
                    type: "SET_ERROR",
                    payload: res.data.message || "No brand data found."
                });
                return { success: true, data: [] }; // ✅ Indicate success
            }

        } catch (e) {
            console.error("API Error - GetBrandList:", e);
            dispatch({
                type: "SET_ERROR",
                payload: e.message || "Failed to fetch brands"
            });
        }
    };

    const updateBrand = async (id, brandName, status) => {
        try {
            debugger;
            const res = await axios.post("/api/Product/UpdateBrand", {
                id,
                brandName,
                status
            });
            dispatch({ type: "UPDATE_BRAND", payload: res.data });
            return { success: true, }; // ✅ Indicate success
        } catch (e) {
            console.error(e);
            dispatch({ type: "SET_ERROR", payload: e.message || "Failed to update brand" });
            return { success: false, error: e.message || "Failed to update brand" }; // ❌ Return error
        }
    }

    const deleteBrand = async (id, brandName, status) => {
        try {
            debugger;

            const res = await axios.post("/api/Product/DeleteBrand", {
                id,
                brandName,
                status
            });
            dispatch({ type: "DELETE_BRAND", payload: res.data });
            return { success: true }; // ✅ Indicate success
        } catch (e) {
            console.error(e);
            dispatch({ type: "SET_ERROR", payload: e.message || "Failed to delete brand" });
            return { success: false, error: e.message || "Failed to delete brand" }; // ❌ Return error
        }
    };



    return (
        <ProductContext.Provider value={{ ...state, addBrand, getBrandList, brands: state.brands, updateBrand, deleteBrand }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
