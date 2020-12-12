import React, { useState, useEffect } from 'react';
import { commerce } from './libs/commerce';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
