import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Search from './components/Search';
import { SearchProvider } from './contexts/SearchContext';

const App = () => {
  return (
    <div className="overflow-hidden pb-14 md:pb-0">
      <Router>
        <SearchProvider>
          <Header />
          <Search />
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </Router>
    </div>
  );
};

export default App;