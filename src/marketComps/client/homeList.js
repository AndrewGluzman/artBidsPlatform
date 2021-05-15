import React from 'react';
import HomeCatList from './homeCatList';


function Homelist(props){
  return(
    
      <div className="container-fluid">
        <div className="container">
          <HomeCatList  catId="3" />
          <HomeCatList catId="1" />
          <HomeCatList catId="2" />
          <HomeCatList catId="5" />
        </div>
      </div>
     
  )
}

export default Homelist