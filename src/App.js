import React, { useState, useEffect } from 'react';
import { commerce } from './libs/commerce';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, qty) => {
    const response = await commerce.cart.add(productId, qty);
    setCart(response.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
