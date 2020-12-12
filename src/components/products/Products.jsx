import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './product/Product';

import useStyles from './styles';

const products = [
  {
    id: 1,
    name: 'Pasta',
    description: 'Yummy Spaghetti with juicy sauce',
    price: '$5',
    image:
      'https://images.pexels.com/photos/1030947/pexels-photo-1030947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: 2,
    name: 'Breakfast Meal',
    description: 'Bread with jam mix with berries',
    price: '$10',
    image:
      'https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

const Products = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify='center' spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
