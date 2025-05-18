import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import TrainingCenter from "./pages/TrainingCenter";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import User from "./pages/User";
import Admin from "./pages/Admin";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import RequireAuth from "./components/RequireAuth";

import { SearchProvider } from "./contexts/SearchContext";
import { CatalogProvider } from "./contexts/CatalogContext";

const App = () => {
  return (
    <div className="container mx-auto overflow-hidden pb-14 md:pb-0">
      <Router>
        <SearchProvider>
          <Header />
          <Search />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/beauty_school" element={<TrainingCenter />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/user"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <UserPage />
                </RequireAuth>
              }
            />

            <Route
              path="/admin"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route
              path="/catalog"
              element={
                <CatalogProvider>
                  <Catalog />
                </CatalogProvider>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </Router>
    </div>
  );
};

export default App;
