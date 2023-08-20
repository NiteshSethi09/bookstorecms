import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const CreateProduct = lazy(() => import("@/pages/CreateProduct"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import Sidebar from "./components/Sidebar";
import "./styles/globals.css";

function App() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Sidebar />
        <Routes>
          <Route path="*" element={<NotFound />} />

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
      </Suspense>
    </>
  );
}

export default App;
