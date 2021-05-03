import React, { useEffect, useState } from 'react';
import { doApiGet, URL_API } from '../../services/apiSer';
import PageNav from '../misc/pagesNav';
import CartSide from './cartSide';
import Header from './header';
import ProdBox from './prodBox';

function CategoryPage(props) {
  let [cat, setCat] = useState({})
  let [prods_ar, setProdsAr] = useState([])


  useEffect(() => {
    doApi();
    // props.match -  חשוב מכיוון שנרצה שהפונקציה תפעל כל פעם שיו אר אל משתנה למעלה 
  }, [props.match])

  const doApi = async () => {
    // להוציא את המידע על הקטגוריה

    let url1 = URL_API + "/categories/single/" + props.match.params.id
    let dataCat = await doApiGet(url1)
    setCat(dataCat)

    // להוציא את כל המוצרים , נניח 8 בדף
    let currentPage = props.match.params.page || 0; 
    let url = URL_API + `/prods/?cat=${dataCat.s_id}&perPage=8&page=${currentPage}`;

    let prodsData = await doApiGet(url);
    setProdsAr(prodsData);
    // לעשות פג'ניישן 
  }


  return (
    <React.Fragment>
      <Header />
      <CartSide />
      <div className="container">
        <hr className="for_h2" />
        <h1 className="text-center h2_hr h2">
          <span>Product of {cat.name}</span>
        </h1>
        <h3 className="text-center">{cat.info}</h3>
        <div className="text-center">
          {cat.s_id &&
            <PageNav
              urlPageApi={"/prods/count?cat=" + cat.s_id}
              perPage="8"
              // לאן הלינקים של הכפתורים של העמודים יקחו אותנו
              pageLinkStart={"/cat/" + cat.s_id + "/"}

            />
          }
        </div>
        <div className="row mb-5">
          {prods_ar.map(item => {
            return (
              <ProdBox key={item._id} item={item} />
            )
          })}
        </div>

      </div>

    </React.Fragment>
  )
}

export default CategoryPage