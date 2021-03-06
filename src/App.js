import React, { useState, useEffect } from 'react';
import { commerce } from './libs/commerce';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/checkout-form/checkout/Checkout';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, qty) => {
    const { cart } = await commerce.cart.add(productId, qty);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async productId => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutOrderId, newOrder) => {
    try {
      const incommingOrder = await commerce.checkout.capture(
        checkoutOrderId,
        newOrder
      );

      setOrder(incommingOrder);
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.messages);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path='/cart'>
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path='/checkout'>
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              errorMsg={errorMsg}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
