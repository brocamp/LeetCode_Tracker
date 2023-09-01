
// import React from "react";
// import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router-dom";
// import Contact from "./components/Contact";
// import Featuredproducts from "./components/Featuredproducts";
// import ErrorComponent from "./components/ErrorComponent";
// import { Navbar } from "./components/Navbar";
// import ProductDetails from "./components/ProductDetails";
// import Login from "./components/Login"; // Assuming you have a Login component
// import { AuthContextProvider } from "./AuthContext"; // Assuming you have an authentication context provider

// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navbar />,
//     errorElement: <ErrorComponent />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/featured-products", element: <Featuredproducts /> },
//       { path: "/product-details/:productId", element: <ProductDetails /> },
//       { path: "/login", element: <Login /> }, // Login route
//       { path: "/protected-route", element: <PrivateRoute /> }, // Protected route
//     ],
//   },
// ]);

// const App = () => {
//   return (
//     <AuthContextProvider> {/* Wrap your app with the authentication context provider */}
//       <RouterProvider router={Router}>
//         <Routes>
//           <Route path="*" element={<ErrorComponent />} /> {/* Error route */}
//         </Routes>
//       </RouterProvider>
//     </AuthContextProvider>
//   );
// };

// export default App;
