import React from 'react'
import CartSide from './cartSide'
import Footer from './footer'
import Header from './header'
import Homelist from './homeList'

function Home(props) {
  return (
    <React.Fragment>
      <CartSide />
      <Homelist />
    </React.Fragment>
  )
}

export default Home
