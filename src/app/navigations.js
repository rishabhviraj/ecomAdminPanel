const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },

  {
    name: "Products",
    icon: "Products",
    children: [
      { name: "All Products", path: "/pages/products", iconText: "A" },
      { name: "Categories", path: "/material/Categories", iconText: "C" },
      { name: "Brands", path: "/pages/Brands", iconText: "D" },
      { name: "Attributes", path: "/material/Attributes", iconText: "E" },
      { name: "Tags", path: "/material/Tags", iconText: "F" },
      { name: "Inventory / Stock Management", path: "/material/Inventory", iconText: "G" },
      { name: "Product Reviews", path: "/material/ProductReviews", iconText: "H" },
      { name: "Product Questions", path: "/material/ProductQuestions", iconText: "I" },
      { name: "Product Import / Export", path: "/material/ProductImportExport", iconText: "J" }
    ]
  },
  {
    name: "Orders",
    icon: "Orders",
    children: [
      { name: "All Orders", path: "/pages/orders", iconText: "A" },
      { name: "Order Details", path: "/material/OrderDetails", iconText: "B" },
      { name: "Invoices", path: "/material/Invoices", iconText: "C" },
      { name: "Refunds", path: "/material/Refunds", iconText: "G" }

    ]
  },
  {
    name: "Customers",
    icon: "Customers",
    children: [
      { name: "Customer Details", path: "/pages/customers", iconText: "A" },

    ]
  },
   {
    name: "Marketing",
    icon: "Marketing",
    children: [
      { name: "Discounts & Coupons", path: "/material/DiscountsCoupons", iconText: "A" },
      { name: "Promotions / Banners", path: "/material/PromotionsBanners", iconText: "C" },
      { name: "Reviews & Ratings Management", path: "/material/ReviewsRatingsManagement", iconText: "D" },

    ]
  },
   {
    name: "Content Management",
    icon: "Content Management",
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Pages (e.g. About Us, FAQ)", path: "/material/Pages", iconText: "B" },
      { name: "Blog / Articles", path: "/material/BlogArticles", iconText: "C" },
      { name: "Banners / Sliders", path: "/material/BannersSliders", iconText: "D" },
      { name: "Menus / Navigation", path: "/material/MenusNavigation", iconText: "E" },
      { name: "Popups / Announcements", path: "/material/PopupsAnnouncements", iconText: "F" },

    ]
  },
   {
    name: "Reports & Analytics",
    icon: "Reports & Analytics",
    children: [
      { name: "Sales Reports", path: "/material/SalesReports", iconText: "B" },
      { name: "Product Performance", path: "/material/ProductPerformance", iconText: "C" },
      { name: "Customer Reports", path: "/material/CustomerReports", iconText: "D" },
      { name: "Refunds & Returns", path: "/material/RefundsReturns", iconText: "F" },

    ]
  },
   {
    name: "Payments",
    icon: "Payments",
    children: [
      { name: "Payment Methods", path: "/material/PaymentMethods", iconText: "A" },
      { name: "Payment Gateway", path: "/material/PaymentGateway", iconText: "B" },
      { name: "Transactions", path: "/material/Transactions", iconText: "C" },
      { name: "Refunds & Cancellations", path: "/material/RefundsCancellations", iconText: "D" },
    ]
  },
  {
    name: "Shipping",
    icon: "Shipping",
    children: [
      { name: "Shipping Methods", path: "/material/ShippingMethods", iconText: "B" },
      { name: "Shipping Zones", path: "/material/ShippingZones", iconText: "C" },
      { name: "Shipping Rates", path: "/material/ShippingRates", iconText: "D" },
      { name: "Carriers / Tracking", path: "/material/CarriersTracking", iconText: "E" },




    ]
  },
  {
    name: "Taxes",
    icon: "Taxes",
    children: [
      { name: "Tax Settings", path: "/material/TaxSettings", iconText: "A" },
      { name: "Tax Rates", path: "/material/TaxRates", iconText: "B" },
      { name: "VAT / GST Management", path: "/material/VATGSTManagement", iconText: "C" }, 

    ]
  },
  {
    name: "Settings",
    icon: "Settings",
    children: [
      { name: "General Settings", path: "/material/GeneralSettings", iconText: "A" },
      { name: "Store Information", path: "/material/StoreInformation", iconText: "B" },
      { name: "Payment Settings", path: "/material/PaymentSettings", iconText: "C" },
      { name: "Shipping Settings", path: "/material/ShippingSettings", iconText: "D" },
      { name: "Tax Settings", path: "/material/TaxSettings", iconText: "E" },
      { name: "Email Settings", path: "/material/EmailSettings", iconText: "F" },

    ]
  },
  {
    name: "Users & Roles",
    icon: "Users & Roles",
    children: [
      { name: "User Management", path: "/material/UserManagement", iconText: "A" },
      { name: "Role Management", path: "/material/RoleManagement", iconText: "B" },
      { name: "Permissions", path: "/material/Permissions", iconText: "C" },
      { name: "Activity Logs", path: "/material/ActivityLogs", iconText: "D" },

    ]
  },
  {
    name: "Help & Support",
    icon: "Help & Support",
    children: [
      { name: "Support Tickets", path: "/material/SupportTickets", iconText: "B" },
      { name: "Contact Us", path: "/material/ContactUs", iconText: "D" },
      { name: "Live Chat", path: "/material/LiveChat", iconText: "E" },
    ]
  },
  // { label: "Components", type: "label" },
  {
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Buttons", path: "/material/buttons", iconText: "B" },
      { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
      { name: "Dialog", path: "/material/dialog", iconText: "D" },
      { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" }
      
    ]
  },
  {
    name: "Session/Auth",
    icon: "security",
    children: [
      { name: "Sign in", iconText: "SI", path: "/session/signin" },
      { name: "Sign up", iconText: "SU", path: "/session/signup" },
      { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
      { name: "Error", iconText: "404", path: "/session/404" }
    ]
  },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
  //   children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  // },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];

export default navigations;
