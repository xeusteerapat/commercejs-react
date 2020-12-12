import React from 'react';
import { Button, Grid, Container, Typography } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './cart-items/CartItem';

const Cart = ({ cart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      You have items in your orders, start adding some!
    </Typography>
  );

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map(item => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem item={item} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant='h4'>
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size='large'
              type='button'
              variant='contained'
              color='secondary'
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size='large'
              type='button'
              variant='contained'
              color='primary'
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return 'loading...';

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.toolbar} variant='h3'>
        Your Orders
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
