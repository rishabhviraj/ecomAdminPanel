import { lazy } from "react";
import Loadable from "app/components/Loadable";

const AppForm = Loadable(lazy(() => import("./forms/AppForm")));
const AppMenu = Loadable(lazy(() => import("./menu/AppMenu")));
const AppIcon = Loadable(lazy(() => import("./icons/AppIcon")));
const AppProgress = Loadable(lazy(() => import("./AppProgress")));
const AppRadio = Loadable(lazy(() => import("./radio/AppRadio")));
const AppTable = Loadable(lazy(() => import("./tables/AppTable")));
const AppSwitch = Loadable(lazy(() => import("./switch/AppSwitch")));
const AppSlider = Loadable(lazy(() => import("./slider/AppSlider")));
const AppDialog = Loadable(lazy(() => import("./dialog/AppDialog")));
const AppButton = Loadable(lazy(() => import("./buttons/AppButton")));
const AppCheckbox = Loadable(lazy(() => import("./checkbox/AppCheckbox")));
const AppSnackbar = Loadable(lazy(() => import("./snackbar/AppSnackbar")));
const AppAutoComplete = Loadable(lazy(() => import("./auto-complete/AppAutoComplete")));
const AppExpansionPanel = Loadable(lazy(() => import("./expansion-panel/AppExpansionPanel")));

const Products = Loadable(lazy(() => import("./ProductManagement/products")));
const Customers = Loadable(lazy(() => import("./CustomerManagement/customers")));
const Orders = Loadable(lazy(() => import("./OrderManagement/orders")));
const Brands = Loadable(lazy(() => import("./ProductManagement/brands")));
const AppInventory = Loadable(lazy(() => import("./ProductManagement/inventory")));
const AppAttributes = Loadable(lazy(() => import("./ProductManagement/attributes")));
const AppTags = Loadable(lazy(() => import("./ProductManagement/tags")));
const AppCategories = Loadable(lazy(() => import("./ProductManagement/categories")));

const materialRoutes = [
  { path: "/material/table", element: <AppTable /> },
  { path: "/material/form", element: <AppForm /> },
  { path: "/material/buttons", element: <AppButton /> },
  { path: "/material/icons", element: <AppIcon /> },
  { path: "/material/progress", element: <AppProgress /> },
  { path: "/material/menu", element: <AppMenu /> },
  { path: "/material/checkbox", element: <AppCheckbox /> },
  { path: "/material/switch", element: <AppSwitch /> },
  { path: "/material/radio", element: <AppRadio /> },
  { path: "/material/slider", element: <AppSlider /> },
  { path: "/material/autocomplete", element: <AppAutoComplete /> },
  { path: "/material/expansion-panel", element: <AppExpansionPanel /> },
  { path: "/material/dialog", element: <AppDialog /> },
  { path: "/material/snackbar", element: <AppSnackbar /> },


  { path: "/pages/products", element: <Products /> },
  { path: "/pages/customers", element: <Customers /> },
  { path: "/pages/orders", element: <Orders /> },
  { path: "/pages/brands", element: <Brands /> },
  { path: "/pages/inventory", element: <AppInventory /> },
  { path: "/pages/attributes", element: <AppAttributes /> },
  { path: "/pages/tags", element: <AppTags /> },
  { path: "/pages/categories", element: <AppCategories /> },


];

export default materialRoutes;


