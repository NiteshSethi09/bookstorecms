import { Routes, Route, Navigate } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import "./styles/globals.css";

function App() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="admin">
            <Route element={<Dashboard />} index />
            <Route path="product-list" element={<Products />} />
            <Route path="product">
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
