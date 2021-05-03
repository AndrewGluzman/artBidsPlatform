import React from 'react';
import CartSide from './cartSide';
import Header from './header';
import Homelist from './homeList';

function Home(props){
  return(
    <React.Fragment>
      <Header />
      <CartSide />
      <Homelist />
    </React.Fragment> 
  )
}

export default Home